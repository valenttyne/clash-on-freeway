//inicializando as variaveis do jogo
var velocidade_padrao = 2;
var vida = 3; //mude aqui para alterar a quantidade de vidas que o usuario tem
var paraJogo = false;
var ajusteAnt = 0;
var velocidadeJogador = velocidade_padrao ; // mude aqui para mudar a velocidade inicial do jogador
var qtCarroCont = 0;
var qtPontosCont = 1000; //mude aqui para mudar os pontos iniciais do jogador
//urls dos sprites do carros a serem usados no jogo
var urlCarros = [];
urlCarros[1] = '../clashonfreeway/imgs/audivm.png';
urlCarros[2] = '../clashonfreeway/imgs/taxi.png';
urlCarros[3] = '../clashonfreeway/imgs/truck.png';
urlCarros[4] = '../clashonfreeway/imgs/policia.png';
urlCarros[5] = '../clashonfreeway/imgs/redcar.png';
urlCarros[6] = '../clashonfreeway/imgs/ambulancia.png';

//variaveis para manipular as musicas e sons do jogo
var musica =document.getElementById("musica");
var crash =document.getElementById("crash");
var loss =document.getElementById("loss");
var win =document.getElementById("win");
var give =document.getElementById("give");
var powerup =document.getElementById("powerup");

//inserindo um enveto na musica principal para ela ter um loop 
musica.addEventListener("embed", function(){musica.currentTime = 0; musica.play();}, false);

// funcoes para tratar as musicas do jogo
function powerupStop(){
	powerup.pause();
}

function powerupPlay(){
	powerup.play();	
	powerup.currentTime = 0;
	powerup.volume =0.2;
}
function musStop(){
	musica.pause();
}

function musPlay(){
	musica.play();	
	musica.currentTime = 0;
	musica.volume =0.2;
}
function lossStop(){
	loss.pause();
}

function lossPlay(){
	loss.play();	
	loss.currentTime = 0;
	loss.volume =0.2;
}
function winStop(){
	win.pause();
}

function winPlay(){
	win.play();	
	win.currentTime = 0;
	win.volume =0.2;
}
//----------------- fim das funcoes que tratam a musica


