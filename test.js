const alphabotHal = require('./');

const hal = alphabotHal();

let leftTick = rightTick = 0;

hal.on('leftTick', () => leftTick++);
hal.on('rightTick', () => rightTick++);

setInterval(() => {
  console.log('Left obsstacle:', hal.obstacleSensors.left(), 'Right obstacle', hal.obstacleSensors.right());
}, 100);

console.log(`Battery: ${hal.batteryVoltage().toFixed(2)}v`);

console.log('Driving forward at 40% PWM for a second.');
hal.wheels.left(40);
hal.wheels.right(40);

setTimeout(() => {
  console.log('Stopping motors.');
  hal.wheels.left(0);
  hal.wheels.right(0);

  setTimeout(() => {
    console.log('Tick count:', 'left:', leftTick, 'right:', rightTick);
    process.exit();
  }, 1000);
}, 1000);
