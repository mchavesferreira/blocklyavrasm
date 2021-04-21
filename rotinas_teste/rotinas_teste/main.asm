;
; rotinas_teste.asm
;
; Created: 22/01/2020 23:07:53
; Author : Marcos
;

    .EQU $RAM_Var	= 0X03D4  
	.EQU pressao	= $RAM_Var + $0	; pressao
	.EQU temperatura	= $RAM_Var + $2	; temperatura


; Replace with your application code
start:
	ldi R16, 255
	sts pressao, R16
	ldi R16, 15
	sts temperatura, R16
		ldi R16, 30
	sts pressao, R16
	ldi R16, 20
	sts temperatura, R16
	rjmp start


    bset 6  ; seta o bit 6 T de SREG
	bld r1,2  ; copia bit T para bit2 registrador R1
	sbrc r1,2 ; pula proxima linha se bit2=0
	rjmp falso
	rjmp verdadeiro

falso:
    ldi r16,255
	rjmp fim
verdadeiro:
    ldi r16,15
	rjmp fim

fim:
    rjmp fim
