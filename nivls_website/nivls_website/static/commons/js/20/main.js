var resolve_urls = django_js_utils.urls.resolve;

function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'),with_this);
}


function reloadJsEffects() {
    styleCode();
    checkForLocalStorage();
    enableBootstrapEffects();
    reloadShareButtons();
    startLabDiagram();

    $('#left-menu > li').off('hover').hover(
        function () {
            if (!($(this).hasClass('animate'))) {
                var that = this;
                var height = $(this).find('.content').innerHeight();

                if (height
                    && $(this).nextAll().length > 0
                    && height > $(this).innerHeight()) {

                    var diff = height - $(this).innerHeight();

                    $(this).next().animate({'marginTop': diff}, 50, 'linear',
                                           function(){
                                               $(that).toggleClass('animate');
                                           });
                } else {
                    $(this).toggleClass('animate');
                }
            }
        },
        function () {
            if ($(this).hasClass('animate')) {
                $(this).toggleClass('animate');

                var height = $(this).find('.content').innerHeight();
                if (height && height > $(this).innerHeight()) {
                    var diff = height - $(this).innerHeight();
                    $(this).next().animate({'marginTop': 0}, 100, 'linear');
                }
            }
        }
    );
}

function dropFile() {
    if (Modernizr.draganddrop) {
        $(document).on({
            dragenter: function(){
                $(this).addClass('dragging');
                return false;
            },

            dragleave: function(){
                $(this).removeClass('dragging');
                return false;
            },

            drop: function(e){
                var $that = $(this);

                $(this).removeClass('dragging');
                e.preventDefault();
                e = e.originalEvent || e;

                if (e.dataTransfer.files.length == 1) {
                    var data = new FormData($(this).find('form')[0]);
                    data.append('picture', e.dataTransfer.files[0]);

                    Ajaxion_formUpload(
                        resolve_urls('handle_dropped_picture'),
                        data,
                        null,
                        function (html){
                            if (html == '200') {
                                $that.removeClass('invalid-drop');
                                $that.addClass('valid-drop');
                                window.location = resolve_urls('edit-avatar');
                            } else {
                                $that.find('form').replaceWith(html);
                                $('#profile-picture-form [name="csrfmiddlewaretoken"]').val($that.find('form [name="csrfmiddlewaretoken"]').val());
                                $that.removeClass('valid-drop');
                                $that.addClass('invalid-drop');
                            }
                        }
                    );
                }
                return false;
            }
        }, '.drop-area');
    }
}

function checkForLocalStorage() {
    $.jStorage.reInit();
    $('[data-storage]').each(function (){
        var key = $(this).data('storage');
        $(this).val($.jStorage.get(key, ''));
    });
}

function reloadShareButtons() {
    if (typeof gapi !== 'undefined') {
        gapi.plusone.go();
    }
}

function preview() {
    var markdownConverter = new Markdown.getSanitizingConverter();

    $(document).off('input keydown', '[data-parse]')
        .on('input keydown', '[data-parse]', function() {
            var target = $(this).data('parse');
            $(target).html(markdownConverter.makeHtml($(this).val()));
            $(target).find('code').parent().each(function(){
                $(this).html(prettyPrintOne($(this).html()));
            });
        });
}

function storageData() {
    $(document).off('click', '[data-storage-reset]')
        .on('click', '[data-storage-reset]', function() {
            var key = $(this).data('storage-reset');
            $.jStorage.deleteKey(key);
        });

    $(document).off('input keydown', '[data-storage]')
        .on('input keydown', '[data-storage]', function() {
            var key = $(this).data('storage');
            $.jStorage.set(key, $(this).val(), {TTL: 604800000});
        });
}

function enableBootstrapEffects() {
    $('.carousel').carousel();
    $('[rel=tooltip]').tooltip();
    $('.form-search .search-query').typeahead({
        updated : function () {
            this.$element.trigger('submit');
        }
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
    if (Modernizr.history) {
        navigationHTML5();
    }

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
    reloadJsEffects();
    storageData();
    preview();
    dropFile();

    $(window).konami(function() {
        $('body').toggleClass('konami');
    });
});

$(document).on('click', '.scroll', function(e) {
    e.preventDefault();
    console.log('in');
    $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top
    }, 500);
});

