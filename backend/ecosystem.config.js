module.exports = {
  apps: [
    {
      name: 'athena-backend',
      script: './dist/main.js',
      ignore_watch: ['node_modules'],
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'dev',
      },
    },
  ],
};
