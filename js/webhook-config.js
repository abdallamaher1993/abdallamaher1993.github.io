/* ============================================================
   Abdalla AI Video Service — Webhook Configuration
   ============================================================
   Set your webhook URL here after deploying the Telegram Bot.
   
   For local testing:    http://127.0.0.1:5000/webhook/order
   For Fly.io:          https://your-app-name.fly.dev/webhook/order
   For Render:           https://your-app-name.onrender.com/webhook/order
   
   The order form in main.js reads window.__WEBHOOK_URL__.
   ============================================================ */

window.__WEBHOOK_URL__ = 'http://127.0.0.1:5000/webhook/order';  /* CHANGE THIS */

/* Optional: custom success message per language */
window.__ORDER_SUCCESS_EN__ = 'Thank you! We will contact you within 24 hours.';
window.__ORDER_SUCCESS_AR__ = 'شكراً لتواصلك معنا! سنتواصل معك خلال ٢٤ ساعة.';
window.__ORDER_SUCCESS_ZH__ = '感謝您！我們將於 24 小時內回覆您。';
