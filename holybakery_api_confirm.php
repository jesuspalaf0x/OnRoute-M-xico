<?php
/**
 * Plugin Name: OnRoute Holy Bakery - Gestión de Reservas y Estados
 * Description: Endpoints de WordPress REST API para confirmar reservas y gestionar la máquina de estados.
 * Version: 3.1 (Correct DB Mappings)
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'rest_api_init', function () {
    $ns = 'hb/v1';

    register_rest_route( $ns, '/deliveries', [
        'methods' => 'GET',
        'callback' => 'hb_get_deliveries',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/deliveries', [
        'methods' => 'POST',
        'callback' => 'hb_create_delivery',
        'permission_callback' => '__return_true',
    ]);
    
    register_rest_route( $ns, '/deliveries/(?P<id>[a-zA-Z0-9-]+)', [
        'methods' => ['PATCH', 'PUT'],
        'callback' => 'hb_update_delivery',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/employees/on-shift', [
        'methods' => 'GET',
        'callback' => 'hb_get_employee_on_shift',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/admin/pending-requests', [
        'methods' => 'GET',
        'callback' => 'hb_get_pending_requests',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/admin/credit-summary', [
        'methods' => 'GET',
        'callback' => 'hb_get_credit_summary',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/admin/deliveries/(?P<id>[a-zA-Z0-9-]+)/status', [
        'methods' => 'PATCH',
        'callback' => 'hb_admin_update_status',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/admin/extra-services', [
        'methods' => 'GET',
        'callback' => 'hb_get_extras',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/admin/extra-services', [
        'methods' => 'POST',
        'callback' => 'hb_create_extra',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/cancellation-requests', [
        'methods' => 'POST',
        'callback' => 'hb_request_cancellation',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/tariff-change-requests', [
        'methods' => 'POST',
        'callback' => 'hb_request_tariff_change',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/cancellation-requests/(?P<id>\d+)', [
        'methods' => 'PATCH',
        'callback' => 'hb_approve_cancellation',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/tariff-change-requests/(?P<id>\d+)', [
        'methods' => 'PATCH',
        'callback' => 'hb_approve_tariff',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( $ns, '/status-checks', [
        'methods' => 'GET',
        'callback' => 'hb_debug_db',
        'permission_callback' => '__return_true',
    ]);
});

function hb_get_deliveries(WP_REST_Request $request) {
    global $wpdb;
    $client_id = 1;
    $where = ["client_id = %d"];
    $args = [$client_id];

    if (isset($_GET['status'])) {
        $st = $_GET['status'];
        if (is_array($st)) {
            $ph = implode(',', array_fill(0, count($st), '%s'));
            $where[] = "status IN ($ph)";
            $args = array_merge($args, $st);
        } else {
            $where[] = "status = %s";
            $args[] = $st;
        }
    }
    
    if (isset($_GET['date_from'])) {
        $where[] = "scheduled_date >= %s";
        $args[] = sanitize_text_field($_GET['date_from']) . ' 00:00:00';
    }
    if (isset($_GET['date_to'])) {
        $where[] = "scheduled_date <= %s";
        $args[] = sanitize_text_field($_GET['date_to']) . ' 23:59:59';
    }
    if (isset($_GET['employee_id'])) {
        $where[] = "driver_id = %d";
        $args[] = intval($_GET['employee_id']);
    }

    $where_str = implode(' AND ', $where);
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 50;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

    $total = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM deliveries WHERE $where_str", ...$args));
    $items = $wpdb->get_results($wpdb->prepare("SELECT * FROM deliveries WHERE $where_str ORDER BY id DESC LIMIT %d OFFSET %d", [...$args, $limit, $offset]), ARRAY_A);

    foreach ($items as &$row) {
        $row['cost'] = (float)$row['cost'];
        // Map database columns to frontend expectations
        $row['date'] = $row['scheduled_date'];
        $row['destinationName'] = $row['destination_name'];
        $row['client'] = $row['customer_name'];
        $row['phone'] = $row['phones'];
        $row['paid'] = ($row['status'] === 'pagada') || !empty($row['paid_at']);
        $row['employee'] = $row['employee_name'] ?? 'Empleado ' . $row['driver_id'];
    }

    return rest_ensure_response(['total' => (int)$total, 'items' => $items]);
}

function hb_create_delivery(WP_REST_Request $request) {
    global $wpdb;
    $params = $request->get_json_params();

    // Prepare scheduled_date by merging date and time
    $date = sanitize_text_field($params['delivery_date'] ?? $params['date'] ?? '');
    $time = sanitize_text_field($params['delivery_time'] ?? $params['time'] ?? '');
    $scheduled_date = null;
    if (!empty($date)) {
        $scheduled_date = $date . (!empty($time) ? ' ' . $time : ' 00:00:00');
    }

    // Verify if the driver exists to satisfy the foreign key constraint
    $driver_id = isset($params['employee_id']) ? intval($params['employee_id']) : null;
    if ($driver_id) {
        $driver_exists = $wpdb->get_var($wpdb->prepare("SELECT id FROM employees WHERE id = %d", $driver_id));
        if (!$driver_exists) {
            $driver_id = null;
        }
    }

    $data = [
        'client_id' => isset($params['client_id']) ? intval($params['client_id']) : 1,
        'customer_name' => sanitize_text_field($params['client_name'] ?? $params['client'] ?? ''),
        'phones' => sanitize_text_field($params['client_phone'] ?? $params['phone'] ?? ''),
        'destination_name' => sanitize_text_field($params['destination_name'] ?? $params['destinationName'] ?? ''),
        'scheduled_date' => $scheduled_date,
        'cost' => floatval($params['cost'] ?? 0),
        'tariff_type' => sanitize_text_field($params['cost_type'] ?? 'local'),
        'status' => sanitize_text_field($params['status'] ?? 'confirmada'),
        'driver_id' => $driver_id,
        'tracking_code' => 'DLV-TEMP-' . rand(100000, 999999), // unique non-null temp tracking code
        'comments' => sanitize_text_field($params['comments'] ?? ''),
        'created_at' => current_time('mysql'),
    ];

    $inserted = $wpdb->insert('deliveries', $data);

    if ($inserted) {
        $insert_id = $wpdb->insert_id;
        $tracking_code = 'DLV-' . str_pad($insert_id, 3, '0', STR_PAD_LEFT);
        
        // Update tracking code dynamically
        $wpdb->update('deliveries', ['tracking_code' => $tracking_code], ['id' => $insert_id]);
        
        return rest_ensure_response([
            'success' => true,
            'id' => $insert_id,
            'status' => $data['status'],
            'tracking_code' => $tracking_code
        ]);
    }

    return new WP_Error('insert_failed', 'Failed to create delivery. Error: ' . $wpdb->last_error, ['status' => 500]);
}

function hb_update_delivery(WP_REST_Request $request) {
    global $wpdb;
    $id = sanitize_text_field($request['id']);
    $params = $request->get_json_params();
    $data_to_update = [];
    
    // Map dates to scheduled_date
    $date = isset($params['delivery_date']) ? $params['delivery_date'] : (isset($params['date']) ? $params['date'] : null);
    $time = isset($params['delivery_time']) ? $params['delivery_time'] : (isset($params['time']) ? $params['time'] : null);
    if ($date || $time) {
        $current_date = $wpdb->get_var($wpdb->prepare("SELECT scheduled_date FROM deliveries WHERE id = %s", $id));
        $current_parts = explode(' ', $current_date ?? ' ');
        $d = $date ? $date : ($current_parts[0] ? $current_parts[0] : '');
        $t = $time ? $time : ($current_parts[1] ? $current_parts[1] : '00:00:00');
        $data_to_update['scheduled_date'] = $d . ' ' . $t;
    }
    
    if (isset($params['client_name']) || isset($params['client'])) {
        $data_to_update['customer_name'] = sanitize_text_field($params['client_name'] ?? $params['client']);
    }
    if (isset($params['client_phone']) || isset($params['phone'])) {
        $data_to_update['phones'] = sanitize_text_field($params['client_phone'] ?? $params['phone']);
    }
    if (isset($params['status'])) {
        $data_to_update['status'] = sanitize_text_field($params['status']);
    }
    
    if (!empty($data_to_update)) {
        $wpdb->update('deliveries', $data_to_update, ['id' => $id]);
    }
    return rest_ensure_response(['success' => true]);
}

function hb_get_employee_on_shift(WP_REST_Request $request) {
    global $wpdb;
    $dt = new DateTime("now", new DateTimeZone("America/Cancun"));
    $current_time = $dt->format("H:i:s");

    $employee = $wpdb->get_row($wpdb->prepare("SELECT * FROM employees WHERE active = 1 AND shift_start <= %s AND shift_end >= %s LIMIT 1", $current_time, $current_time), ARRAY_A);
    return rest_ensure_response(['employee' => $employee]);
}

function hb_get_pending_requests(WP_REST_Request $request) {
    global $wpdb;
    $cancellations = $wpdb->get_results("SELECT * FROM cancellation_requests WHERE status = 'pending'", ARRAY_A);
    $tariff_changes = $wpdb->get_results("SELECT * FROM tariff_change_requests WHERE status = 'pending'", ARRAY_A);
    
    return rest_ensure_response([
        'cancellations' => $cancellations,
        'tariff_changes' => $tariff_changes
    ]);
}

function hb_get_credit_summary(WP_REST_Request $request) {
    global $wpdb;
    $date_from = isset($_GET['date_from']) ? sanitize_text_field($_GET['date_from']) : date('Y-m-01');
    $date_to = isset($_GET['date_to']) ? sanitize_text_field($_GET['date_to']) : date('Y-m-t');

    $total_pendiente_del = $wpdb->get_var("SELECT SUM(cost) FROM deliveries WHERE status = 'entregada'");
    $total_pendiente_ext = $wpdb->get_var("SELECT SUM(cost) FROM extra_services WHERE paid = 0");
    
    $total_pendiente = (float)$total_pendiente_del + (float)$total_pendiente_ext;

    $total_acumulado = $wpdb->get_var($wpdb->prepare("SELECT SUM(cost) FROM deliveries WHERE (status = 'entregada' OR status = 'pagada') AND scheduled_date >= %s AND scheduled_date <= %s", $date_from . ' 00:00:00', $date_to . ' 23:59:59'));
    $total_pagado = $wpdb->get_var($wpdb->prepare("SELECT SUM(cost) FROM deliveries WHERE status = 'pagada' AND scheduled_date >= %s AND scheduled_date <= %s", $date_from . ' 00:00:00', $date_to . ' 23:59:59'));
    $total_reservations = $wpdb->get_var("SELECT COUNT(*) FROM deliveries WHERE status != 'borrador' AND status != 'cancelada'");
    
    $extras_mes = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM extra_services WHERE service_date >= %s AND service_date <= %s", $date_from, $date_to));
    $extras_total = $wpdb->get_var($wpdb->prepare("SELECT SUM(cost) FROM extra_services WHERE service_date >= %s AND service_date <= %s", $date_from, $date_to));

    return rest_ensure_response([
        'total_reservations' => (int)$total_reservations,
        'total_acumulado' => (float)$total_acumulado,
        'total_pagado' => (float)$total_pagado,
        'total_pendiente' => $total_pendiente,
        'extras_mes' => (int)$extras_mes,
        'extras_total' => (float)$extras_total
    ]);
}

function hb_admin_update_status(WP_REST_Request $request) {
    global $wpdb;
    $id = sanitize_text_field($request['id']);
    $params = $request->get_json_params();
    $status = $params['status'];
    
    $delivery = $wpdb->get_row($wpdb->prepare("SELECT status FROM deliveries WHERE id = %s", $id), ARRAY_A);
    if (!$delivery) return new WP_Error('not_found', 'No encontrado', ['status' => 404]);

    $current = $delivery['status'];
    if ($status === 'entregada' && $current !== 'confirmada') {
        return new WP_Error('conflict', 'Estado actual no válido para entregada', ['status' => 409]);
    }
    if ($status === 'pagada' && $current !== 'entregada') {
        return new WP_Error('conflict', 'Estado actual no válido para pagada', ['status' => 409]);
    }

    $update = ['status' => $status];
    if ($status === 'entregada') $update['delivered_at'] = current_time('mysql');
    if ($status === 'pagada') $update['paid_at'] = current_time('mysql');

    $wpdb->update('deliveries', $update, ['id' => $id]);
    return rest_ensure_response(['success' => true]);
}

function hb_get_extras(WP_REST_Request $request) {
    global $wpdb;
    $date_from = isset($_GET['date_from']) ? sanitize_text_field($_GET['date_from']) : '2000-01-01';
    $date_to = isset($_GET['date_to']) ? sanitize_text_field($_GET['date_to']) : '2099-12-31';

    $results = $wpdb->get_results($wpdb->prepare("SELECT * FROM extra_services WHERE service_date >= %s AND service_date <= %s ORDER BY service_date DESC", $date_from, $date_to), ARRAY_A);
    $total = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM extra_services WHERE service_date >= %s AND service_date <= %s", $date_from, $date_to));
    return rest_ensure_response(['total' => (int)$total, 'items' => $results]);
}

function hb_create_extra(WP_REST_Request $request) {
    global $wpdb;
    $params = $request->get_json_params();
    $wpdb->insert('extra_services', [
        'delivery_id' => $params['delivery_id'],
        'description' => $params['description'],
        'cost' => $params['cost'],
        'service_date' => $params['service_date'],
        'service_time' => $params['service_time'],
        'added_by_admin_id' => $params['added_by_admin_id'],
        'created_at' => current_time('mysql')
    ]);
    return rest_ensure_response(['success' => true]);
}

function hb_request_cancellation(WP_REST_Request $request) {
    global $wpdb;
    $params = $request->get_json_params();
    $wpdb->insert('cancellation_requests', [
        'delivery_id' => $params['delivery_id'],
        'reason' => $params['reason'],
        'status' => 'pending',
        'created_at' => current_time('mysql')
    ]);
    $wpdb->update('deliveries', ['status' => 'cancelacion_pendiente'], ['id' => $params['delivery_id']]);
    return rest_ensure_response(['success' => true]);
}

function hb_request_tariff_change(WP_REST_Request $request) {
    global $wpdb;
    $params = $request->get_json_params();
    $wpdb->insert('tariff_change_requests', [
        'delivery_id' => $params['delivery_id'],
        'current_cost' => $params['current_cost'],
        'requested_cost' => $params['requested_cost'],
        'reason' => $params['reason'],
        'status' => 'pending',
        'created_at' => current_time('mysql')
    ]);
    return rest_ensure_response(['success' => true]);
}

function hb_approve_cancellation(WP_REST_Request $request) {
    global $wpdb;
    $id = intval($request['id']);
    $params = $request->get_json_params();
    $action = $params['action']; 
    $admin_id = $params['admin_id'];

    $req = $wpdb->get_row($wpdb->prepare("SELECT delivery_id FROM cancellation_requests WHERE id = %d", $id), ARRAY_A);
    if (!$req) return rest_ensure_response(['error' => 'not found']);

    if ($action === 'approve') {
        $wpdb->update('cancellation_requests', ['status' => 'approved', 'reviewed_by_admin_id' => $admin_id, 'reviewed_at' => current_time('mysql')], ['id' => $id]);
        $wpdb->update('deliveries', ['status' => 'cancelada', 'cancelled_at' => current_time('mysql'), 'cancel_approved_by' => $admin_id], ['id' => $req['delivery_id']]);
    } else {
        $wpdb->update('cancellation_requests', ['status' => 'rejected', 'reviewed_at' => current_time('mysql')], ['id' => $id]);
        $wpdb->update('deliveries', ['status' => 'confirmada'], ['id' => $req['delivery_id']]);
    }
    return rest_ensure_response(['success' => true]);
}

function hb_approve_tariff(WP_REST_Request $request) {
    global $wpdb;
    $id = intval($request['id']);
    $params = $request->get_json_params();
    $action = $params['action']; 
    $admin_id = $params['admin_id'];

    $req = $wpdb->get_row($wpdb->prepare("SELECT delivery_id, requested_cost FROM tariff_change_requests WHERE id = %d", $id), ARRAY_A);
    if (!$req) return rest_ensure_response(['error' => 'not found']);

    if ($action === 'approve') {
        $new_cost = isset($params['cost']) ? floatval($params['cost']) : $req['requested_cost'];
        $wpdb->update('tariff_change_requests', ['status' => 'approved', 'reviewed_at' => current_time('mysql')], ['id' => $id]);
        $wpdb->update('deliveries', ['cost' => $new_cost, 'tariff_type' => 'local', 'updated_at' => current_time('mysql')], ['id' => $req['delivery_id']]);
    } else {
        $wpdb->update('tariff_change_requests', ['status' => 'rejected', 'reviewed_at' => current_time('mysql')], ['id' => $id]);
    }
    return rest_ensure_response(['success' => true]);
}

function hb_debug_db() {
    global $wpdb;
    $c = $wpdb->get_col("DESCRIBE cancellation_requests");
    $t = $wpdb->get_col("DESCRIBE tariff_change_requests");
    return rest_ensure_response(base64_encode(json_encode(['c' => $c, 't' => $t])));
}
