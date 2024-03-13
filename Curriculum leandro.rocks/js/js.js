
	
/*
	function nxtSection(){
		if($("section:not(.introducao, .up)").size() > 0){
			//console.log("foi");
			$("section:not(.introducao, .up)").first().addClass("up");
//			$('section.up').animate({
//			  scrollTop: 0
//			}, 1000);
			$('section.up').delay(1000).addClass("scrollable");
		}
	}

	function prevSection(){
		if($("section.up:not(.introducao)").size() > 0){
			//console.log("foi");
			$("section.up:not(.introducao)").last().removeClass("up");
//			$('section.up').animate({
//			  scrollTop: 0
//			}, 1000);
			$('section.up').delay(1000).addClass("scrollable");
		}
	}
*/

contato = {
	whatsapp: "+55 (22) 997804955",
	skype: "live:leandro.pires.souza"
};

$(function(){
	terminou = true;
	var timer;
	position = 0;
	
	$( document ).on( "mobileinit", function() {
		$.mobile.loader.prototype.options.disabled = true;
	});

	$(window).bind('mousewheel DOMMouseScroll', function(event){
		if ((event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && terminou) {
			$(this).trigger("upscroll");
			
		}
		else if(terminou && ($("section.up:last-child div.container").scrollTop() == $("section.up:last-child div.container").height())){
			$(this).trigger("downscroll");
			
		}
		terminou = false;
		clearTimeout($.data(this, 'timer'));
		$.data(this, 'timer', setTimeout(function() {
			terminou = true;
		}, 75));
	});
	

	
	lastScrollTop = 0;
	
	$(window).scroll(function(){
		//top = document.scrollTop;
		topp = $(this).scrollTop();
		alt = $(this).height();
		console.log(topp+"   "+alt);
		
		if(topp > (alt - 10)){
			//$("section.linha-do-tempo").css({"position":"fixed", "top": "10px"});
			$("section.linha-do-tempo").addClass("up");
		}else if(topp < (alt - 10)){
			//$("section.linha-do-tempo").css({"position":"fixed", "top": "10px"});
			$("section.linha-do-tempo").removeClass("up");
		}
		
		if(topp > ((alt*2) + 70)){
			//$("section.linha-do-tempo").css({"position":"fixed", "top": "10px"});
			$("section.portfolio").addClass("up");
		}else if(topp < ((alt*2) + 70)){
			//$("section.linha-do-tempo").css({"position":"fixed", "top": "10px"});
			$("section.portfolio").removeClass("up");
		}
		
	});
	/*
	$(window).on("scrollstart", function(event){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
		   $(this).trigger("downscroll");
	   } else {
		   $(this).trigger("upscroll");
	   }
	   lastScrollTop = st;
	});
	*/
	
	$(window).on('swipedown',function(){ 
		//nxtSection();
		console.log("swipedown");
	});
	$(window).on('swipeup',function(){
		//prevSection();
		console.log("swipeup");
	});
	
	$(window).on("downscroll", function(){
		//nxtSection();
	});
	
	$(window).on("upscroll", function(){
		//prevSection();
	});
	
	$(document).keydown(function(e) {
		switch(e.which) {
			case 38:
				// up
				//prevSection();
				break;

			case 40:
				// down
				//nxtSection();
				break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	
	$("section.linha-do-tempo ul li").click(function(){
		$("section.linha-do-tempo ul li").removeClass("ativo");
		$(this).addClass("ativo");
	});
	
	$("section.linha-do-tempo ul li").on("hover",function(){
		$("section.linha-do-tempo ul li").removeClass("ativo");
		$(this).addClass("ativo");
	});
	
	$("section.portfolio div.detalhes img").click(function(){
		$("div.img-container img").attr('src', $(this).attr('src').replace("mini", "big"));
		$("div.img-container").addClass("up");
		$("section").addClass("blurred");
	});
	
	$("div.img-container").click(function(){
		$(this).removeClass("up");
		$("section").removeClass("blurred");
	});
	
	$("ul.redes li.clickable").click(function(){
		position = $(this).position().left;
		contact = $(this).attr("data-contato");
		
		console.log(contato[contact]);
		
		$("div.detalhe-contato span").text(contato[contact]);
		
		$(this).addClass("curr");
		//$("ul.redes li.curr").css("transition", "left 1s");
		$("ul.redes li.curr a").css("left", $("ul.redes li.curr a").position().left);
		
		$(this).addClass("current");
		
		$("ul.redes li:not(.current)").addClass("blurred");
		$("div.detalhe-contato").addClass("show");
		
		//$("ul.redes li.curr").css("left", 0);
		if($(window).width()>470){
			$("ul.redes li.curr a").animate({left: 0}, 500, "linear");
		}else{
			$("ul.redes li.curr a").animate({left: ($("ul.redes").width()/2)-16}, 500, "linear");
		}
	});
	
	$("div.detalhe-contato button.fechar").click(function(){
		
		$("ul.redes li:not(.current)").removeClass("blurred");
		$("div.detalhe-contato").removeClass("show");
		$("ul.redes li.curr a").animate({left: position, position:'relative'},{
			duration: 500, 
			easing: "linear", 
			complete: function(){
				$("ul.redes li.curr").delay(1000).queue(function() {  // Wait for 1 second.
					$(this).removeClass("current curr").dequeue();
				});
			}
		});
	});
	
	$("form.recado").on("submit", function(){
		nome = $("input.nome").val();
		email = $("input.email").val();
		recado = $("textarea.recado").val();
		
		mensagem = "Nome: "+nome+"<br/>"+"Email: "+email+"</br>"+"Recado: "+recado;
		
		
		emailjs.send("gmail", "mensagem", {"mensagem": mensagem})
		.then(function(response) {
			$("form.recado").addClass("sent");
			$("div.resposta").addClass("show");
		}, function(err) {
		   console.log("FAILED. error=", err);
		});
		
		return false;
	});
});