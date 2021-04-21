

inputoutput.js

Blockly.Blocks['pinos_output'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Define pino saída:")
         .appendField(new Blockly.FieldDropdown([["(8)PB0","B,0"], ["(9)PB1","B,1"], ["(10)PB2","B,2"], ["((11)PB3","B,3"], ["(12)PB4","B,4"], ["(13)PB5","B,5"], 
          ["(A0)PC0","C,0"], ["(A1)PC1","C,1"], ["(A2)PC2","C,2"], ["(A3)PC3","C,3"], ["(A4)PC4","C,4"], ["(A5)PC5","C,5"], ["(0)PD0","D,0"], ["(1)PD1","D,1"],
           ["(2)PD2","D,2"], ["(3)PD3","D,3"], ["(4)PD4","D,4"], ["(5)PD5","D,5"], ["(6)PD6","D,6"], ["(7)PD7","D,7"]]), "pino_out")
          
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(200);
   this.setTooltip("Define cada pino como saída");
   this.setHelpUrl("");
    }


//novo
Blockly.Blocks['pino_boolean'] = {
    init: function() {
      this.setHelpUrl('http://www.example.com/');
      this.setColour(120);
      this.setPreviousStatement(true, null);  // acrescentadp
  this.setNextStatement(true, null);  // acrescentado
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["(8)PB0", "B,0"], ["(9)PB1", "B,1"], ["(10)PB2", "B,2"]]), "pino_in");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setTooltip("Le o status do pino HIGH ou LOW ");
    }
  };
    generator

    Blockly.Z80['pinos_output'] = function(block) {
        var which_pino = block.getFieldValue('pino_out');
      
        var code = [
        'sbi DDR' +   which_pino + ' ; pino configurado saída ' 
          
        ];
        
         return code.join('\n') + '\n';
      };

      ----------------------------
      Blockly.Z80['pino_boolean'] = function(block) {
        // Boolean values true and false.
        var value = (block.getFieldValue('BOOL') == 'TRUE') ? 'sbic pino ; le pino de entrada' : 'bclr 6 ; limpa flag T SREG';
        var code =  value + '\n' +    ' bld r1,2 ; copia flag T SREG para bit 2 do R1 \n';
        return [code, Blockly.Z80.ORDER_ATOMIC];
      };


      /// original
      Blockly.Blocks['pino_boolean'] = {
        /**
         * Block for boolean data type: true and false.
         * @this Blockly.Block
         */
        init: function() {
          var BOOLEANS =
              [[Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
               [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']];
          this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
          this.setColour(210);
          this.setOutput(true, 'Boolean');
          this.appendDummyInput()
              .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
          this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
        }
      };


      blocks compressed

      Blockly.Blocks.pino_boolean={init:function(){
          
        var a=[[Blockly.Msg.LOGIC_BOOLEAN_TRUE,"TRUE"],
              [Blockly.Msg.LOGIC_BOOLEAN_FALSE,"FALSE"]];
      this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
      this.setColour(210);
      this.setOutput(!0,"Boolean");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(a),"BOOL");
      this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP)}};

