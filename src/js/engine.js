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

				if(i> 50){fator = -2;}else{fator =1}

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

