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

// --- Ultrasonic Sensor (HC-SR04) ---
Blockly.Arduino['ultrasonic_read'] = function (block) {
    var trigPin = block.getFieldValue('TRIG_PIN');
    var echoPin = block.getFieldValue('ECHO_PIN');

    Blockly.Arduino.reservePin(
        block, trigPin, Blockly.Arduino.PinTypes.OUTPUT, 'Ultrasonic Trig');
    Blockly.Arduino.reservePin(
        block, echoPin, Blockly.Arduino.PinTypes.INPUT, 'Ultrasonic Echo');

    Blockly.Arduino.addSetup('ultrasonic_' + trigPin + '_' + echoPin,
        'pinMode(' + trigPin + ', OUTPUT);\n' +
        '  pinMode(' + echoPin + ', INPUT);', false);

    var functionName = Blockly.Arduino.addFunction(
        'readUltrasonicDistance',
        'long readUltrasonicDistance(int trigPin, int echoPin) {\n' +
        '  digitalWrite(trigPin, LOW);\n' +
        '  delayMicroseconds(2);\n' +
        '  digitalWrite(trigPin, HIGH);\n' +
        '  delayMicroseconds(10);\n' +
        '  digitalWrite(trigPin, LOW);\n' +
        '  long duration = pulseIn(echoPin, HIGH);\n' +
        '  return duration * 0.034 / 2;\n' +
        '}');

    var code = functionName + '(' + trigPin + ', ' + echoPin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- Color Sensor (TCS3200) ---
Blockly.Arduino['color_sensor_read'] = function (block) {
    var s0 = block.getFieldValue('S0');
    var s1 = block.getFieldValue('S1');
    var s2 = block.getFieldValue('S2');
    var s3 = block.getFieldValue('S3');
    var out = block.getFieldValue('OUT');
    var colorComp = block.getFieldValue('COLOR_COMP');

    Blockly.Arduino.reservePin(block, s0, Blockly.Arduino.PinTypes.OUTPUT, 'Color S0');
    Blockly.Arduino.reservePin(block, s1, Blockly.Arduino.PinTypes.OUTPUT, 'Color S1');
    Blockly.Arduino.reservePin(block, s2, Blockly.Arduino.PinTypes.OUTPUT, 'Color S2');
    Blockly.Arduino.reservePin(block, s3, Blockly.Arduino.PinTypes.OUTPUT, 'Color S3');
    Blockly.Arduino.reservePin(block, out, Blockly.Arduino.PinTypes.INPUT, 'Color OUT');

    Blockly.Arduino.addSetup('color_sensor_init_' + out,
        'pinMode(' + s0 + ', OUTPUT);\n' +
        '  pinMode(' + s1 + ', OUTPUT);\n' +
        '  pinMode(' + s2 + ', OUTPUT);\n' +
        '  pinMode(' + s3 + ', OUTPUT);\n' +
        '  pinMode(' + out + ', INPUT);\n' +
        '  // Set frequency scaling to 20%\n' +
        '  digitalWrite(' + s0 + ', HIGH);\n' +
        '  digitalWrite(' + s1 + ', LOW);', false);

    var filterCode = '';
    if (colorComp === 'RED') {
        filterCode = 'digitalWrite(' + s2 + ', LOW); digitalWrite(' + s3 + ', LOW);';
    } else if (colorComp === 'GREEN') {
        filterCode = 'digitalWrite(' + s2 + ', HIGH); digitalWrite(' + s3 + ', HIGH);';
    } else if (colorComp === 'BLUE') {
        filterCode = 'digitalWrite(' + s2 + ', LOW); digitalWrite(' + s3 + ', HIGH);';
    }

    var functionName = Blockly.Arduino.addFunction(
        'readColor_' + colorComp,
        'int readColor_' + colorComp + '(int s2, int s3, int out) {\n' +
        '  ' + filterCode + '\n' +
        '  return pulseIn(out, LOW);\n' +
        '}');

    var code = functionName + '(' + s2 + ', ' + s3 + ', ' + out + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// --- Sound Sensor ---
Blockly.Arduino['sound_sensor_read'] = function (block) {
    var pin = block.getFieldValue('PIN');
    Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'Sound Sensor');
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
