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

// --- 8x8 Display (MAX7219) ---
Blockly.Arduino['display_8x8_setup'] = function (block) {
    var din = block.getFieldValue('DIN');
    var clk = block.getFieldValue('CLK');
    var cs = block.getFieldValue('CS');

    Blockly.Arduino.addDeclaration('display_8x8_pins',
        'const int DIN_PIN = ' + din + ';\n' +
        'const int CLK_PIN = ' + clk + ';\n' +
        'const int CS_PIN = ' + cs + ';');

    Blockly.Arduino.addSetup('display_8x8_pins_mode',
        'pinMode(DIN_PIN, OUTPUT);\n' +
        '  pinMode(CLK_PIN, OUTPUT);\n' +
        '  pinMode(CS_PIN, OUTPUT);', false);

    var funcName = Blockly.Arduino.addFunction(
        'max7219_write',
        'void max7219_write(int din, int clk, int cs, byte address, byte data) {\n' +
        '  digitalWrite(cs, LOW);\n' +
        '  shiftOut(din, clk, MSBFIRST, address);\n' +
        '  shiftOut(din, clk, MSBFIRST, data);\n' +
        '  digitalWrite(cs, HIGH);\n' +
        '}');

    Blockly.Arduino.addSetup('display_8x8_init',
        funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x09, 0x00); // Decode mode: none\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0B, 0x07); // Scan limit: all digits\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0C, 0x01); // Shutdown: normal operation\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0A, 0x0F); // Intensity: max\n' +
        '  ' + funcName + '(DIN_PIN, CLK_PIN, CS_PIN, 0x0F, 0x00); // Display test: off', false);

    return '';
};

Blockly.Arduino['display_8x8_draw'] = function (block) {
    var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bitmap = Blockly.Arduino.valueToCode(block, 'BITMAP', Blockly.Arduino.ORDER_ATOMIC) || '0';
    return 'max7219_write(DIN_PIN, CLK_PIN, CS_PIN, ' + row + ' + 1, ' + bitmap + ');\n';
};