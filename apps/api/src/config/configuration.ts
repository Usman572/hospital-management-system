export default () => ({
  app: {
    name: process.env.APP_NAME || 'Hospital Management System',
    port: parseInt(process.env.PORT || '3001', 10),
    environment: process.env.NODE_ENV || 'development',
  },
});
