//funcao chamada para iniciar o jogo
function start(){
	//oculta a tela de inicio
	$('#inicio').hide();

	//adiciona a div fundo o jogador e os inimigos
	$('#fundo').append("<div id='player' class='animaPlayer'></div>");


	//loop
	var jogo = {};
	jogo.timer = setInterval(loop,30);


	//funcao de loop, tudo aqui e executado em loop
	function loop(){
		
		//gera inimigos
		//descide randomicamente o lado, a posicao e o id do carro
		classe1a5  = Math.floor((Math.random() * 5) + 1); // 1 a 5 fica do lado direto
		classe6a10  = Math.floor(6 + Math.random() * 10); // 6 a 10 fica do lado esquerdo
		idDoCarro = Math.floor((Math.random() * 100) + 1); // gerar um id randomico de 1 a 100

		//regula a direcao do carro
		if(idDoCarro > 50){//se o id gerado for mario que 50 coloca na direira, no topo
			ajuste = classe1a5;
		}else{// se forma menor que 50 coloca no canto esquerdo, em baixo
			ajuste = classe6a10;
		}

		//se o id gerado ainda nao estiver na tela o insere style='display:none;'
		if($('#'+idDoCarro).position() == undefined){
			$('#fundo').append("<div class='en"+ajuste+" animaCarro' id='carro"+idDoCarro+"' style='display:none;' ></div>");
		}	

		//move inimigos
		for(i=1;i<101;i++){

			//torna o carro visivel
			$('#carro'+i).show();
			
			//confirma que o carro existe, ou seja, que a posicao dele nao e nula	
			if( ($('#carro'+i).position() == undefined) == false ){

				//pego a posicao y do carro para ver se ele tem alguem ajuste de velocidade por causa da faixa que ele esta
				posicaoTop = parseInt($('#carro'+i).position().top);
				//muda a dificuldade de acordo com o nivel dos carros
				//se o id for maior que 50, diminui o eixo , por que ele vai esta na direita e tem que vir para esquerda			
				if(i> 50){
					fator = -(2+ fatorAjuste(posicaoTop));
				}else{//se o id for maior aumenta o eixo, porque ele vai esta na esquerda e tem que ir para direita
					fator = 1 + fatorAjuste(posicaoTop);
				}

				//pega a posicao do carro para movimenta-lo
				//uso o parteInt para garantir que vou receber um numero para os calculos
				posicao = parseInt($('#carro'+i).position().left);

				//verifica se o carro saiu da area principal e o remove se tiver saido	
				if( (i<51 && posicao >= 918) || (i>50 && posicao <= 16) || (i < 50 && posicao <= 10) ){
					$('#carro'+i).remove();
				}else{//movimenta o carro adicionando o fator na posicao atual dele
					$('#carro'+i).css('left',posicao+ (fator) );
				}

			}
		}




	}//fim funcao loop


}
/**
* @desc ajusta a velocidade do carro de acordo com a posicao dele na tela
* isso dara um efeito de o carro de uma faixa esta andando mais rapido do que o da outra
*/
function fatorAjuste(altura){

	switch(altura){
		//carro de cima
		case 30: return 9;break;
		case 80: return 8;break;
		case 130: return 7;break;
		case 180: return 6;break;
		case 230: return 5;break;
		//carros de baixo
		case 330: return 7;break;
		case 380: return 4;break;
		case 430: return 5;break;
		case 480: return 8;break;
		case 530: return 0;break;
	}

	return 0;

}