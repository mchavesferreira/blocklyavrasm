/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Z80 for logic blocks.
 * @author haroldoop@gmail.com (Haroldo de Oliveira Pinheiro)
 */
'use strict';

goog.provide('Blockly.Z80.logic');

goog.require('Blockly.Z80');


Blockly.Z80['controls_if'] = function(block) {
  // If/elseif/else condition.
  var setHlFalse = 'bclr 6 ; limpa flag T SREG\n' +   
                   'bld r1,2 ; copia flag T SREG para bit 2 do R1 \n' ;

  var n = 0;
  var argument = Blockly.Z80.valueToCode(block, 'IF' + n,
      Blockly.Z80.ORDER_NONE) || setHlFalse;
  var branch = Blockly.Z80.statementToCode(block, 'DO' + n);
  
  var endIf = Blockly.Z80.variableDB_.getDistinctName('end_if_', Blockly.Variables.NAME_TYPE);
  
  function generateIf() {
	  var ifYes = Blockly.Z80.variableDB_.getDistinctName('if_yes_', Blockly.Variables.NAME_TYPE);
	  var ifNot = Blockly.Z80.variableDB_.getDistinctName('if_not_', Blockly.Variables.NAME_TYPE);

	  return argument +
			'sbrc r1,2 ;pula prox linha se flag=0 (F)\n' +
			'rjmp ' + ifYes + '\n' +
			'rjmp ' + ifNot + '\n' +
			ifYes + ':\n' +
			branch +
			'rjmp ' + endIf + '\n' +
			ifNot + ':\n';
  }

  var code = generateIf();
  
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Z80.valueToCode(block, 'IF' + n,
        Blockly.Z80.ORDER_NONE) || setHlFalse;
    branch = Blockly.Z80.statementToCode(block, 'DO' + n);
    code += generateIf();
  }
  if (block.elseCount_) {
    branch = Blockly.Z80.statementToCode(block, 'ELSE');
    code += branch;
  }
  
  return code + endIf + ':\n';
};

Blockly.Z80['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': 'CompareR18eqR19 ; em construcao',
    'NEQ': 'CompareR18neqR19 ; em construcao',
    'LT': 'CompareR18ltR19 ; em construcao',
    'LTE': 'CompareR18lteR19 ; em construcao',
    'GT': 'CompareR18gtR19 ; em construcao',
    'GTE': 'CompareR18gteR19 ; em construcao'
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Z80.ORDER_ATOMIC;
  var argument0 = Blockly.Z80.valueToCode(block, 'A', order) || 'bclr 6 ; limpa flag T SREG \n bld r1,2 \n';
  var argument1 = Blockly.Z80.valueToCode(block, 'B', order) || 'bclr 6  ; limpa flag T SREG \n bld r1,2 \n';
  
  var code = ' ldi R16, ' + argument0 +
		' cp R18,R16 ; copia R16 para R18\n' + // Saves first argument  ldi R17, 0
		' ldi R16, ' + argument1 + 
		' cp R19,R16 ; copia R16 para R19\n' + // Restores first argument into DE 'clr r16 \n' 
		'call ' + operator + '\n'; 
		
  return [code, order];
};

Blockly.Z80['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = Blockly.Z80.ORDER_ATOMIC;
  var argument0 = Blockly.Z80.valueToCode(block, 'A', order);
  var argument1 = Blockly.Z80.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'bclr 6  ; limpa flag T SREG \n bld r1,2 \n';
    argument1 = 'bclr 6  ; limpa flag T SREG \n bld r1,2 \n';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'bset 6 \n bld r1,2 \n ' : 'bclr 6 \n bld r1,2 \n';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  
  var ifYes = Blockly.Z80.variableDB_.getDistinctName(operator + '_true_', Blockly.Variables.NAME_TYPE);
  var ifNot = Blockly.Z80.variableDB_.getDistinctName(operator + '_false_', Blockly.Variables.NAME_TYPE);
  var ifDone = Blockly.Z80.variableDB_.getDistinctName(operator + '_done_', Blockly.Variables.NAME_TYPE);
  
  // Build the actual code; short-circuit boolean evaluation is used.
  if (operator == 'and') {
	var code = argument0 +
		'ld a, h\n' +
		'or l\n' +
		'jr nz, ' + ifYes + '\n' +
		'jp ' + ifDone + '\n' +	// If HL is zero, skip the second argument
		ifYes + ':\n' +	// If HL is nonzero, the second argument will determine the final result
		argument1 +
		ifDone + ':\n';
  } else {
	var code = argument0 +
		'ld a, h\n' +
		'or l\n' +
		'jr z, ' + ifNot + '\n' +
		'jp ' + ifDone + '\n' +	// If HL is nonzero, skip the second argument
		ifNot + ':\n' +	// If HL is zero, the second argument will determine the final result
		argument1 +
		ifDone + ':\n';
  }
  
  return [code, order];
};

Blockly.Z80['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Z80.ORDER_ATOMIC;
  var argument0 = Blockly.Z80.valueToCode(block, 'BOOL', order) ||
      'bset 6 ; verdadeiro1 \n';
  var code = argument0 + 'call BooleanNotHL ; em construcao\n';
  return [code, order];
};

Blockly.Z80['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var value = (block.getFieldValue('BOOL') == 'TRUE') ? 'bset 6 ; seta flag T SREG' : 'bclr 6 ; limpa flag T SREG';
  var code =  value + '\n' +    ' bld r1,2 ; copia flag T SREG para bit 2 do R1 \n';
  return [code, Blockly.Z80.ORDER_ATOMIC];
};

//Blockly.Z80['pino_boolean'] = function(block) {
  // Boolean values true and false.
  //var value = (block.getFieldValue('BOOL') == 'TRUE') ? 'sbic pino ; le pino de entrada' : 'bclr 6 ; limpa flag T SREG';
  //var code =  value + '\n' +    ' bld r1,2 ; copia flag T SREG para bit 2 do R1 \n';
  //return [code, Blockly.Z80.ORDER_ATOMIC];
//};



Blockly.Z80['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Z80.ORDER_ATOMIC];
};

Blockly.Z80['logic_ternary'] = function(block) {
  // Ternary operator.
  var order = Blockly.Z80.ORDER_ATOMIC;
  var value_if = Blockly.Z80.valueToCode(block, 'IF', order) || 'ld hl, 0\n';
  var value_then = Blockly.Z80.valueToCode(block, 'THEN', order) || 'ld hl, 0\n';
  var value_else = Blockly.Z80.valueToCode(block, 'ELSE', order) || 'ld hl, 0\n';
  
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
