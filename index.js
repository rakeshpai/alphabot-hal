const EventEmitter = require('events');
const wpi = require('wiring-pi');

const tlc1543 = require('tlc1543');
const wheel = require('./wheel');
const wheelEncoder = require('./wheel-encoder');

const defaultPins = {
  leftMotorIn1: 32,
  leftMotorIn2: 33,
  leftMotorEnable: 31,

  rightMotorIn1: 40,
  rightMotorIn2: 38,
  rightMotorEnable: 37,

  leftWheelEncoder: 26,
  rightWheelEncoder: 24
};

const adcChannels = {
  battery: 10,
  leftObstacle: 8,
  rightObstacle: 9
};

module.exports = pins => {
  pins = { ...pins, ...defaultPins };

  wpi.wiringPiSetupPhys();

  const adcRead = tlc1543(wpi);

  const hal = Object.create(EventEmitter.prototype);

  wheelEncoder({ wpi, hal, pin: pins.leftWheelEncoder, eventName: 'leftTick' });
  wheelEncoder({ wpi, hal, pin: pins.rightWheelEncoder, eventName: 'rightTick' });

  hal.wheels = {
    left: wheel(wpi, {
      in1: pins.leftMotorIn1,
      in2: pins.leftMotorIn2,
      enable: pins.leftMotorEnable
    }),
    right: wheel(wpi, {
      in1: pins.rightMotorIn1,
      in2: pins.rightMotorIn2,
      enable: pins.rightMotorEnable
    })
  };

  hal.obstacleSensors = {
    left: () => adcRead(adcChannels.leftObstacle),
    right: () => adcRead(adcChannels.rightObstacle)
  };

  hal.batteryVoltage = () => (adcRead(adcChannels.battery) * 10 / 1024) + 0.4;

  return hal;
}
