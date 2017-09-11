module.exports = (wpi, {in1, in2, enable}) => {
  // Initialise
  wpi.softPwmCreate(enable, 0, 100);
  [in1, in2].forEach(pin => wpi.pinMode(pin, wpi.OUTPUT));

  return pwm => {
    if(pwm == 0) {
      wpi.digitalWrite(in1, wpi.LOW);
      wpi.digitalWrite(in2, wpi.LOW);
      wpi.softPwmWrite(enable, 0);
    } else if(pwm > 0) {
      wpi.digitalWrite(in2, wpi.LOW); // Set in2 low first to avoid shorting the battery
      wpi.digitalWrite(in1, wpi.HIGH);
      wpi.softPwmWrite(enable, pwm);
    } else if(pwm < 0) {
      wpi.digitalWrite(in1, wpi.LOW);
      wpi.digitalWrite(in2, wpi.HIGH);
      wpi.softPwmWrite(enable, -1 * pwm);
    }
  };
};
