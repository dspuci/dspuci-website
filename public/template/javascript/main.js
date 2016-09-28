/* =Main INIT Functions
-------------------------------------------------------------- */
function initializeVisia() {

	"use strict";

	//IE9 RECOGNITION
	if (jQuery.browser.msie && jQuery.browser.version == 9) {

		jQuery('html').addClass('ie9');
	}

	//NAVIGATION CUSTOM FUNCTION
	jQuery(document).aetherNavigation();

	//LOCAL SCROLL
	jQuery('.navigation, .call-to-action').localScroll({
		offset: -50
	});

	jQuery("#top").click(function () {
		return jQuery("body,html").stop().animate({
			scrollTop: 0
		}, 800, "easeOutCubic"), !1;
	});

	//RESPONSIVE HEADINGS
	jQuery("h1").fitText(1.8, { minFontSize: '30px', maxFontSize: '52px' });
	jQuery("h2").fitText(1.5, { minFontSize: '20px', maxFontSize: '36px' });


	//HERO DIMENSTION AND CENTER
	(function() {
	    function heroInit(){
	       var hero = jQuery('.hero'),
				ww = jQuery(window).width(),
				wh = jQuery(window).height(),
				heroHeight = wh;

			hero.css({
				height: heroHeight+"px",
			});

			var heroContent = jQuery('.hero .content'),
				contentHeight = heroContent.height(),
				parentHeight = hero.height(),
				topMargin = (parentHeight - contentHeight) / 2;

			heroContent.css({
				"margin-top" : topMargin+"px"
			});
	    }

	    jQuery(window).on("resize", heroInit);
	    jQuery(document).on("ready", heroInit);
	})();

	//HERO TICKER
	var current = 1; 
	var height = jQuery('.ticker').height(); 
	var numberDivs = jQuery('.ticker').children().length; 
	var first = jQuery('.ticker h1:nth-child(1)'); 
	setInterval(function() {
	    var number = current * -height;
	    first.css('margin-top', number + 'px');
	    if (current === numberDivs) {
	        first.css('margin-top', '0px');
	        current = 1;
	    } else current++;
	}, 2500);

	//ANIMATIONS
	jQuery('.animated').appear();

	jQuery(document.body).on('appear', '.fade', function() {
		jQuery(this).each(function(){ jQuery(this).addClass('ae-animation-fade') });
	});
	jQuery(document.body).on('appear', '.slide', function() {
		jQuery(this).each(function(){ jQuery(this).addClass('ae-animation-slide') });
	});
	jQuery(document.body).on('appear', '.hatch', function() {
		jQuery(this).each(function(){ jQuery(this).addClass('ae-animation-hatch') });
	});
	jQuery(document.body).on('appear', '.entrance', function() {
		jQuery(this).each(function(){ jQuery(this).addClass('ae-animation-entrance') });
	});

	//QUOTES
	jQuery('.bxslider').bxSlider({
		mode: 'fade',
		touchEnabled: true,
		oneToOneTouch: true,
		pagerCustom: '#bx-pager',
		nextSelector: '#bx-next',
  		prevSelector: '#bx-prev',
		nextText: 'next',
		prevText: 'prev'
	});

	//CONTACT-FORM
	jQuery('#contact-open').click(function (e) {
		e.preventDefault();
		if ( jQuery('#contact-form').is(':hidden') ) {
			jQuery('#contact-form').slideDown();
			 jQuery('html, body').delay(200).animate({ 
			      scrollTop: jQuery('#contact-form').offset().top 
			  }, 1000);
		} else {
			jQuery('#contact-form').slideUp();
		}
	});

	jQuery('#contactform').submit(function(){

		var action = jQuery(this).attr('action');

		jQuery("#alert").slideUp(750,function() {
			jQuery('#alert').hide();

 		jQuery('#submit')
			.after('<img src="images/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');

		jQuery.post(action, {
			name: jQuery('#name').val(),
			email: jQuery('#email').val(),
			message: jQuery('#message').val()
		},
			function(data){
				document.getElementById('alert').innerHTML = data;
				jQuery('#alert').slideDown('slow');
				jQuery('#contactform img.loader').fadeOut('slow',function(){jQuery(this).remove()});
				jQuery('#submit').removeAttr('disabled');

			}
		);

		});

		return false;

	});

	//PARALLAX EFFECTS
	jQuery('.parallax-bg1').parallax("50%", 0.5);
	jQuery('.parallax-bg2').parallax("50%", 0.5);
	jQuery('.parallax-bg3').parallax("50%", 0.4);

	//RESPONSIVE VIDEO
	jQuery(".container").fitVids();
	
	//BLOG SLIDER
	jQuery(".gallery").bxSlider({
		pager: false,
		nextSelector: ".gallery-next",
		prevSelector: ".gallery-prev",
		nextText: "next",
		prevText: "prev"
	});	

	//FULLSCREEN SLIDER CONTROLS
	jQuery('#vegas-next').click(function(){
		jQuery.vegas('next');

		return false;
	});
	jQuery('#vegas-prev').click(function(){
		jQuery.vegas('previous');

		return false;
	});
};

