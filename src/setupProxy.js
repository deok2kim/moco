const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware(['/api', '/v2'], {
      target: 'http://ec2-15-164-165-178.ap-northeast-2.compute.amazonaws.com',
      changeOrigin: true,
      ws: true,
      router: {
        '/v3': 'wss://wss1.bithumb.com/public',
        '/v2': 'http://ec2-43-200-3-180.ap-northeast-2.compute.amazonaws.com',
      },
      pathRewrite: { '^/v2': '', '^/api': '', '^/v3': '' },
    }),
  );
};
