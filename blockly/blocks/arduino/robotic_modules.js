/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for RoboticMinds specific hardware modules.
 *     Includes: Ultrasonic, Bluetooth, Color Sensor, Sound Sensor, 8x8 Display, Wifi.
 */
'use strict';

goog.provide('Blockly.Blocks.robotic_modules');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.robotic_modules.HUE = 180;//ANTES 180

// --- Ultrasonic Sensor (HC-SR04) ---
Blockly.Blocks['ultrasonic_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ultrasonic Sensor (HC-SR04)");
        this.appendDummyInput()
            .appendField("Trig Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'TRIG_PIN');
        this.appendDummyInput()
            .appendField("Echo Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ECHO_PIN');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads distance in cm using HC-SR04 ultrasonic sensor.');
        this.setHelpUrl('https://howtomechatronics.com/tutorials/arduino/ultrasonic-sensor-hc-sr04/');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'TRIG_PIN', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'ECHO_PIN', 'digitalPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

// --- Color Sensor (TCS3200) ---
Blockly.Blocks['color_sensor_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Color Sensor (TCS3200)");
        this.appendDummyInput()
            .appendField("S0")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S0');
        this.appendDummyInput()
            .appendField("S1")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S1');
        this.appendDummyInput()
            .appendField("S2")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S2');
        this.appendDummyInput()
            .appendField("S3")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'S3');
        this.appendDummyInput()
            .appendField("OUT")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'OUT');
        this.appendDummyInput()
            .appendField("Read Component")
            .appendField(new Blockly.FieldDropdown([
                ['Red', 'RED'], ['Green', 'GREEN'], ['Blue', 'BLUE']]), 'COLOR_COMP');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads RGB color component frequency.');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S0', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S1', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S2', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'S3', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'OUT', 'digitalPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};

// --- Sound Sensor ---
Blockly.Blocks['sound_sensor_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Sound Sensor Read");
        this.appendDummyInput()
            .appendField("Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.analogPins), 'PIN');
        this.setOutput(true, Blockly.Types.NUMBER.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads analog value from sound sensor.');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER;
    }
};