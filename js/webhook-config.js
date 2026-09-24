/* ============================================================
   Abdalla AI Video Service — Webhook Configuration
   ============================================================
   Set your PUBLIC webhook URL here after deploying the Telegram Bot.
   (content.json → site.webhookUrl overrides this value when set.)

   For Fly.io:          https://your-app-name.fly.dev/webhook/order
   For Render:           https://your-app-name.onrender.com/webhook/order

   Leave it as '' while no public server exists: main.js treats an empty
   or localhost URL as "no server" and opens the order as a pre-filled
   email to the site's contact address, so orders are never lost.
   ============================================================ */

window.__WEBHOOK_URL__ = '';  /* e.g. 'https://your-app.fly.dev/webhook/order' */

/* Optional: custom success message per language */
window.__ORDER_SUCCESS_EN__ = 'Thank you! We will contact you within 24 hours.';
window.__ORDER_SUCCESS_AR__ = 'شكراً لتواصلك معنا! سنتواصل معك خلال ٢٤ ساعة.';
window.__ORDER_SUCCESS_ZH__ = '感謝您！我們將於 24 小時內回覆您。';
