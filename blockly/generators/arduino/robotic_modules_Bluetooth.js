/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for RoboticMinds specific hardware modules.
 */
'use strict';

goog.provide('Blockly.Arduino.robotic_modules');

goog.require('Blockly.Arduino');

// --- Bluetooth (HC-05/06) ---
Blockly.Arduino['bluetooth_setup'] = function (block) {
    var rxPin = block.getFieldValue('RX_PIN');
    var txPin = block.getFieldValue('TX_PIN');
    var baud = block.getFieldValue('BAUD');

    Blockly.Arduino.reservePin(
        block, rxPin, Blockly.Arduino.PinTypes.INPUT, 'Bluetooth RX');
    Blockly.Arduino.reservePin(
        block, txPin, Blockly.Arduino.PinTypes.OUTPUT, 'Bluetooth TX');

    Blockly.Arduino.addInclude('bluetooth_lib',
        '#if defined(ESP32)\n' +
        '  #include <HardwareSerial.h>\n' +
        '  HardwareSerial BTSerial(1);\n' +
        '#else\n' +
        '  #include <SoftwareSerial.h>\n' +
        '  SoftwareSerial BTSerial(' + rxPin + ', ' + txPin + ');\n' +
        '#endif');

    var setupCode = '';
    setupCode += '#if defined(ESP32)\n';
    setupCode += '  BTSerial.begin(' + baud + ', SERIAL_8N1, ' + rxPin + ', ' + txPin + ');\n';
    setupCode += '#else\n';
    setupCode += '  BTSerial.begin(' + baud + ');\n';
    setupCode += '#endif\n';

    Blockly.Arduino.addSetup('bluetooth_init', setupCode, false);

    return '';
};

Blockly.Arduino['bluetooth_available'] = function (block) {
    var code = 'BTSerial.available()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_read_string'] = function (block) {
    var code = 'BTSerial.readString()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_send_string'] = function (block) {
    var data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var code = 'BTSerial.print(' + data + ');\n';
    return code;
};
