//funcao chamada para iniciar o jogo
function start(){
	//oculta a tela de inicio
	$('#inicio').hide();

	//adiciona a div fundo o jogador e os inimigos
	$('#fundo').append("<div id='player' class='animaPlayer'></div>");


	//loop
	var jogo = {};
	jogo.timer = setInterval(loop,30);

	var carrosStage;

	//funcao de loop, tudo aqui e executado em loop
	function loop(){
		
		//gera inimigos
		classe1a5  = Math.floor((Math.random() * 5) + 1);
		classe6a10  = Math.floor(6 + Math.random() * 10);
		idDoCarro = Math.floor((Math.random() * 100) + 1);
		//regula a direcao do carro
		if(idDoCarro > 51){//menor 51
			ajuste = classe1a5;
		}else{//maior 51
			ajuste = classe6a10;
		}
		//senao nao tiver o id ainda o insere
		if($('#'+idDoCarro).position() == undefined){
			$('#fundo').append("<div class='en"+ajuste+"' id='carro"+idDoCarro+"' style='display:none;'></div>");
		}	
		//move inimigos
		for(i=1;i<101;i++){

			$('#carro'+i).show();
				
			if( ($('#carro'+i).position() == undefined) == false ){

				//muda a dificuldade de acordo com o nivel dos carros
				posicaoTop = parseInt($('#carro'+i).position().top);
				if(i> 50){
					fator = -(2+ fatorAjuste(posicaoTop));
				}else{
					fator = 1 + fatorAjuste(posicaoTop);
				}
				
				//pega a posicao do carro para movimenta lo
				posicao = parseInt($('#carro'+i).position().left);

				if( (i<51 && posicao >= 918) || (i>50 && posicao <= 16) ){
					$('#carro'+i).remove();
				}else{
					$('#carro'+i).css('left',posicao+ (fator) );
				}

			}
		}



	}


}

function fatorAjuste(altura){

	switch(altura){
		case 30: return 9;break;
		case 80: return 8;break;
		case 130: return 7;break;
		case 180: return 6;break;
		case 230: return 5;break;

		case 330: return 4;break;
		case 380: return 3;break;
		case 430: return 2;break;
		case 480: return 1;break;
		case 530: return 0;break;
	}

	return 0;

}