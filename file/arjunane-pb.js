;
(function ($) {
    
    var DEFAULT = {
        percent: 0,
        information: true,
        color: '',
        title: 'Arjunane Title Progress Bar',
        info: 'Arjunane Information Progress Bar',
        type: 'DEFAULT'
    };  

    $.fn.pb = function(obj) {
        var SET = {
                percent: obj.percent ? obj.percent : DEFAULT.percent,
                title: obj.title ? obj.title : DEFAULT.title,
                info: obj.info ? obj.info : DEFAULT.info,
                type: obj.type ? obj.type : DEFAULT.type,
                color: obj.color ? ' ' + (obj.color === 'DEFAULT' || obj.color === '' ? '' : obj.color) : DEFAULT.color,
                information: obj.information === false ? obj.information : DEFAULT.information,
            };
        
        if (SET.type === 'DEFAULT' || SET.type === 1 || SET.type === '1') {

            var _element_low = SET.percent > 50 ? '<div class="pb-bar-low"></div>' +
                '<div class="pb-bar-val-low"></div>' +
                '<div class="pb-bar-higher"></div><div class="pb-bar-val-higher"></div>' :
                '<div class="pb-bar-low"></div><div class="pb-bar-val-low"></div>' +
                '<div class="pb-bar-val-higher"></div>' +
                '<div class="pb-bar-higher"></div>',
                elem = $(this),
                information = "";
            
            if (SET.information === true) {
                information = '<div class="pb-title"><strong>' + SET.title + '</strong><span>' + SET.info + '</span></div>';
            }

            var element = '<div class="pb' + SET.color + '">' + '<div class="pb-container">' + '<div class="pb-bar"><div class="pb-elem">' +
                _element_low + '</div><div class="pb-bar-text">' + '<span>0%</span>' +
                '</div>' + '</div>' + information + '</div>' + '</div>',
                tot_low = SET.percent <= 50 ? Math.round(SET.percent * 3.6) : Math.round(50 * 3.6),
                tot_high = SET.percent > 50 ? Math.round((SET.percent - 50) * 3.6) + 180 : 0;
            elem.append(element);
            setTimeout(function () {
                elem.find('.pb-bar-val-low').css('transform', 'rotate(' + tot_low + 'deg)');
                elem.find('.pb-bar-val-higher').css('transform', 'rotate(' + tot_high + 'deg)');
                count(elem.find('.pb-bar-text span'), SET.percent, 0);
            }, 100);

        } else if (SET.type === '2' || SET.type === 2) {

            var information = "";

            if (SET.information) {
                information = '<div class="text-container">'
                + '<div class="text"><div class="title"><span>' + SET.title + '</span></div>'
                + '<div class="info"><span>' + SET.info + '</span></div>'
                + '</div></div>';
            }

            var element = '<div class="pb-2' + SET.color + '"><div class="pb-container">'
                + '<div class="pb-val-container"><div class="pb-val"></div></div>'
                + '<div class="pb-val-text"><span>0%</span></div><div class="pb-text">'
                + information
                + '</div></div></div>',
                elem = $(this);

            elem.append(element);
            setTimeout(function () {
                elem.find('.pb-val').css('width', '' + SET.percent + '%');
                count(elem.find('.pb-val-text span'), SET.percent, 0);
            }, 100);
        }
    }

    $.fn.pb_update = function(obj) {
        var find_elem_1 = $(this).find('.pb'),
            title_1 = find_elem_1.find('.pb-title strong'),
            info_1 = find_elem_1.find('.pb-title span'),
            percent_1 = find_elem_1.find('.pb-bar-text span'),
            find_elem_2 = $(this).find('.pb-2'),
            title_2 = find_elem_2.find('.pb-text .title span'),
            info_2 = find_elem_2.find('.pb-title .info span'),
            percent_2 = find_elem_2.find('.pb-val-text span');
        if (find_elem_1.length === 0 && find_elem_2.length === 0) return false;

        var title = title_1.length === 0 ? title_2.text() : title_1.text(),
            info = info_1.length === 0 ? info_2.text() : info_1.text(),
            percent = percent_1.length === 0 ? percent_2.text().split('%')[0] : percent_1.text().split('%')[0];

        var SET = {
            percent: obj.percent ? obj.percent : percent,
            title: obj.title ? obj.title : title,
            info: obj.info ? obj.info : info,
            type: obj.type ? obj.type : DEFAULT.type,
            color: obj.color ? ' ' + (obj.color === 'DEFAULT' || obj.color === '' ? '' : obj.color) : DEFAULT.color,
            information: obj.information === false ? obj.information : DEFAULT.information,
        };

        if (SET.type === 'DEFAULT' || SET.type === 1 || SET.type === '1') { 
            var _element_low = SET.percent > 50 ? '<div class="pb-bar-low"></div>' +
                '<div class="pb-bar-val-low"></div>' +
                '<div class="pb-bar-higher"></div><div class="pb-bar-val-higher"></div>' :
                '<div class="pb-bar-low"></div><div class="pb-bar-val-low"></div>' +
                '<div class="pb-bar-val-higher"></div>' +
                '<div class="pb-bar-higher"></div>',
                information = "",
                elem = $(this),
                cls = find_elem_1.attr('class').split(' ')[0] + SET.color;
            if (SET.information === true) {

                var pb_title = elem.find('.pb-title strong, .pb-title span').length === 0;

                information = pb_title === false ? '<strong>' + SET.title + '</strong><span>' + SET.info + '</span>' : '<div class="pb-title"><strong>' + SET.title + '</strong><span>' + SET.info + '</span></div>';

                pb_title === false ? elem.find('.pb-title').html(information) : elem.find('.pb-container').append(information);
                
            } else { 
                elem.find('.pb-title').remove();
            }

            var tot_low = SET.percent <= 50 ? Math.round(SET.percent * 3.6) : Math.round(50 * 3.6),
                tot_high = SET.percent > 50 ? Math.round((SET.percent - 50) * 3.6) + 180 : 0;

            
            elem.find('.pb-elem').html(_element_low);
            setTimeout(function() {
                find_elem_1.attr('class', cls);
                elem.find('.pb-bar-val-low').css('transform', 'rotate(' + tot_low + 'deg)');
                elem.find('.pb-bar-val-higher').css('transform', 'rotate(' + tot_high + 'deg)');
                title_1.html(SET.title);
                info_1.html(SET.info);
                count(percent_1, SET.percent, percent);
            }, 10);
        } else if (SET.type === '2' || SET.type === 2) {

            var information = "",
                elem = $(this),
                cls = find_elem_2.attr('class').split(' ')[0] + SET.color,
                elem_text = elem.find('.pb-text');
            
            if (SET.information) {
                information = '<div class="text-container">'
                + '<div class="text"><div class="title"><span>' + SET.title + '</span></div>'
                + '<div class="info"><span>' + SET.info + '</span></div></div>'
                + '</div>' ;
            } else { 
                elem.find('.pb-text .text-container').remove();
            }

            var element = '<div class="pb-2"><div class="pb-container">'
                + '<div class="pb-val-container"><div class="pb-val"></div></div>'
                + '<div class="pb-val-text"><span>0%</span></div>'
                + information
                + '</div></div>';
            
            if (elem.find('.pb-text .text-container').length === 0 && SET.information === true) {
                elem_text.html(information);
            } else { 
                elem_text.html("");
            }

            setTimeout(function () {
                find_elem_2.attr('class', cls);
                elem.find('.pb-val').css('width', SET.percent + '%');
                count(elem.find('.pb-val-text span'), SET.percent, percent);
            }, 100);
        }

    }

    function count(elem, numbers, start) {
        var setDuration = setInterval(function () {
            if (numbers > start) {
                elem.html((start++) + '%');
                if (numbers === (start - 1)) clearInterval(setDuration);
            } else { 
                elem.html((start--) + '%');
                if (start === (numbers - 1)) clearInterval(setDuration);
            }
        }, 10); 
        
    }

})(jQuery);