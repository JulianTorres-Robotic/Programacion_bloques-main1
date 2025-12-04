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

// --- Motor (L298N / Generic H-Bridge) ---
Blockly.Blocks['motor_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Motor Setup");
        this.appendDummyInput()
            .appendField("Motor Name")
            .appendField(new Blockly.FieldTextInput("Motor1"), "MOTOR_NAME");
        this.appendDummyInput()
            .appendField("IN1 Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'IN1');
        this.appendDummyInput()
            .appendField("IN2 Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'IN2');
        this.appendDummyInput()
            .appendField("EN Pin (PWM)")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins), 'EN');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Configures a DC Motor with L298N driver (IN1, IN2, EN).');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'IN1', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'IN2', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'EN', 'pwmPins');
    }
};

Blockly.Blocks['motor_run'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Run Motor");
        this.appendDummyInput()
            .appendField("Motor Name")
            .appendField(new Blockly.FieldTextInput("Motor1"), "MOTOR_NAME");
        this.appendDummyInput()
            .appendField("Direction")
            .appendField(new Blockly.FieldDropdown([["Forward", "FORWARD"], ["Backward", "BACKWARD"]]), "DIRECTION");
        this.appendValueInput("SPEED")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("Speed (0-255)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Runs the motor at specified speed and direction.');
    }
};

Blockly.Blocks['motor_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Stop Motor");
        this.appendDummyInput()
            .appendField("Motor Name")
            .appendField(new Blockly.FieldTextInput("Motor1"), "MOTOR_NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Stops the motor.');
    }
};
