// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/dashboard', // Change this path to match your API endpoint
    createProxyMiddleware({
      target: 'https://wbgtgroup9.azurewebsites.net', // URL of the remote API
      changeOrigin: true,
    })
  );
};
