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

// --- Bluetooth (HC-05/06) ---
Blockly.Blocks['bluetooth_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bluetooth Setup (HC-05/06)");
        this.appendDummyInput()
            .appendField("RX Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'RX_PIN');
        this.appendDummyInput()
            .appendField("TX Pin")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'TX_PIN');
        this.appendDummyInput()
            .appendField("Baud Rate")
            .appendField(new Blockly.FieldDropdown([
                ['9600', '9600'], ['38400', '38400'], ['115200', '115200']]), 'BAUD');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Initializes Bluetooth module using SoftwareSerial (or Serial1 on supported boards).');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'RX_PIN', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(
            this, 'TX_PIN', 'digitalPins');
    }
};

Blockly.Blocks['bluetooth_available'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bluetooth Available?");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Checks if data is available to read from Bluetooth.');
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};

Blockly.Blocks['bluetooth_read_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bluetooth Read String");
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Reads a string from Bluetooth.');
    },
    getBlockType: function () {
        return Blockly.Types.TEXT;
    }
};

Blockly.Blocks['bluetooth_send_string'] = {
    init: function () {
        this.appendValueInput("DATA")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("Bluetooth Send String");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Sends a string via Bluetooth.');
    }
};
