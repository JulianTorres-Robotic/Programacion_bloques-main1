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

// --- Wifi (ESP32/8266) ---
Blockly.Blocks['wifi_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Wifi Connect");
        this.appendValueInput("SSID")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("SSID");
        this.appendValueInput("PASSWORD")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("Password");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Connects to a Wifi network (ESP32/ESP8266 only).');
    }
};

Blockly.Blocks['wifi_is_connected'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Wifi Connected?");
        this.setOutput(true, Blockly.Types.BOOLEAN.output);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Checks if Wifi is connected.');
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN;
    }
};