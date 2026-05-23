<?php
/**
 * Plugin Name: OnRoute Holy Bakery - Gestión de Reservas y Estados
 * Description: Endpoints de WordPress REST API para confirmar reservas y gestionar la máquina de estados.
 * Version: 2.1 (SQL Standardized)
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_action( 'rest_api_init', function () {
    // GET /wp-json/holybakery/v1/deliveries
    register_rest_route( 'holybakery/v1', '/deliveries', array(
        'methods'             => 'GET',
        'callback'            => 'holybakery_get_deliveries_endpoint',
        'permission_callback' => '__return_true', // In production add permission check
    ) );
    
    // POST /wp-json/holybakery/v1/deliveries (Create borrador or pending)
    register_rest_route( 'holybakery/v1', '/deliveries', array(
        'methods'             => 'POST',
        'callback'            => 'holybakery_create_delivery_endpoint',
        'permission_callback' => '__return_true',
    ) );

    // PUT /wp-json/holybakery/v1/deliveries/<id> (Update state / confirm)
    // Accept either numeric id or DLV-XX
    register_rest_route( 'holybakery/v1', '/deliveries/(?P<id>[a-zA-Z0-9-]+)', array(
        'methods'             => 'PUT',
        'callback'            => 'holybakery_update_delivery_endpoint',
        'permission_callback' => '__return_true',
    ) );

    // POST upload
    register_rest_route( 'holybakery/v1', '/deliveries/(?P<id>[a-zA-Z0-9-]+)/upload', array(
        'methods'             => 'POST',
        'callback'            => 'holybakery_upload_files_endpoint',
        'permission_callback' => '__return_true',
    ) );
});

function holybakery_get_price($destino, $tipo_tarifa) {
    $file_path = dirname(dirname(__FILE__)) . '/precios.txt';
    if (!file_exists($file_path)) return false;
    $lines = file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (preg_match('/^\d+\s+(.*?)\s+(\d+)\s+(\d+)$/', $line, $matches)) {
            $nombre_zona = trim($matches[1]);
            $local = (float) $matches[2];
            $extranjero = (float) $matches[3];
            if (strcasecmp($nombre_zona, trim($destino)) === 0) {
                return (strcasecmp(trim($tipo_tarifa), 'extranjero') === 0 || strcasecmp(trim($tipo_tarifa), 'extranjera') === 0) ? $extranjero : $local;
            }
        }
    }
    return false;
}

function holybakery_get_deliveries_endpoint(WP_REST_Request $request) {
    global $wpdb;
    $client_id = 1; // Assuming default client_id for this tenant
    
    $where = "WHERE client_id = %d";
    $args = [$client_id];
    
    if (isset($_GET['status']) && !empty($_GET['status'])) {
        $where .= " AND status = %s";
        $args[] = sanitize_text_field($_GET['status']);
    }
    
    $query = $wpdb->prepare("SELECT * FROM deliveries $where ORDER BY id DESC", ...$args);
    $results = $wpdb->get_results($query, ARRAY_A);
    
    // Format JSON fields
    foreach ($results as &$row) {
        $row['image_urls'] = json_decode($row['image_urls'], true);
        $row['cost'] = (float)$row['cost'];
        $row['cost_locked'] = (bool)$row['cost_locked'];
        $row['admin_approval_requested'] = (bool)$row['admin_approval_requested'];
    }
    
    return rest_ensure_response($results);
}

function holybakery_create_delivery_endpoint(WP_REST_Request $request) {
    global $wpdb;
    $params = $request->get_json_params() ?: $_POST;
    $client_id = 1;
    
    // Generate tracking code
    $counter = (int) get_option( 'holybakery_dlv_counter', 0 );
    $counter++;
    update_option( 'holybakery_dlv_counter', $counter );
    $tracking_code = 'DLV-' . str_pad( $counter, 3, '0', STR_PAD_LEFT );

    $data = array(
        'client_id' => $client_id,
        'tracking_code' => $tracking_code,
        'status' => sanitize_text_field($params['status'] ?? 'borrador'),
        'cost' => floatval($params['cost'] ?? 0),
        'destination_name' => sanitize_text_field($params['destinationName'] ?? ''),
        'employee_name' => sanitize_text_field($params['employee'] ?? ''),
        'customer_name' => sanitize_text_field($params['customerName'] ?? ''),
        'phones' => sanitize_text_field($params['phones'] ?? ''),
        'comments' => sanitize_textarea_field($params['comments'] ?? ''),
        'tariff_type' => sanitize_text_field($params['tariffType'] ?? ''),
        'place_id' => sanitize_text_field($params['place_id'] ?? ''),
        'formatted_address' => sanitize_text_field($params['formatted_address'] ?? ''),
        'maps_link' => sanitize_text_field($params['maps_link'] ?? ''),
        'latitude' => isset($params['latitude']) ? floatval($params['latitude']) : null,
        'longitude' => isset($params['longitude']) ? floatval($params['longitude']) : null,
        'scheduled_date' => isset($params['date']) ? sanitize_text_field($params['date'] . ' ' . ($params['time'] ?? '00:00:00')) : null,
    );

    $wpdb->insert('deliveries', $data);
    $data['id'] = $wpdb->insert_id;
    
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Reserva creada',
        'data' => $data
    ));
}

function holybakery_update_delivery_endpoint(WP_REST_Request $request) {
    global $wpdb;
    $id_or_tracking = sanitize_text_field($request['id']);
    $params = $request->get_json_params() ?: $_POST;
    $client_id = 1;

    $where = is_numeric($id_or_tracking) 
        ? $wpdb->prepare("id = %d AND client_id = %d", $id_or_tracking, $client_id)
        : $wpdb->prepare("tracking_code = %s AND client_id = %d", $id_or_tracking, $client_id);
    
    $delivery = $wpdb->get_row("SELECT * FROM deliveries WHERE $where", ARRAY_A);
    
    if (!$delivery) {
        return new WP_Error('not_found', 'Reserva no encontrada', array('status' => 404));
    }
    
    $estado_actual = $delivery['status'];
    $estado_nuevo = $estado_actual;
    $data_to_update = array();

    // 1. Estado
    if (isset($params['status']) && $params['status'] !== $estado_actual) {
        $estado_req = $params['status'];
        $valid_transition = false;
        
        $valid_flows = [
            'borrador' => ['pendiente_envio', 'confirmada'],
            'pendiente_envio' => ['confirmada'],
            'confirmada' => ['entregada', 'cancelacion_pendiente'],
            'entregada' => ['pagada'],
            'cancelacion_pendiente' => ['cancelada']
        ];
        
        if (isset($valid_flows[$estado_actual]) && in_array($estado_req, $valid_flows[$estado_actual])) {
            $valid_transition = true;
        }
        
        if (!$valid_transition) {
            return new WP_Error('invalid_transition', "Transición inválida de $estado_actual a $estado_req", array('status' => 400));
        }
        
        $estado_nuevo = $estado_req;
        $data_to_update['status'] = $estado_nuevo;
        
        if ($estado_nuevo === 'confirmada') {
            $data_to_update['cost_locked'] = 1;
        }
        if ($estado_nuevo === 'entregada') {
            $data_to_update['delivered_at'] = current_time('mysql');
        }
    }

    // 2. Pagos
    if (isset($params['paid']) && $params['paid'] === true && $estado_nuevo === 'pagada') {
        // Insert into payment_records
        $wpdb->insert('payment_records', array(
            'client_id' => $client_id,
            'delivery_id' => $delivery['id'],
            'amount' => $delivery['cost'],
            'status' => 'completed',
            'transaction_date' => current_time('mysql')
        ));
    }

    // 3. Edición de campos
    $campos_a_editar = array_diff_key($params, array_flip(['status', 'paid']));
    
    if (!empty($campos_a_editar)) {
        $estados_bloqueados = ['entregada', 'pagada', 'cancelada', 'cancelacion_pendiente'];
        if (in_array($estado_nuevo, $estados_bloqueados)) {
            return new WP_Error('blocked_state', 'El estado actual no permite edición', array('status' => 403));
        }
        
        // Map frontend camelCase to DB columns
        $map = [
            'destinationName' => 'destination_name',
            'employee' => 'employee_name',
            'customerName' => 'customer_name',
            'phones' => 'phones',
            'comments' => 'comments',
            'tariffType' => 'tariff_type',
            'cost' => 'cost',
        ];
        
        if ($estado_nuevo === 'confirmada') {
            $permitidos = ['scheduled_date', 'destinationName', 'customerName', 'phones'];
            $cambio_destino = false;
            
            foreach ($campos_a_editar as $k => $v) {
                if (!in_array($k, $permitidos) && $k !== 'date' && $k !== 'time') {
                    return new WP_Error('unauthorized_field', "No tienes permiso para editar: $k", array('status' => 403));
                }
                
                if ($k === 'destinationName') {
                    if (strcasecmp($delivery['destination_name'], $v) !== 0) {
                        $cambio_destino = true;
                    }
                    $data_to_update['destination_name'] = sanitize_text_field($v);
                } else if ($k === 'customerName') {
                    $data_to_update['customer_name'] = sanitize_text_field($v);
                } else if ($k === 'phones') {
                    $data_to_update['phones'] = sanitize_text_field($v);
                }
            }
            
            // Handle date time combination if provided
            if (isset($params['date'])) {
                $time = $params['time'] ?? explode(' ', $delivery['scheduled_date'])[1] ?? '00:00:00';
                $data_to_update['scheduled_date'] = sanitize_text_field($params['date'] . ' ' . $time);
            }
            
            if ($cambio_destino) {
                $tipo = $delivery['tariff_type'];
                $nuevo_costo = holybakery_get_price($data_to_update['destination_name'], $tipo);
                if ($nuevo_costo !== false) {
                    $data_to_update['cost'] = $nuevo_costo;
                    $data_to_update['admin_approval_requested'] = 1;
                    error_log("Notificación Admin: Zona cambiada en reserva {$delivery['tracking_code']}");
                }
            }
        } elseif ($estado_nuevo === 'borrador' || $estado_nuevo === 'pendiente_envio') {
            // Can edit anything
            foreach ($campos_a_editar as $k => $v) {
                if (isset($map[$k])) {
                    $data_to_update[$map[$k]] = sanitize_text_field($v);
                }
            }
            if (isset($params['date'])) {
                $time = $params['time'] ?? '00:00:00';
                $data_to_update['scheduled_date'] = sanitize_text_field($params['date'] . ' ' . $time);
            }
        }
    }

    if (!empty($data_to_update)) {
        $wpdb->update('deliveries', $data_to_update, array('id' => $delivery['id']));
    }

    $updated_delivery = $wpdb->get_row("SELECT * FROM deliveries WHERE id = " . intval($delivery['id']), ARRAY_A);
    $updated_delivery['image_urls'] = json_decode($updated_delivery['image_urls'], true);

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Actualizado correctamente',
        'data' => $updated_delivery
    ));
}

function holybakery_upload_files_endpoint(WP_REST_Request $request) {
    global $wpdb;
    $id_or_tracking = sanitize_text_field($request['id']);
    $files = $request->get_file_params();
    $client_id = 1;

    $where = is_numeric($id_or_tracking) 
        ? $wpdb->prepare("id = %d AND client_id = %d", $id_or_tracking, $client_id)
        : $wpdb->prepare("tracking_code = %s AND client_id = %d", $id_or_tracking, $client_id);
    
    $delivery = $wpdb->get_row("SELECT * FROM deliveries WHERE $where", ARRAY_A);
    if (!$delivery) {
        return new WP_Error('not_found', 'Reserva no encontrada', array('status' => 404));
    }

    if (empty($files)) {
        return new WP_Error('no_files', 'No se enviaron archivos', array('status'=>400));
    }

    $upload_dir = dirname(dirname(__FILE__)) . '/uploads/';
    if (!file_exists($upload_dir)) mkdir($upload_dir, 0755, true);

    $allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    $max_size = 5 * 1024 * 1024;
    $urls = [];
    $total_files = 0;

    foreach ($files as $file) {
        if (is_array($file['name'])) {
            $count = count($file['name']);
            for ($i=0; $i<$count; $i++) {
                if ($file['error'][$i] !== UPLOAD_ERR_OK) continue;
                if (++$total_files > 3) return new WP_Error('too_many', 'Max 3 archivos', array('status'=>400));
                
                if (!in_array($file['type'][$i], $allowed)) return new WP_Error('invalid_type', 'Tipo no permitido', array('status'=>400));
                if ($file['size'][$i] > $max_size) return new WP_Error('too_large', 'Supera 5MB', array('status'=>400));
                
                $filename = time() . '_' . sanitize_file_name($file['name'][$i]);
                if (move_uploaded_file($file['tmp_name'][$i], $upload_dir . $filename)) {
                    $urls[] = site_url('/wp-content/plugins/OnRoute-M-xico/uploads/' . $filename);
                }
            }
        } else {
            if ($file['error'] !== UPLOAD_ERR_OK) continue;
            if (++$total_files > 3) return new WP_Error('too_many', 'Max 3 archivos', array('status'=>400));
            if (!in_array($file['type'], $allowed)) return new WP_Error('invalid_type', 'Tipo no permitido', array('status'=>400));
            if ($file['size'] > $max_size) return new WP_Error('too_large', 'Supera 5MB', array('status'=>400));
            
            $filename = time() . '_' . sanitize_file_name($file['name']);
            if (move_uploaded_file($file['tmp_name'], $upload_dir . $filename)) {
                $urls[] = site_url('/wp-content/plugins/OnRoute-M-xico/uploads/' . $filename);
            }
        }
    }

    $current_urls = json_decode($delivery['image_urls'], true) ?: [];
    $merged = array_slice(array_merge($current_urls, $urls), 0, 3);
    
    $wpdb->update('deliveries', array('image_urls' => json_encode($merged)), array('id' => $delivery['id']));

    return rest_ensure_response(array('success'=>true, 'urls'=>$merged));
}
