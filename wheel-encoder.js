module.exports = ({ wpi, hal, pin, eventName }) => {
  wpi.wiringPiISR(pin, wpi.INT_EDGE_BOTH, delta => {
    hal.emit(eventName, delta);
  });
};
