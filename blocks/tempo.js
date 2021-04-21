'use strict';

goog.provide('Blockly.Blocks.tempo');

goog.require('Blockly.Blocks');


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9if9fy
Blockly.Blocks['atraso_segundos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Atraso em segundos");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

