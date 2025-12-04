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

// --- Motor (L298N / Generic H-Bridge) ---
Blockly.Arduino['motor_setup'] = function (block) {
    var motorName = block.getFieldValue('MOTOR_NAME');
    var in1 = block.getFieldValue('IN1');
    var in2 = block.getFieldValue('IN2');
    var en = block.getFieldValue('EN');

    var cleanName = motorName.replace(/[^a-zA-Z0-9_]/g, '');

    Blockly.Arduino.reservePin(block, in1, Blockly.Arduino.PinTypes.OUTPUT, 'Motor ' + cleanName + ' IN1');
    Blockly.Arduino.reservePin(block, in2, Blockly.Arduino.PinTypes.OUTPUT, 'Motor ' + cleanName + ' IN2');
    Blockly.Arduino.reservePin(block, en, Blockly.Arduino.PinTypes.OUTPUT, 'Motor ' + cleanName + ' EN');

    Blockly.Arduino.addDeclaration('motor_pins_' + cleanName,
        'const int ' + cleanName + '_IN1 = ' + in1 + ';\n' +
        'const int ' + cleanName + '_IN2 = ' + in2 + ';\n' +
        'const int ' + cleanName + '_EN = ' + en + ';');

    Blockly.Arduino.addSetup('motor_setup_' + cleanName,
        'pinMode(' + cleanName + '_IN1, OUTPUT);\n' +
        '  pinMode(' + cleanName + '_IN2, OUTPUT);\n' +
        '  pinMode(' + cleanName + '_EN, OUTPUT);', false);

    return '';
};

Blockly.Arduino['motor_run'] = function (block) {
    var motorName = block.getFieldValue('MOTOR_NAME');
    var direction = block.getFieldValue('DIRECTION');
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var cleanName = motorName.replace(/[^a-zA-Z0-9_]/g, '');

    var code = '';
    if (direction === 'FORWARD') {
        code += 'digitalWrite(' + cleanName + '_IN1, HIGH);\n';
        code += 'digitalWrite(' + cleanName + '_IN2, LOW);\n';
    } else {
        code += 'digitalWrite(' + cleanName + '_IN1, LOW);\n';
        code += 'digitalWrite(' + cleanName + '_IN2, HIGH);\n';
    }
    code += 'analogWrite(' + cleanName + '_EN, ' + speed + ');\n';

    return code;
};

Blockly.Arduino['motor_stop'] = function (block) {
    var motorName = block.getFieldValue('MOTOR_NAME');
    var cleanName = motorName.replace(/[^a-zA-Z0-9_]/g, '');

    var code = 'digitalWrite(' + cleanName + '_IN1, LOW);\n';
    code += 'digitalWrite(' + cleanName + '_IN2, LOW);\n';
    code += 'analogWrite(' + cleanName + '_EN, 0);\n';

    return code;
};
