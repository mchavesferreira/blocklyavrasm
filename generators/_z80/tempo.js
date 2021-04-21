'use strict';

goog.provide('Blockly.Z80.tempo');

goog.require('Blockly.Z80');

Blockly.Z80['atraso_segundos'] = function(block) {
	var code = 'call atraso_segundos\n';
	return code;
};
