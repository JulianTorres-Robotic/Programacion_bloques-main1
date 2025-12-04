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

// --- Wifi (ESP32/8266) ---
Blockly.Arduino['wifi_connect'] = function (block) {
    var ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
    var password = Blockly.Arduino.valueToCode(block, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.addInclude('wifi_lib',
        '#if defined(ESP32)\n' +
        '  #include <WiFi.h>\n' +
        '#elif defined(ESP8266)\n' +
        '  #include <ESP8266WiFi.h>\n' +
        '#endif');

    var setupCode =
        '#if defined(ESP32) || defined(ESP8266)\n' +
        '  WiFi.begin(' + ssid + ', ' + password + ');\n' +
        '  // Wait for connection (non-blocking in setup usually, but here we might want to wait)\n' +
        '#endif\n';

    Blockly.Arduino.addSetup('wifi_begin', setupCode, false);

    return '';
};

Blockly.Arduino['wifi_is_connected'] = function (block) {
    var code = '(WiFi.status() == WL_CONNECTED)';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
