function clearStorage(){ // clean data from localStorage
        $('input').removeAttr('value');
        localStorage.clear();
}

function toStorage(form){ // write data to localStorage
    if('undefined' != typeof(window['localStorage'])){
        var formValues = $(form).serializeArray();
        for(var i = 0; i < formValues.length; i++){
            localStorage.setItem([formValues[i].name],formValues[i].value);
        }
    alert('Ваши данные успешно сохраненны в браузере. Пожалуйста, не откладывайте отправку анкеты в дальний ящик!');
    }
}

$(function(){

    // == accordion start ==
    var $all_questions = $('.question-form__question');
    var $all_questions_wrap = $('.question-form__question > .question__wrapper');
    var $all_status_items = $('.status__item');
    
    var $accordion_func = function(){
        var $target = $(this).parent();

        if (!$target.hasClass('active')) {
            $all_questions_wrap.slideUp().parent().removeClass('active');
            $target.addClass('active').children('.question__wrapper').slideDown();
            check_empty(false);
        }
        return false;
    };

    if(typeof(window['localStorage']) !== 'undefined' && localStorage.length !== 0){ // complete form with data from localStorage
        Object.keys(localStorage).forEach(function (key){
            if(localStorage[key].length !== 0){
                $('#'+key).val(localStorage[key]);
            }
            check_empty(false);
        });
    }

    //initial 
    $all_questions_wrap.filter(':not(:first)').hide();
    $('.question-form__question').first().addClass('active');
    $('.question__number').bind('click', $accordion_func);

    $('.question-form__disable-accordion').click(function(){ // toggle option accordion
        if (!$(this).prop("checked")) {
            $('.question__number').unbind('click');
            $all_questions_wrap.slideDown();
            $('.question__answer').focus(function(){
                $all_questions.removeClass('active');
                $(this).parents('.question-form__question').addClass('active');
            });
        }else{
            $('.question__answer').unbind('focus');
            $('.question__number').bind('click', $accordion_func);
            $('.question-form__question:not(.active)').children('.question__wrapper').slideUp();
        }
    });

    $('.status__item').click(function(){ // function link to current question from footer status items
        if( $('.question-form__disable-accordion').prop("checked") ){
            var $question_number = $(this).attr('id') - 1;
            var $current_question = $all_questions.eq($question_number);
            if(!$current_question.hasClass('active')){
                $all_questions_wrap.slideUp().parent().removeClass('active');
                $current_question.addClass('active').children('.question__wrapper').slideDown();
            }
        }
    });

    // == accordion end==

    $("button:reset").attr('type','button'); // if enable js

    function check_empty(notification){
        var message = 'Нет ответа на данный вопрос, пожалуйста дайте ответ.';
        if(notification){
            $('.question__answer').each(function(index, element){
                if ($(element).val() === ''){
                    $all_questions.eq(index).find('.question__error-comment').html(message);
                    $all_questions.eq(index).find('.question__status').removeClass('question__status_error question__status_done').addClass('question__status_error');
                    $all_status_items.eq(index).removeClass('status__item_error status__item_done').addClass('status__item_error');
                }else{
                    $all_questions.eq(index).find('.question__error-comment').html('');
                    $all_questions.eq(index).find('.question__status').removeClass('question__status_error question__status_done').addClass('question__status_done');
                    $all_status_items.eq(index).removeClass('status__item_error status__item_done').addClass('status__item_done');
                }
            });
        }else{
            $('.question__answer').each(function(index, element){
                if ($(element).val() !== ''){
                    $all_questions.eq(index).find('.question__error-comment').html('');
                    $all_questions.eq(index).find('.question__status').removeClass('question__status_error question__status_done').addClass('question__status_done');
                    $all_status_items.eq(index).removeClass('status__item_error status__item_done').addClass('status__item_done');
                }
            });
        }
    }

    $('.footer__button_send').click(function(){
        check_empty(true);
    });

    $('.footer__button_reset').click(function(){ // reset form function
        var notice = confirm('Все введенные вами данные будут утеряны. Вы уверены, что хотите очистить анкету? ');
        if(notice) {
            $('.question__answer').val('');
            $all_status_items.removeClass('status__item_error status__item_done');
            $all_questions.find('.question__error-comment').html('');
            $all_questions.find('.question__status').removeClass('question__status_error question__status_done');
            clearStorage();
        }
    });

    $('.footer__button_save').click(function(){
        toStorage('.question-form');
    });

});