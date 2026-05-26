# ⚠️ ZONA PROTEGIDA — SITIO WEB PRINCIPAL onroutemx.com

## 🚨 ADVERTENCIA PARA AGENTES DE IA Y DESARROLLADORES

**Esta rama (`website-onroute-v2`) contiene el sitio web público y de producción de OnRoute México.**

> [!CAUTION]
> **NO modifiques, borres ni sobrescribas ningún archivo de esta rama sin autorización explícita del propietario.**
> Cualquier cambio aquí afecta directamente a **https://onroutemx.com** — el sitio web en producción que recibe clientes reales.

---

## 🗂️ Estructura del repositorio (LEER ANTES DE ACTUAR)

Este repositorio contiene **DOS proyectos completamente separados** en distintas ramas:

| Rama | Proyecto | Dominio | ¿Modificable? |
|---|---|---|---|
| `website-onroute-v2` | **Sitio web público OnRoute México** | `onroutemx.com` | ⛔ Solo con autorización |
| `cpanel-deploy` | Plugin API de Holy Bakery | `holybakery.onroutemx.com` | ✅ Proyecto activo |
| `main` | Rama mixta (no usar para deploy) | — | ⚠️ No deployar |

---

## 📁 ¿Qué contiene esta rama?

El **sitio web de OnRoute México** — empresa de traslados turísticos en la Riviera Maya.

- **`index.html`** — Página principal del sitio ("Tu aventura comienza en el camino")
- **`assets/`** — CSS, JS e imágenes del sitio
- **`pages/`** — Páginas internas (tours, blog, contacto, etc.)
- **`shared/`** — Componentes React compartidos (cotizador, header, footer)
- **`variations/`** — Variaciones de páginas
- **`uploads/`** — Imágenes y recursos del sitio
- **`.cpanel.yml`** — Configuración de deploy → `onroutemx.com/public_html`

---

## 🔒 Reglas de esta rama

1. **NUNCA** copies archivos de la app `holybakery-app/` a esta rama
2. **NUNCA** modifiques el `.cpanel.yml` para apuntar a otra ruta
3. **NUNCA** hagas merge de `cpanel-deploy` o `main` sin revisar primero
4. **NUNCA** subas un `index.html` de la holybakery-app aquí
5. Solo el **propietario** puede autorizar cambios en producción

---

## 🌐 Sitio en producción

- **URL:** https://onroutemx.com
- **Hosting:** HostGator cPanel — `public_html/`
- **Deploy:** cPanel Git Version Control → rama `website-onroute-v2` → Deploy HEAD Commit

---

## ✅ Si necesitas trabajar en la app de Holy Bakery

**Cambia a la rama `cpanel-deploy`** — esa es la rama correcta para la app de gestión de entregas de Holy Bakery en `holybakery.onroutemx.com`.

```bash
git checkout cpanel-deploy
```

---

*Sitio construido con React + Vite. Conectado a WordPress REST API de onroutemx.com para tours y blog.*
