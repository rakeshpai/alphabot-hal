alphabot-hal
===

This npm module makes it easy to talk to the hardware on a [AlphaBot](http://www.waveshare.com/wiki/AlphaBot) using node.js.

Install
---
```
npm install alphabot-hal
```

Usage
---
This module needs to be executed with root privileges. This means you need to run with `sudo`, or use some other technique for managing permissions.

```javascript
const alphabotHal = require('alphabot-hal');

const hal = alphabotHal();

// Go forward at 60% PWM
hal.wheels.left(60);
hal.wheels.right(60);
```

API
---
# `hal.wheels.left(speed)`, `hal.wheels.right(speed)`

Sets the speed of the left and right motors. The speed can be a value between `-100` and `+100`. Negative values make the motors spin in reverse. Setting speed to 0 makes them stop.

# `hal.obstacleSensors.left()`, `hal.obstacleSensors.right()`

Returns the ADC reading from the obstacle sensor. In my case, I only got values roughly between 25 and 45, with a max range of under 10 cms. So it's not great, but it's something. I think that's all you can expect from these crappy obstacle sensors.

# `hal.on('leftTick', cb)`, `hal.on('rightTick', cb)`

These events are emitted when the wheel encoder detects a 'tick'. Ticks are picked up on both the rising and falling edges of the IR receiver output, so two ticks events are raised per notch of the encoder wheel.

License: MIT
