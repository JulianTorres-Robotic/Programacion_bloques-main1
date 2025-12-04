/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
    '<xml>' +
    '  <sep></sep>' +
    '  <category id="catLogic" name="Logic">' +
    '    <block type="controls_if"></block>' +
    '    <block type="logic_compare"></block>' +
    '    <block type="logic_operation"></block>' +
    '    <block type="logic_negate"></block>' +
    '    <block type="logic_boolean"></block>' +
    '    <block type="logic_null"></block>' +
    '    <block type="logic_ternary"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catLoops" name="Loops">' +
    '    <block type="controls_repeat_ext">' +
    '      <value name="TIMES">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="controls_whileUntil"></block>' +
    '    <block type="controls_for">' +
    '      <value name="FROM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="BY">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="controls_flow_statements"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catMath" name="Math">' +
    '    <block type="math_number"></block>' +
    '    <block type="math_arithmetic"></block>' +
    '    <block type="math_single"></block>' +
    '    <block type="math_trig"></block>' +
    '    <block type="math_constant"></block>' +
    '    <block type="math_number_property"></block>' +
    '    <block type="math_change">' +
    '      <value name="DELTA">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_round"></block>' +
    '    <block type="math_modulo"></block>' +
    '    <block type="math_constrain">' +
    '      <value name="LOW">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="HIGH">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_random_int">' +
    '      <value name="FROM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_random_float"></block>' +
    '    <block type="base_map"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catText" name="Text">' +
    '    <block type="text"></block>' +
    '    <block type="text_join"></block>' +
    '    <block type="text_append">' +
    '      <value name="TEXT">' +
    '        <block type="text"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="text_length"></block>' +
    '    <block type="text_isEmpty"></block>' +
    //'    <!--block type="text_trim"></block Need to update block -->' +
    //'    <!--block type="text_print"></block Part of the serial comms -->' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catVariables" name="Variables">' +
    '    <block type="variables_get"></block>' +
    '    <block type="variables_set"></block>' +
    '    <block type="variables_set">' +
    '      <value name="VALUE">' +
    '        <block type="variables_set_type"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="variables_set_type"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
    '  <sep></sep>' +
    '  <category id="catInputOutput" name="Input/Output">' +
    '    <block type="io_digitalwrite">' +
    '      <value name="STATE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_digitalread"></block>' +
    '    <block type="io_builtin_led">' +
    '      <value name="STATE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_analogwrite"></block>' +
    '    <block type="io_analogread"></block>' +
    '    <block type="io_highlow"></block>' +
    '    <block type="io_pulsein">' +
    '      <value name="PULSETYPE">' +
    '        <shadow type="io_highlow"></shadow>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_pulsetimeout">' +
    '      <value name="PULSETYPE">' +
    '        <shadow type="io_highlow"></shadow>' +
    '      </value>' +
    '      <value name="TIMEOUT">' +
    '        <shadow type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </shadow>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catTime" name="Time">' +
    '    <block type="time_delay">' +
    '      <value name="DELAY_TIME_MILI">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1000</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="time_delaymicros">' +
    '      <value name="DELAY_TIME_MICRO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="time_millis"></block>' +
    '    <block type="time_micros"></block>' +
    '    <block type="infinite_loop"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catAudio" name="Audio">' +
    '    <block type="io_tone">' +
    '      <field name="TONEPIN">0</field>' +
    '      <value name="FREQUENCY">' +
    '        <shadow type="math_number">' +
    '          <field name="NUM">220</field>' +
    '        </shadow>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_notone"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catMotors" name="Motors">' +
    '    <block type="servo_write">' +
    '      <value name="SERVO_ANGLE">' +
    '        <block type="math_number">' +
    '          <field name="NUM">90</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="servo_read"></block>' +
    '    <block type="stepper_config">' +
    '      <field name="STEPPER_NUMBER_OF_PINS">2</field>' +
    '      <field name="STEPPER_PIN1">1</field>' +
    '      <field name="STEPPER_PIN2">2</field>' +
    '      <value name="STEPPER_STEPS">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="STEPPER_SPEED">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="stepper_step">' +
    '      <value name="STEPPER_STEPS">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catComms" name="Comms">' +
    '    <block type="serial_setup"></block>' +
    '    <block type="serial_print"></block>' +
    '    <block type="text_prompt_ext">' +
    '      <value name="TEXT">' +
    '        <block type="text"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="spi_setup"></block>' +
    '    <block type="spi_transfer"></block>' +
    '    <block type="spi_transfer_return"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catRoboticMindsSensor" name="RoboticMindsSensor">' +
    '    <block type="ultrasonic_read"></block>' +
    '    <block type="color_sensor_read"></block>' +
    '    <block type="sound_sensor_read"></block>' +
    '  </category>' +
    '<category id="catRoboticMindsMotor" name="RoboticMindsMotor">' +
    '    <block type="motor_setup"></block>' +
    '    <block type="motor_run">' +
    '       <value name="SPEED">' +
    '         <block type="math_number">' +
    '           <field name="NUM">255</field>' +
    '         </block>' +
    '       </value>' +
    '    </block>' +
    '    <block type="motor_stop"></block>' +
    '  </category>' +
    '  <category id="catRoboticMindsBluetooth" name="RoboticMindsBluetooth">' +
    '    <block type="bluetooth_setup"></block>' +
    '    <block type="bluetooth_available"></block>' +
    '    <block type="bluetooth_read_string"></block>' +
    '    <block type="bluetooth_send_string">' +
    '      <value name="DATA">' +
    '        <block type="text">' +
    '          <field name="TEXT">Hello</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '  <category id="catRoboticMindsDisplay" name="RoboticMindsDisplay">' +
    '    <block type="display_8x8_setup"></block>' +
    '    <block type="display_8x8_draw">' +
    '       <value name="ROW">' +
    '         <block type="math_number">' +
    '           <field name="NUM">0</field>' +
    '         </block>' +
    '       </value>' +
    '       <value name="BITMAP">' +
    '         <block type="math_number">' +
    '           <field name="NUM">255</field>' +
    '         </block>' +
    '       </value>' +
    '    </block>' +
    '  </category>' +
    '  <category id="catRoboticMindsWifi" name="RoboticMindsWifi">' +
    '    <block type="wifi_connect">' +
    '      <value name="SSID">' +
    '        <block type="text">' +
    '          <field name="TEXT">MyWifi</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="PASSWORD">' +
    '        <block type="text">' +
    '          <field name="TEXT">password</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="wifi_is_connected"></block>' +
    '  </category>' +
    '</xml>';
