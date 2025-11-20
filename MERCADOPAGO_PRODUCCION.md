# 💳 Configuración de MercadoPago en Producción

## 📋 Pasos para activar MercadoPago en producción

### 1. Obtener credenciales de producción

1. Ve a tu cuenta de [MercadoPago Developers](https://www.mercadopago.com.ar/developers/panel)
2. En el menú lateral, selecciona **"Credenciales"**
3. Cambia a la pestaña **"Credenciales de producción"**
4. Copia:
   - **Access Token de producción** (comienza con `APP_USR-`)
   - **Public Key de producción** (comienza con `APP_USR-`)

⚠️ **IMPORTANTE**: Las credenciales de TEST no funcionarán en producción.

### 2. Configurar URLs de redirección

En el panel de MercadoPago:

1. Ve a **"Tus integraciones"** → Selecciona tu aplicación
2. En **"URLs de redirección"**, agrega:
   ```
   https://peluqueriamarzetti-app.326kz3.easypanel.host/checkout/success
   https://peluqueriamarzetti-app.326kz3.easypanel.host/checkout/pending
   https://peluqueriamarzetti-app.326kz3.easypanel.host/checkout/failure
   ```
3. Guarda los cambios

### 3. Actualizar variables de entorno en EasyPanel

Ve a tu proyecto en EasyPanel → Servicio **backend** → **Environment Variables**

Actualiza o agrega estas variables:

```env
# MercadoPago - Credenciales de PRODUCCION
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_produccion
MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_produccion

# URLs de redirección
MERCADOPAGO_SUCCESS_URL=https://peluqueriamarzetti-app.326kz3.easypanel.host/checkout/success
MERCADOPAGO_PENDING_URL=https://peluqueriamarzetti-app.326kz3.easypanel.host/checkout/pending
MERCADOPAGO_FAILURE_URL=https://peluqueriamarzetti-app.326kz3.easypanel.host/checkout/failure
```

### 4. Actualizar el frontend

Asegúrate de que el frontend use la **Public Key de producción**.

Busca en tu código del frontend donde se inicializa MercadoPago y actualiza:

```javascript
// Antes (TEST)
const mp = new MercadoPago('TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

// Después (PRODUCCIÓN)
const mp = new MercadoPago('APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
```

Si usas variables de entorno en el frontend, actualízalas:

```env
VITE_MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_produccion
```

### 5. Verificar la configuración

1. **Backend**: Revisa los logs en EasyPanel para confirmar que usa las credenciales correctas
2. **Frontend**: Abre la consola del navegador y verifica que no haya errores de MercadoPago
3. **Prueba real**: Haz una compra de prueba con una tarjeta real (se cobrará de verdad)

## 🔒 Seguridad

### ⚠️ NUNCA expongas el Access Token en el frontend

- ✅ **Backend**: Usa `MERCADOPAGO_ACCESS_TOKEN` (privado)
- ✅ **Frontend**: Usa `MERCADOPAGO_PUBLIC_KEY` (público)

### Tarjetas de prueba vs Producción

**Modo TEST** (desarrollo):
- Usa [tarjetas de prueba de MercadoPago](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards)
- No se cobran los pagos
- Prefijo de credenciales: `TEST-`

**Modo PRODUCCIÓN**:
- Usa tarjetas reales
- Se cobran los pagos reales
- Prefijo de credenciales: `APP_USR-`

## 🧪 Probar en producción

### Método 1: Compra real pequeña
Haz una compra de $1 ARS para verificar que todo funciona.

### Método 2: Webhook de notificaciones (recomendado)
Configura un webhook en MercadoPago para recibir notificaciones de pagos y probar sin hacer compras reales.

## 📊 Monitoreo

Después de activar producción, monitorea:

1. **Panel de MercadoPago**: Ve los pagos en tiempo real
2. **Logs de EasyPanel**: Verifica que no haya errores
3. **Base de datos**: Confirma que las órdenes se creen correctamente

## 🆘 Troubleshooting

### Error: "Invalid credentials"
- Verifica que uses credenciales de **PRODUCCIÓN**, no de TEST
- Confirma que el Access Token esté en el backend
- Confirma que el Public Key esté en el frontend

### Error: "Preference not found"
- Verifica que el backend esté creando la preferencia correctamente
- Revisa los logs del backend en EasyPanel

### Los pagos no redirigen correctamente
- Verifica las URLs de redirección en el panel de MercadoPago
- Confirma que las URLs en las variables de entorno sean correctas
- Asegúrate de usar HTTPS (no HTTP)

### El botón de pago no aparece
- Abre la consola del navegador y busca errores
- Verifica que el Public Key sea de producción
- Confirma que el SDK de MercadoPago esté cargado correctamente

## ✅ Checklist final

Antes de lanzar a producción:

- [ ] Credenciales de producción configuradas en backend
- [ ] Public Key de producción configurado en frontend
- [ ] URLs de redirección agregadas en panel de MercadoPago
- [ ] Variables de entorno actualizadas en EasyPanel
- [ ] Código subido a GitHub y desplegado
- [ ] Prueba de compra real realizada exitosamente
- [ ] Redirecciones funcionando correctamente
- [ ] Logs del backend sin errores

## 📚 Recursos adicionales

- [Documentación de MercadoPago](https://www.mercadopago.com.ar/developers/es/docs)
- [Diferencias entre TEST y PRODUCCIÓN](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/credentials)
- [Tarjetas de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards)
