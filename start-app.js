const { spawn, exec } = require('child_process');
const path = require('path');

const services = [
  { name: 'Gateway', dir: 'services/gateway', cmd: 'node', args: ['--watch', 'src/server.js'] },
  { name: 'Catalog', dir: 'services/catalog-service', cmd: 'node', args: ['--watch', 'src/server.js'] },
  { name: 'Order', dir: 'services/order-service', cmd: 'node', args: ['--watch', 'src/server.js'] },
  { name: 'Rating', dir: 'services/rating-service', cmd: 'node', args: ['--watch', 'src/server.js'] },
  { name: 'Notification', dir: 'services/notification-service', cmd: 'node', args: ['--watch', 'src/server.js'] },
  { name: 'Frontend', dir: 'frontend', cmd: 'npm', args: ['run', 'dev'], isShell: true },
];

console.log('🍰 Starting Cake Delight Application...');
console.log('==================================================');

// First, attempt to start the RabbitMQ docker container if it exists but is stopped
exec('docker start rabbitmq', (error, stdout, stderr) => {
  if (error) {
    console.log('[RabbitMQ] Info: Could not start existing rabbitmq container (it may already be running, or needs to be created).');
  } else {
    console.log('[RabbitMQ] Successfully verified/started RabbitMQ container.');
  }

  // Then start all node services
  services.forEach(service => {
    const servicePath = path.join(__dirname, service.dir);
    
    // On Windows, npm commands need shell: true
    const isWindows = process.platform === 'win32';
    const useShell = service.isShell || isWindows;

    const proc = spawn(service.cmd, service.args, {
      cwd: servicePath,
      shell: useShell,
      stdio: 'pipe'
    });

    proc.stdout.on('data', data => {
      const lines = data.toString().split('\n').filter(l => l.trim());
      lines.forEach(line => console.log(`[${service.name}] ${line}`));
    });

    proc.stderr.on('data', data => {
      const lines = data.toString().split('\n').filter(l => l.trim());
      lines.forEach(line => console.error(`[${service.name}] ERROR: ${line}`));
    });

    proc.on('error', err => {
      console.error(`[${service.name}] Failed to start:`, err.message);
    });
  });
  
  console.log('\n✅ All services have been instructed to start.');
  console.log('➡️  Frontend will be available at: http://localhost:5173/');
  console.log('➡️  Gateway will be available at: http://localhost:3000/');
  console.log('Press Ctrl+C to stop everything.\n');
});
