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
        }
        return false;
    }

    $all_questions_wrap.filter(':not(:first)').hide();
    $('.question-form__question').first().addClass('active');
    $('.question__number').bind('click', $accordion_func);

    $('.question-form__disable-accordion').click(function(){
        if (!$(this).prop("checked")) {
            $('.question__number').unbind('click');
            $all_questions_wrap.slideDown();
        }else{
            $('.question__number').bind('click', $accordion_func);
            $('.question-form__question:not(.active)').children('.question__wrapper').slideUp();
        }
    });

    $('.status__item').click(function(){
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

    function check_empty(){
    var message = 'Нет ответа на данный вопрос, пожалуйста дайте ответ.';
        $('.question__answer').each(function(index, element){
            if ($(element).val() == ''){
                $all_questions.eq(index).find('.question__error-comment').html(message);
                $all_questions.eq(index).find('.question__status').removeClass('question__status_error question__status_done').addClass('question__status_error');
                $all_status_items.eq(index).removeClass('status__item_error status__item_done').addClass('status__item_error');
            }else{
                $all_questions.eq(index).find('.question__error-comment').html('');
                $all_questions.eq(index).find('.question__status').removeClass('question__status_error question__status_done').addClass('question__status_done');
                $all_status_items.eq(index).removeClass('status__item_error status__item_done').addClass('status__item_done');
            }
        });
    }

    $('.question-form__button_send').click(function(){
        check_empty();
    });

    $('.question-form__button_reset').click(function(){ // reset form function
        var notice = confirm('Все введенные вами данные будут утеряны. Вы уверены, что хотите очистить анкету? ');
        if(notice) {
            $('.question__answer').val('');
            $all_status_items.removeClass('status__item_error status__item_done');
            $all_questions.find('.question__error-comment').html('');
            $all_questions.find('.question__status').removeClass('question__status_error question__status_done');
        }
    });

});