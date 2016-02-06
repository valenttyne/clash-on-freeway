//funcao chamada para iniciar o jogo
function start(){
	//oculta a tela de inicio
	$('#inicio').hide();

	//adiciona a div fundo o jogador e os inimigos
	$('#fundo').append("<div id='player'></div>");
	$('#fundo').append("<div id='en01'></div>");
	$('#fundo').append("<div id='en02'></div>");
	$('#fundo').append("<div id='en03'></div>");
	$('#fundo').append("<div id='en04'></div>");
	$('#fundo').append("<div id='en05'></div>");


}