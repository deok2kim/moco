const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware(['/api', '/v2'], {
      target: 'http://ec2-15-164-165-178.ap-northeast-2.compute.amazonaws.com',
      changeOrigin: true,
      ws: true,
      router: {
        '/v2': 'wss://wss1.bithumb.com/public',
      },
      pathRewrite: { '^/v2': '', '^/api': '' },
    }),
  );
};