function initializePortfolio() {

	"use strict";

	var current,
		next, 
		prev,
		target, 
		hash,
		url,
		page,
		title,	  	  	  
		projectIndex,
		scrollPostition,
		projectLength,
		ajaxLoading = false,
		wrapperHeight,
		pageRefresh = true,
		content =false,
		correction = 30,
		headerH = jQuery('.logo').height()+correction,
		portfolioGrid = jQuery('.projectlist'),
		easing = 'easeOutExpo',
		folderName ='projects';

		jQuery('.project-navigation ul').hide();
		jQuery('.closeProject a').hide();

	jQuery(window).bind( 'hashchange', function() {
		hash = jQuery(window.location).attr('hash'); 
		 var root = '#!'+ folderName +'/';
		 var rootLength = root.length;

		 if( hash.substr(0,rootLength) != root ){
			return;						
		} else {	

			hash = jQuery(window.location).attr('hash'); 
			url = hash.replace(/[#\!]/g, '' );

			portfolioGrid.find('.project.current').children().removeClass('active');
			portfolioGrid.find('.project.current').removeClass('current');
			jQuery('.portfolio').find('.projectlist.active-folio').removeClass('active-folio');
			jQuery('.portfolio').find('.ajax-content.active-ajax, .project-navigation.active-ajax, .closeProject.active-ajax, .loader.active-ajax').removeClass('active-ajax');

			portfolioGrid.find('.project a[href="#!' + url + '"]' ).parent().addClass( 'current' );
		 	portfolioGrid.find('.project.current').find('a[href="#!' + url + '"]').addClass('active');

		 	portfolioGrid.find('.project a[href="#!' + url + '"]' ).parents('.projectlist').addClass( 'active-folio' );
		 	jQuery('.active-folio').siblings('.ajax-section').children('.ajax-content, .project-navigation, .closeProject, .loader').addClass('active-ajax');

		 	var projectContainer = jQuery('.ajax-content.active-ajax');
		 	var loader = jQuery('.loader.active-ajax');
		 	var projectNav = jQuery('.project-navigation.active-ajax ul');
		 	var exitProject = jQuery('.closeProject.active-ajax a');

			/* IF URL IS PASTED IN ADDRESS BAR AND REFRESHED */
			if(pageRefresh == true && hash.substr(0,rootLength) ==  root){	

				jQuery('html,body').stop().animate({scrollTop: (projectContainer.offset().top-20)+'px'},800,'easeOutExpo', function(){											
					loadProject();																									  
				});

			/* CLICKING ON PORTFOLIO GRID OR THROUGH PROJECT NAVIGATION */	
			}else if(pageRefresh == false && hash.substr(0,rootLength) == root){

				jQuery('html,body').stop().animate({scrollTop: (projectContainer.offset().top-headerH)+'px'},800,'easeOutExpo', function(){ 		
	
				if(content == false){						
					loadProject();							
				}else{	
					projectContainer.animate({opacity:0,height:wrapperHeight},function(){
						loadProject();
					});
				}
						
				projectNav.fadeOut('100');
				exitProject.fadeOut('100');
						
				});

			/* USING BROWSER BACK BUTTON WITHOUT REFRESHING */
			}else if(hash=='' && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == true){	
		        scrollPostition = hash; 
				jQuery('html,body').stop().animate({scrollTop: scrollPostition+'px'},1000,function(){				
							
					deleteProject();								
							
				});
			}
	 	}
	});

	function loadProject(){
		var loader = jQuery('.loader.active-ajax');

		loader.fadeIn().removeClass('projectError').html('');


		if(!ajaxLoading) {				
			ajaxLoading = true;

			var projectContainer = jQuery('.ajax-content.active-ajax');

			projectContainer.load( url +' div#ajaxpage', function(xhr, statusText, request){

				if(statusText == "success"){				

				ajaxLoading = false;

				page = jQuery('#ajaxpage');

				jQuery('.slider').bxSlider({
					mode: 'horizontal',
					touchEnabled: true,
					swipeThreshold: 50,
					oneToOneTouch: true,
					pagerSelector: '.slider-pager',
					controls: false,
					tickerHover: true
				});

				jQuery('#ajaxpage').waitForImages(function() {
				    hideLoader();  
				});

				jQuery(".container").fitVids();								  

				}

				if(statusText == "error"){

				loader.addClass('projectError').append(loadingError);

				loader.find('p').slideDown();

				}

			});

		}
			
	}

	function hideLoader(){
		var loader = jQuery('.loader.active-ajax');

		loader.delay(400).fadeOut( function(){													  
					showProject();					
			});			 
	}

	function showProject(){

		var projectContainer = jQuery('.ajax-content.active-ajax');
		var projectNav = jQuery('.project-navigation.active-ajax ul');
		var exitProject = jQuery('.closeProject.active-ajax a');

		wrapperHeight = projectContainer.children('#ajaxpage').outerHeight()+'px';
		
		if(content==false){

			wrapperHeight = projectContainer.children('#ajaxpage').outerHeight()+'px';

			projectContainer.animate({opacity:1,height:wrapperHeight}, function(){
				jQuery(".container").fitVids();
				scrollPostition = jQuery('html,body').scrollTop();
				projectNav.fadeIn();
				exitProject.fadeIn();
				content = true;	
				
			});

		} else {
			wrapperHeight = projectContainer.children('#ajaxpage').outerHeight()+'px';

			projectContainer.animate({opacity:1,height:wrapperHeight}, function(){
				jQuery(".container").fitVids();																		  
				scrollPostition = jQuery('html,body').scrollTop();
				projectNav.fadeIn();
				exitProject.fadeIn();

			});					
		}


		projectIndex = portfolioGrid.find('.project.current').index();
		projectLength = jQuery('.project a').length-1;


		if(projectIndex == projectLength){

			jQuery('.nextProject a').addClass('disabled');
			jQuery('.prevProject a').removeClass('disabled');

		} else if(projectIndex == 0) {

			jQuery('.prevProject a').addClass('disabled');
			jQuery('.nextProject a').removeClass('disabled');

		} else {

			jQuery('.nextProject a, .prevProject a').removeClass('disabled');

		}
	
  	}

  	function deleteProject(closeURL){

  		var projectContainer = jQuery('.ajax-content.active-ajax');
  		var projectNav = jQuery('.project-navigation.active-ajax ul');
  		var exitProject = jQuery('.closeProject.active-ajax a');

		projectNav.fadeOut();
		exitProject.fadeOut();

		if(typeof closeURL!='undefined' && closeURL!='') {
			window.location.hash = '#_';
		}

		projectContainer.animate({opacity:0,height:'0px'},800,'easeOutExpo');
		projectContainer.empty();
		jQuery('html,body').stop().animate({
			scrollTop: (projectContainer.offset().top-headerH-100)+'px'},600
		);

		jQuery('.portfolio').find('.projectlist.active-folio').removeClass('active-folio');
		jQuery('.portfolio').find('.ajax-content.active-ajax, .project-navigation.active-ajax, .closeProject.active-ajax').removeClass('active-ajax');
		portfolioGrid.find('.project.current').children().removeClass('active');
		portfolioGrid.find('.project.current').removeClass('current');			
 	}

 	jQuery('.nextProject a').on('click',function () {											   							   
					 
		current = portfolioGrid.find('.project.current');
		next = current.next('.project');
		target = jQuery(next).children('a').attr('href');
		jQuery(this).attr('href', target);

		if (next.length === 0) { 
			return false;			  
		} 

		current.removeClass('current'); 
		current.children().removeClass('active');
		next.addClass('current');
		next.children().addClass('active');
	   
	});

	jQuery('.prevProject a').on('click',function () {			
			
		current = portfolioGrid.find('.project.current');
		prev = current.prev('.project');
		target = jQuery(prev).children('a').attr('href');
		jQuery(this).attr('href', target);


		if (prev.length === 0) {
			return false;			
		}

		current.removeClass('current');  
		current.children().removeClass('active');
		prev.addClass('current');
		prev.children().addClass('active');

	});

	jQuery('.closeProject a').on('click',function () {

		var loader = jQuery('.loader.active-ajax'); 
							
		deleteProject(jQuery(this).attr('href'));					
		
		portfolioGrid.find('.project.current').children().removeClass('active');			
		loader.fadeOut();

		return false;
	});

	pageRefresh = false;
};
/* END ------------------------------------------------------- */


/* =Window Load Trigger
-------------------------------------------------------------- */
jQuery(window).load(function(){

	jQuery(window).trigger( 'hashchange' );
	jQuery(window).trigger( 'resize' );
  	jQuery('[data-spy="scroll"]').each(function () {
    	var $spy = $(this).scrollspy('refresh');
	});

});
/* END ------------------------------------------------------- */


/* =Document Ready Trigger
-------------------------------------------------------------- */
jQuery(document).ready(function(){

	initializeVisia();
	initializePortfolio();

});
/* END ------------------------------------------------------- */