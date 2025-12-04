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

// --- 8x8 Display (MAX7219) ---
Blockly.Blocks['display_8x8_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Display 8x8 Setup (MAX7219)");
        this.appendDummyInput()
            .appendField("DIN Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIN');
        this.appendDummyInput()
            .appendField("CLK Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'CLK');
        this.appendDummyInput()
            .appendField("CS Pin")
            .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'CS');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Initializes MAX7219 8x8 LED Matrix.');
    },
    updateFields: function () {
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'DIN', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'CLK', 'digitalPins');
        Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'CS', 'digitalPins');
    }
};

Blockly.Blocks['display_8x8_draw'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Display 8x8 Draw Row");
        this.appendValueInput("ROW")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("Row (0-7)");
        this.appendValueInput("BITMAP")
            .setCheck(Blockly.Types.NUMBER.checkList)
            .appendField("Bitmap (0-255)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.robotic_modules.HUE);
        this.setTooltip('Draws a row on the 8x8 matrix.');
    }
};