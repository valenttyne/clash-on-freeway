//funcao chamada para iniciar o jogo
function start(){
	//oculta a tela de inicio
	$('#inicio').hide();

	//adiciona a div fundo o jogador e os inimigos
	$('#fundo').append("<div id='player'></div>");
	$('#fundo').append("<div id='en01'></div>");


}