//funcao chamada para iniciar o jogo
function start(){
	//oculta a tela de inicio
	$('#inicio,#fimPerda,#fimVitoria').hide();

	//pausando as possiveis musicas que podem estar executando
	lossStop();
	winStop();
	powerupStop();
	//start na musica padrao
	musPlay();
	//pre setando variaveis a serem utilizadas
	paraJogo = false;
	qtPontosCont = 1000;
	qtCarroCont = 0;
	//mostrando o icones das vidas
	$(".vidaImg").show();
	//adiciona a div fundo o jogador e os inimigos
	$('#fundo').append("<div id='player' class='animaPlayer player'></div>");


	//coins
	$('#fundo').append("<div id='coins' class='animaCoins'></div>");
	$('#coins').css('left', (Math.floor((Math.random() * 700) + 1)) ).css('top', (Math.floor((Math.random() * 500) + 50)) );

	//configurando os 02 loops do jogos
	//a performance ficou melhor criando um loop separado para adicionar os carros
	var jogo = {};
	jogo.timer = setInterval(loop,30);
	var jogo2 = {};
	jogo2.timer = setInterval(addCarros,100);

	//gravando cod teclas em variavel para facilitar
	//se quiser mudar as teclas utilizadas e so mudar aqui
	var teclas = {sCima:87, sBaixo:83, sDireita:68,sEsquerda:65}
	//criando um array para guarda se a tecla esta pressionada ou nao
	jogo.pressionou = [];


	//verificando teclas pressionadas
	//a logicao e coloca o indice do array com o cod da tecla pressionada
	//e atribuir a ele true or false depedendo se o usuario pressionou ou soltou
	// a tecla, para ai movimentar o personagem e pausar o movimento
	$(document).keydown(
		function(e){
			jogo.pressionou[e.which] = true;
		}
	);
	//verificando teclas soltas
	$(document).keyup(
		function(e){
			jogo.pressionou[e.which] = false;
		}
	);

	//funcao de movimentacao do jogador
	function movimentaJogador(){
		//guardando eixos atuais do jogador em variavel para facilitar a movimentacao
		var eixoY = parseInt($("#player").position().top);
		var eixoX = parseInt($("#player").position().left);
		//velocidade de movimentacao do personagem
		
		//verifica se uma das teclas esta pressionada e move o jogador
		if(jogo.pressionou[teclas.sCima] && eixoY >= 10 ){$("#player").css('top',eixoY-velocidadeJogador);}
		if(jogo.pressionou[teclas.sBaixo] && eixoY <= 579){$("#player").css('top',eixoY+velocidadeJogador);}
		if(jogo.pressionou[teclas.sDireita] && eixoX <= 920){$("#player").css('left',eixoX+velocidadeJogador).removeClass('playerEsq').addClass('player');}
		if(jogo.pressionou[teclas.sEsquerda] && eixoX >= 15){$("#player").css('left',eixoX-velocidadeJogador).removeClass('player').addClass('playerEsq');}

	}

	//insere os carros no jogo
	function addCarros(){

		if(paraJogo){
			return false;
		}
		qtPontosCont --;
		if(qtPontosCont <= 0){
			fim();
		}

		//gera inimigos
		//descide randomicamente o lado, a posicao e o id do carro
		classe1a5  = Math.floor((Math.random() * 5) + 1); // 1 a 5 fica do lado direto
		classe6a10  = Math.floor(6 + Math.random() * 10); // 6 a 10 fica do lado esquerdo
		idDoCarro = Math.floor((Math.random() * 100) + 1); // gerar um id randomico de 1 a 100
		//nao deixa da dois respaws no mesmo lugar
		while(ajusteAnt == classe1a5 || ajusteAnt == classe6a10){
			classe1a5  = Math.floor((Math.random() * 5) + 1); // 1 a 5 fica do lado direto
			classe6a10  = Math.floor(6 + Math.random() * 10); // 6 a 10 fica do lado esquerdo 
		}

		//regula a direcao do carro
		if(idDoCarro > 50){//se o id gerado for mario que 50 coloca na direira, no topo
			ajuste = classe1a5;
		}else{// se forma menor que 50 coloca no canto esquerdo, em baixo
			ajuste = classe6a10+" rotated";
		}

		//se o id gerado ainda nao estiver na tela o insere style='display:none;'
		if($('#carro'+idDoCarro).position() == undefined){

			$('#fundo').append("<div class='en"+ajuste+" obstaculo ' id='carro"+idDoCarro+"' style='display:none;' ></div>");
			sprintRadom = Math.floor((Math.random() * 6) + 1);
			/*$('#carro'+idDoCarro).css('background-image:url',urlCarros[sprintRadom]);*/
			$('#carro'+idDoCarro).css('background-image', 'url(' + urlCarros[sprintRadom] + ')');
			qtCarroCont ++;
			
			ajusteAnt = ajuste;
			
		}	
	}

	//funcao de loop, tudo aqui e executado em loop
	function loop(){
		
		if(paraJogo){
			return false;
		}


		//verificando vitoria		
		//918px
		if(parseInt($("#player").position().top) <= 10){
			musStop();
			powerupStop();
			winPlay();			
			qtPontosCont = qtPontosCont<0?0:qtPontosCont;
			$("#pontosVT").html('<h2>'+qtPontosCont + ' pontos</h2>');			
			$("#fimVitoria").show();
			$(".obstaculo, #player").remove();
			$('#coins').remove();
			paraJogo =true;
			vida = 3;			
			velocidadeJogador = velocidade_padrao;
		}

		$("#qtCarro").html(qtCarroCont);
		qtPontosCont = qtPontosCont<0?0:qtPontosCont;
		$("#qtPontos").html(qtPontosCont);
		//movimenta o jogador
		movimentaJogador();
		//verifica se houve colisao
		colidir();

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
					qtCarroCont --;
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
		case 130: return 3;break;
		case 180: return 4;break;
		case 230: return 5;break;
		//carros de baixo
		case 330: return 6;break;
		case 380: return 4;break;
		case 430: return 5;break;
		case 480: return 8;break;
		case 530: return 3;break;
	}

	return 0;

}
/*
* @desc detectar a colicisao do jogador com os carros
*/
function colidir(){
	//verifica se colidiu com o carro
	var colidiCarro = ($("#player").collision($(".obstaculo")));
	
	if(colidiCarro.length > 0 ){

		//som batida
		crash.play();

		//se tiver colidido com o carro volta ao inicio
		$("#player").css('left','467px').css('top','580px');

		//diminiu as vidas
		vida --;
		//reinicia as musicas
		powerupStop();
		musPlay();

		$("#vida"+(vida+1)).hide();

		velocidadeJogador = velocidade_padrao;
		$('#coins').remove();
		$('#fundo').append("<div id='coins' class='animaCoins'></div>");
		$('#coins').css('left', (Math.floor((Math.random() * 700) + 1)) ).css('top', (Math.floor((Math.random() * 500) + 50)) );
		qtPontosCont -= 200;

		//verifica se as vidas acabaram
		if(vida <= 0 || qtPontosCont <= 0){
			fim();
		}
	}
	//verificando se o player colidiu com a modeda
	var colidiCoin = ($("#player").collision($("#coins")));
	//se tiver colidido com a moeda, aplicar beneficios e penalidades
	if(colidiCoin.length > 0 ){
		//give.play();
		musStop();
		powerupPlay();
		qtPontosCont -= 100;
		$('#coins').remove();
		velocidadeJogador = velocidade_padrao*2;
	}


}
/**
* @desc faz as acoes nescessario apos um derrota do jogador
*/
function fim(){
	musStop();
	lossPlay();
	powerupStop();
	qtPontosCont = qtPontosCont<0?0:qtPontosCont;
	$("#qtPontos").html(qtPontosCont);
	$("#fimPerda").show();
	$(".obstaculo, #player").remove();
	$('#coins').remove();
	paraJogo =true;
	vida = 3;			
	velocidadeJogador = velocidade_padrao;
}