function navigationHTML5(){

    /***********
     * Nav bar
     **********/
    function moveNavbar(target) {
        var $current_active = $('#navbar-main-list > li.active');

        if (target !== null && $(target)[0] == $current_active[0])
            return ;

        if (target !== null) {
            if ($current_active.hasClass('dropdown')) {
                $('#navbar-main-list .dropdown li.active').removeClass('active');

                if ($(target).parents('.dropdown').length === 0) {
                    $current_active.removeClass('active');
                }
            } else {
                $current_active.removeClass('active');
            }
            $(target).addClass('active');
        } else {
            $current_active.removeClass('active');
            $('#navbar-main-list .dropdown li.active').removeClass('active');
        }
    }

    $('#navbar-main-list > li a').click(function(e) {
        if (e.which != 2 && !e.shiftKey && !e.ctrlKey) {
            moveNavbar($(this).parent('li'));
        }
    });

    $(document).on('click', 'a[data-navbar]', function(e) {
        if (e.which != 2 && !e.shiftKey && !e.ctrlKey) {
            moveNavbar($(this).data('navbar'));
        }
    });


    /***********
     * Lab menu
     **********/
    function lab_change_menu(id) {
        var active = $('#lab-nav-list').find('.active');
        active.removeClass('active').addClass('hide');
        active.next().removeClass('hide');

        var current = $('#' + id).find('.hide');
        current.removeClass('hide').addClass('active');
        current.next().addClass('hide');
    }

    $(document).on('click', '#lab-nav-list a', function() {
        lab_change_menu($(this).prop('id'));
    });


    /***********
     * Ajax
     **********/
    $(window).bind('statechange', function() {
        var navbar_id = $('#navbar-main-list > li.active').prop('id');
        var lab_tag_id = $('#lab-nav-list .active').parents('a').prop('id');
        var State = window.History.getState();
        var relativeURL = State.url.replace(window.History.getRootUrl(), '');
        relativeURL = '/' + relativeURL;

        var action = State.data['action'];
        if (action === undefined || $(action).length <= 0) {
            window.location = relativeURL;
        }

        if (navbar_id !== State.data['navbar_id']) {
            var navbar_target;
            if (State.data['navbar_id'] !== undefined) {
                navbar_target = $('#' + State.data['navbar_id']);
            } else {
                navbar_target = null;
            }
            moveNavbar(navbar_target);
        }

        if (lab_tag_id !== State.data['lab_tag_id']
            && State.data['lab_tag_id'] !== undefined) {
            lab_change_menu(State.data['lab_tag_id']);
        }

        if (State.data['breadcrumb'] !== undefined
            && State.data['breadcrumb'] !== null
            && State.data['breadcrumb'].length) {
            $('#breadcrumb').html(State.data['breadcrumb']).show();
        } else {
            $('#breadcrumb').fadeOut(function(){
                $(this).empty();
            });
        }

        $('#loading-msg').fadeIn();
        $.get(relativeURL, function(html){
            var i;
            var response = $('<html />').html(html);
            var to_change = [];

            // Replace without fade
            to_change = ['#page-title', '#page-subtitle'];
            for (i=0; i<to_change.length; i++) {
                $(to_change[i]).html(response.find(to_change[i])
                                             .html());
            }
            // Replace with fades
            to_change = ['#local_link', action];
            for (i=0; i<to_change.length; i++) {
                $(to_change[i]).hide().html(response
                                            .find(to_change[i])
                                            .html()).fadeIn();
            }
            reloadJsEffects();
            $('#loading-msg').fadeOut();
        });
    });

    function getNewBreadcrumb(that) {
        var breadcrumb = $('#breadcrumb').clone();

        if ($(that).data('depth') === undefined){
            return breadcrumb;
        }

        breadcrumb.children('li').each(function() {
            var prev = $(this).prev();
            var children = $(this).children('a');
            if (children.data('depth') !== undefined) {
                if (children.data('depth') >= $(that).data('depth')) {
                    $(this).nextAll().remove();
                    $(this).remove();
                    if (prev.length) {
                        prev.children('span').remove();
                    }

                }
            }
        });

        if (breadcrumb.children('li').last().length) {
            breadcrumb.children('li').last()
                .append('<span class="divider">/<span/>');
        }

        var new_elem = '<li><a';
        new_elem += ' data-depth="' + $(that).data('depth') + '"';
        new_elem += ' data-ajax="' + $(that).data('ajax') + '"';
        if ($(that).attr('title') !== undefined) {
            new_elem += ' title="' + $(that).attr('title') + '"';
        }

        new_elem += 'href="' + $(that).attr('href') + '">';
        if ($(that).attr('title') !== undefined) {
            new_elem += $(that).attr('title');
        } else {
            new_elem += $(that).html();
        }
        new_elem += '</a>';
        breadcrumb.append(new_elem);
        return breadcrumb;
    }

    function changePage(url, title, that){
        var action = '#' + $(that).data('ajax');
        var breadcrumb = getNewBreadcrumb(that);
        var navbar_id = $('#navbar-main-list > li.active').prop('id');
        var lab_tag_id = $('#lab-nav-list .active').parents('a').prop('id');
        var page_subtitle = $(that).data('subtitle');

        if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackPageview', url]);
        }

        options = {'url': window.location.pathname};
        window.History.pushState({'breadcrumb': breadcrumb.html(),
                                  'action': action,
                                  'navbar_id': navbar_id,
                                  'lab_tag_id': lab_tag_id},
                                  title,
                                  url);
    }

    $(document).on('click', 'a[data-ajax]', function(event){
        if (!event.shiftKey && !event.ctrlKey) {
            changePage($(this).attr('href'), $(this).attr('title'), this);
            return false;
        }
    });

    /***************
     * Search Form
     **************/

    $(document).on('submit', '.form-search', function(){
        var search_query = $(this).find('.search-query');
        var query;
        var url;

        if (search_query.val().length > 0) {
            query = replaceAll(
                encodeURIComponent(search_query.val()), '%20', '+');
            url = resolve_urls('update-typeahead');
            url += '?search=' + query;
            $.get(url);
        }
        query = $(this).serialize();
        url = $(this).attr('action') + '?' + query;
        changePage(url, $(this).attr('title'), this);
        moveNavbar(null);
        return false;
    });

    $(document).on('input', '.form-search .search-query', function(e) {
        if ($.inArray(e.keyCode,[40,38,9,13,27]) === -1
            && $(this).val().length > 0){
            var that = this;
            var query = replaceAll(
                encodeURIComponent(
                    $(this).val()
                ), '%20', '+');

            var url = resolve_urls('autocomplete');
            url += '?search=' + query;

            $.getJSON(url, function(data){
                var items = [];

                if (data) {
                    $.each(data, function(i, val){
                        items.push(val);
                    });
                }
                $(that).data('typeahead').source = items;
            });
        }
    });
}
