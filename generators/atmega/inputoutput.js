'use strict';

goog.provide('Blockly.Z80.inputoutput');

goog.require('Blockly.Z80');

Blockly.Z80['inout_highlow'] = function(block) {
	var code = 'call setasaidaalta\n';
	return code;
};

Blockly.Z80['inout_digital_write'] = function(block) {
	var value_number = Blockly.Z80.valueToCode(block, 'NUMBER', Blockly.Z80.ORDER_ATOMIC) || 'ld hl, 0\n';
	var value_x = Blockly.Z80.valueToCode(block, 'X', Blockly.Z80.ORDER_ATOMIC) || 'ldi R16, 0\n';
	var value_y = Blockly.Z80.valueToCode(block, 'Y', Blockly.Z80.ORDER_ATOMIC) || 'ldi R16, 0\n';
	
	var code = [
		value_x.trim(),
		'push hl', // Save X coordinate for later
		value_y.trim(),
		'push hl', // Save Y coordinate for later
		value_number.trim(),
		'pop bc', // BC contains the Y coordinate
		'pop de', // DE contains the X cordinate
		'call MoveSpriteXY'
	];
	return code.join('\n') + '\n';
};

Blockly.Z80['inout_digital_read'] = function(block) {
	var sprite_number = Blockly.Z80.valueToCode(block, 'NUMBER', Blockly.Z80.ORDER_ATOMIC) || 'ld digital, out\n';
	var tile_number = Blockly.Z80.valueToCode(block, 'TILE_NUMBER', Blockly.Z80.ORDER_ATOMIC) || 'ld hl, 0\n';
	
	var code = [
		tile_number.trim(),
		'push hl', // Save tile number for later
		sprite_number.trim(),
		'pop de', // DE contains the tile number
		'call digitalread'
	];
	return code.join('\n') + '\n';
};

Blockly.Z80['inout_analog_write'] = function(block) {
	var code = 'call analogwrite\n';
	return code;
};



Blockly.Z80['inout_funcaose'] = function(block) {
  // Ternary operator.
  var order = Blockly.Z80.ORDER_ATOMIC;
  var value_if = Blockly.Z80.valueToCode(block, 'IF', order) || 'ld hli, 0\n';
  var value_then = Blockly.Z80.valueToCode(block, 'THEN', order) || 'ld hlt, 0\n';
  var value_else = Blockly.Z80.valueToCode(block, 'ELSE', order) || 'ld hle, 0\n';
  
  var ifYes = Blockly.Z80.variableDB_.getDistinctName('ternary_yes_', Blockly.Variables.NAME_TYPE);
  var ifNot = Blockly.Z80.variableDB_.getDistinctName('ternary_not_', Blockly.Variables.NAME_TYPE);
  var ifDone = Blockly.Z80.variableDB_.getDistinctName('ternary_done_', Blockly.Variables.NAME_TYPE);
  
  var code = [value_if.trim(),
		'ld a, h',
		'or l',
		'jr nz, ' + ifYes,
		'jp ' + ifNot,
		ifYes + ':',
		value_then.trim(), 
		'jp ' + ifDone,
		ifNot + ':',
		value_else.trim(),
		ifDone + ':'].join('\n') + '\n';  
  
  return [code, Blockly.Z80.ORDER_ATOMIC];
};

Blockly.Z80['pinos_in_pullup'] = function(block) {
  var which_pino = block.getFieldValue('pino_in');
  var which_estado_pino = block.getFieldValue('estado_pullup');

  var code = [
  'cbi DDR' +   which_pino + ' ; pino configurado entrada ' ,
  (which_estado_pino == 'pullup' ? 'sbi ' + 'PORT' + which_pino + ' ; pull-up ativo ' : '      ; pull-up não ativo ')
	
  ];
  
   return code.join('\n') + '\n';
};

Blockly.Z80['pinos_output'] = function(block) {
  var which_pino = block.getFieldValue('pino_out');

  var code = [
  'sbi DDR' +   which_pino + ' ; pino configurado saída ' 
	
  ];
  
   return code.join('\n') + '\n';
};

Blockly.Z80['pino_boolean'] = function(block) {
	var dropdown_pino_in = block.getFieldValue('pino_in');
	// TODO: Assemble JavaScript into code variable.
	var code = [
	  'sbic PIN' +   dropdown_pino_in + ' ; ler pino ' 
		
	  ];
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Z80.ORDER_ATOMIC];
  };


/////    *888    88  88    88  88  888  88  888   8
Blockly.Z80['define_estado_saida'] = function(block) {
	var which_pinosaida = block.getFieldValue('pino_saida');
	var which_estado_saida = block.getFieldValue('estado_saida');

	var code = [
	(which_estado_saida == 'baixo' ? 'cbi ' + 'PORT' + which_pinosaida + ' ; setar nivel baixo ' : 'sbi ' + 'PORT' + which_pinosaida + ' ; setar nivel alto ')

	];

	return code.join('\n') + '\n';
};


  