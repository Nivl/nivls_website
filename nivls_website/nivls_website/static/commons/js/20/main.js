/* google prettyprint  */

function preview() {
    var markdownConverter = new Markdown.getSanitizingConverter();

    $(document).on('input keydown', '[data-parse="1"]', function() {
	var target = $(this).data('target');
	$(target).html(markdownConverter.makeHtml($(this).val()));
    }).trigger('input');

    $(document).on('keydown', '[data-parse="1"]', function() {
	$(this).stopTime();
	$(this).oneTime(500, function() { styleCode(); });
    });
}

function styleCode() {
    var a = false;

    $("pre code").parent().each(function() {
	if (!$(this).hasClass("prettyprint")) {
	    $(this).addClass("prettyprint");
	    a = true;
	}
    });

    if (a) {
	prettyPrint();
    }
}

$(function() {

    /***********
     * Nav bar
     **********/
    var navbar_current = $('#navbar-main-list > li.active').offset();
    var navbar_img = $('<div>');
    navbar_img.attr('id', 'navbar_img');
    if (navbar_current != null)
	navbar_img.offset(navbar_current);
    navbar_img.css('top', '0px');
    $('#navbar').prepend(navbar_img);
    $('#navbar-main-list > li.active').removeClass('active');
    $('#navbar-main-list > li a').click(function() {
	var parent = $(this).parent('li');
	var left = $(parent).offset()['left'];
    	navbar_img.animate({
	    left: left
     	}, {
	    duration: 'slow',
	    easing: 'easeOutBack'
	});
    });

    $(document).on('click', 'a[data-navbar]', function() {
	var target = $(this).data('navbar');
	var left = $(target).offset()['left'];
    	navbar_img.animate({
	    left: left
     	}, {
	    duration: 'slow',
	    easing: 'easeOutBack'
	});
    });

    $('.hide-navbar-img').click(function(){
    	navbar_img.animate({
	    left: '-100px',
     	}, 200);
    });

    /***********
     * Ajax
     **********/
    var g_page_reload_ajax = new Ajaxion(
	'',
	{selector: 'body'},
	'GET',
	[],
	{
	    'success': [
		{
		    'disabled': true,
		    'callback': function(html, status, that) {
			var response = $('<html />').html(html);
			var to_change = ['#local_link', '#body-content',
					 '#app_js'];
			for (var i=0; i<to_change.length; i++) {
			    $(to_change[i]).hide().html(response
							.find(to_change[i])
							.html()).fadeIn();
			}
		    },
		},
		{
		    'disabled': true,
		    'callback': function(html, status, that) {
			var response = $('<html />').html(html);
			var to_change = ['#local_link', '#body-content-only',
					 '#app_js'];
			for (var i=0; i<to_change.length; i++) {
			    $(to_change[i]).hide().html(response
							.find(to_change[i])
							.html()).fadeIn();
			}
		    },
		},
		{
		    'callback': styleCode,
		}
	    ]
	}
    );

    $(window).bind('statechange', function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL

	if (State.data['type'] == 'new') {
	    $('#breadcrumb').html('<li><a href="' + State.data['href'] + '">' + State.data['content'] + '</a>');
	} else if (State.data['type'] == 'append') {
	    var last = $('#breadcrumb li').last();
	    var first = $('#breadcrumb li').first();

	    console.log(last.children('a'));
	    console.log(State.data['href']);

	    if (first == last || last.prev().children('a').attr('href') != State.data['href']) {
		last.append('<span class="divider">/<span/>');
		$('#breadcrumb').append('<li><a href="' + State.data['href'] + '">' + State.data['content'] + '</a>');
	    } else {
		last.prev().children('span').remove();
		last.remove();
	    }
	}

	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    });

    $(document).on('click', 'a[rel=ajax]', function(event){
	options = {'url': window.location.pathname};
	window.History.pushState({'type': 'new',
				  'content': $(this).html(),
				  'href': $(this).attr('href')},
				 $(this).attr('title'),
				 $(this).attr('href'));
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = false;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = true;
	return false;
    });

    $(document).on('click', 'a[rel=ajax-content]', function(event){
	options = {'url': window.location.pathname};
	window.History.pushState({'type': 'append',
				  'content': $(this).html(),
				  'href': $(this).attr('href')},
				 $(this).attr('title'),
				 $(this).attr('href'));
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = true;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = false;
	return false;
    });

    /***********
     * animateHighlight
     **********/
    $.fn.animateHighlight = function(highlightColor, duration) {
	var highlightBg = highlightColor || "#FFFF9C";
	var animateMs = duration || 1500;
	var originalBg = this.css("backgroundColor");
	this.stop().css("background-color", highlightBg).animate({backgroundColor: originalBg}, animateMs);
    };


    /***********
     * Global
     **********/
    $('.carousel').carousel()
    $('[rel=tooltip]').tooltip();
    $('.animated-thumbnails > li').hoverdir();

    styleCode();
    preview();
});
