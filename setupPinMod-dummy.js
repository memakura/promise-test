device = 'dummy';
debug = true;

const PIN_NOTSET = 0xFF;
const PINMODE_OUTPUT_DIGITAL = 0x00;
const PINMODE_INPUT = 0x01;
const PINMODE_ANALOG = 0x02;
const PINMODE_ANALOG_INPUT = 0x03;

pinMode = [PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, 
  PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, 
  PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, 
  PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET, PIN_NOTSET];


// Show pin settings
function showPinSetting(microbit) {
  console.log('enter showPinSetting');
  setTimeout(function() {
    console.log('pinsetting AD: ' + microbit);
  }, 16);
  setTimeout(function() {
    console.log('pinsetting IO: ' + microbit);
  }, 16);
  console.log('return showPinSetting');
}

// Setting up pin mode (analog/digital and input/output)
function setupPinMode(data) {
  console.log('enter setupPinMode');
  if (device !== null) {
    function log(data) {
      console.log('microbit: setup pin ' + data.pin + ' as ' + data.ADmode + ' ' + data.IOmode);
    }
    // SubscribeData
    function subscribe(device, data) {
      console.log('subscribe enter. Pin: ' + data.pin);
      log(data);
      setTimeout(function() { // trigger a pinDataChange        
        console.log('device.readPin: ' + data.pin);
        if (debug) { showPinSetting(device); }
      }, 16);
    }
    // UnsubscribeData
    function unsubscribe(device) {
      console.log('unsubscribe enter. Pin: ' + data.pin);
      log(data);
      if (debug) { showPinSetting(device); }
    }

    pinMode[data.pin] = PINMODE_OUTPUT_DIGITAL;
    if (data.IOmode == 'input') {
      pinMode[data.pin] += PINMODE_INPUT;
      setTimeout(function() {
        console.log('device.pinInput: ' + data.pin);
        if (data.ADmode == 'analog') {
          pinMode[data.pin] += PINMODE_ANALOG;
          setTimeout(function() {
            console.log('device.pinAnalog: ' + data.pin);
            subscribe(device, data);
          }, 16);
        } else {
          setTimeout(function() {
            console.log('device.pinDigital: ' + data.pin);
            subscribe(device, data);
          }, 16);
        };
      }, 16);
    } else {
      setTimeout(function(error) {
        if (data.ADmode == 'analog') {
          pinMode[data.pin] += PINMODE_ANALOG;
          setTimeout(function() {
            console.log('device.pinAnalog: ' + data.pin);
            unsubscribe(device);
          }, 16);
        } else {
          setTimeout(function() {
            console.log('device.pinDigital: ' + data.pin);
            unsubscribe(device);
          }, 16);
        }
      }, 16);
    }
    console.log('return setupPinmode');
  }
}
// ------------- pin settings (end) ----------------

function initializePinSetting(microbit) {
    for (var pin=0; pin <= 2; pin++) {
        setupPinMode({pin: pin, ADmode: 'analog', IOmode: 'input'});    
    }
}

console.log('----- start initialization -----');
initializePinSetting();
console.log('----- end initialization -----');


console.log('===== BEGIN set digital output =====');
setupPinMode({pin: 1, ADmode: 'digital', IOmode: 'output'});
console.log('===== END set digital output =====');
