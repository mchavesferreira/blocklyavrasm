'use strict';

goog.provide('Blockly.Blocks.inputoutput');

goog.require('Blockly.Blocks');


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9if9fy
Blockly.Blocks['inout_highlow'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(65);
		this.appendDummyInput()
		.appendField("Setar Saida");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Update the sprites; this should be called once per frame');
	}
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u969zn
Blockly.Blocks['inout_digital_write'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(165);
		this.appendValueInput("NUMBER")
		.setCheck("Number")
		.appendField("Setar entrada #");
		this.appendValueInput("X")
		.setCheck("Number")
		.appendField("Para");
		this.appendValueInput("Y")
		.setCheck("Number")
		.appendField("maximo");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Moves a certain sprite to the specified coordinates; please note that the new coordinates will only be effective after "Updade sprites" is called.');
	}
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e7x9r6
Blockly.Blocks['inout_digital_read'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(65);
		this.appendValueInput("NUMBER")
		.setCheck("Number")
		.appendField("Setar entrada #");
		this.appendValueInput("TILE_NUMBER")
		.setCheck("Number")
		.appendField("to");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};


Blockly.Blocks['inout_analog_write'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(65);
		this.appendDummyInput()
		.appendField("Aguardar tempo");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Waits for VBlank; this should be called once per frame');
	}
};




Blockly.Blocks['inout_funcaose'] = {
  init: function() {
    this.appendValueInput("IF")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("THEN")
        .setCheck(null)
        .appendField("então");
     this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField("falso");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("http://arduino.cc/en/Reference/delay");
  }
};




Blockly.Blocks['pinos_in_pullup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Define pino entrada:")
        .appendField(new Blockly.FieldDropdown([["(8)PB0","B,0"], ["(9)PB1","B,1"], ["(10)PB2","B,2"], ["((11)PB3","B,3"], ["(12)PB4","B,4"], ["(13)PB5","B,5"],  ["(A0)PC0","C,0"], ["(A1)PC1","C,1"], ["(A2)PC2","C,2"], ["(A3)PC3","C,3"], ["(A4)PC4","C,4"], ["(A5)PC5","C,5"], ["(0)PD0","D,0"], ["(1)PD1","D,1"], ["(2)PD2","D,2"], ["(3)PD3","D,3"], ["(4)PD4","D,4"], ["(5)PD5","D,5"], ["(6)PD6","D,6"], ["(7)PD7","D,7"]]), "pino_in")
        .appendField(new Blockly.FieldDropdown([["ativar_pull-up","pullup"], ["não_ativar_pull-up","nopullup"]]), "estado_pullup");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("Define cada pino como entrada e ativa pull-up");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['define_estado_saida'] = {
	init: function() {
		this.appendDummyInput()
		.appendField("Define nivel saída:")
		.appendField(new Blockly.FieldDropdown([["(8)PB0","B,0"], ["(9)PB1","B,1"], ["(10)PB2","B,2"], ["((11)PB3","B,3"], ["(12)PB4","B,4"], ["(13)PB5","B,5"],  ["(A0)PC0","C,0"], ["(A1)PC1","C,1"], ["(A2)PC2","C,2"], ["(A3)PC3","C,3"], ["(A4)PC4","C,4"], ["(A5)PC5","C,5"], ["(0)PD0","D,0"], ["(1)PD1","D,1"], ["(2)PD2","D,2"], ["(3)PD3","D,3"], ["(4)PD4","D,4"], ["(5)PD5","D,5"], ["(6)PD6","D,6"], ["(7)PD7","D,7"]]), "pino_saida")
		.appendField(new Blockly.FieldDropdown([["0-LOW","baixo"], ["1-HIGH","alto"]]), "estado_saida");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(120);
		this.setTooltip("Define nível do pino de saída high/low");
		this.setHelpUrl("");
	}
};


Blockly.Blocks['pinos_output'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Define pino saída:")
       .appendField(new Blockly.FieldDropdown([["(8)PB0","B,0"], ["(9)PB1","B,1"], ["(10)PB2","B,2"], ["((11)PB3","B,3"], ["(12)PB4","B,4"], ["(13)PB5","B,5"],  ["(A0)PC0","C,0"], ["(A1)PC1","C,1"], ["(A2)PC2","C,2"], ["(A3)PC3","C,3"], ["(A4)PC4","C,4"], ["(A5)PC5","C,5"], ["(0)PD0","D,0"], ["(1)PD1","D,1"], ["(2)PD2","D,2"], ["(3)PD3","D,3"], ["(4)PD4","D,4"], ["(5)PD5","D,5"], ["(6)PD6","D,6"], ["(7)PD7","D,7"]]), "pino_out")
        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
 this.setTooltip("Define cada pino como saída");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pino_boolean'] = {
	init: function() {
  
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldDropdown([["(8)PB0","B,0"], ["(9)PB1","B,1"], ["(10)PB2","B,2"], ["((11)PB3","B,3"], ["(12)PB4","B,4"], ["(13)PB5","B,5"],  ["(A0)PC0","C,0"], ["(A1)PC1","C,1"], ["(A2)PC2","C,2"], ["(A3)PC3","C,3"], ["(A4)PC4","C,4"], ["(A5)PC5","C,5"], ["(0)PD0","D,0"], ["(1)PD1","D,1"], ["(2)PD2","D,2"], ["(3)PD3","D,3"], ["(4)PD4","D,4"], ["(5)PD5","D,5"], ["(6)PD6","D,6"], ["(7)PD7","D,7"]]), "pino_in");
	  //this.setInputsInline(true);
	  this.setOutput(true, "Boolean");
	  this.setHelpUrl('http://www.example.com/');
	  this.setColour(210);
	 // this.setPreviousStatement(true, null);  // acrescentadp
	 // this.setNextStatement(true, null);  // acrescentado
	  this.setTooltip("Le o status do pino HIGH ou LOW ");
	}
  };



