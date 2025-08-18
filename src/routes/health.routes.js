const router = require('express').Router();

router.get('/', (req, res) => {
  const uptime = process.uptime();
  res.json({
    status: 'ok',
    uptime,
    env: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
