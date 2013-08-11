$(function(){
    var all_questions = $('.question-form__question > .question__wrapper');
    
    all_questions.filter(':not(:first)').hide();
    $('.question-form__question').first().addClass('active');

    $('.question__number').click(function(){
        var $target = $(this).parent();

        if (!$target.hasClass('active')) {
            all_questions.slideUp().parent().removeClass('active');
            $target.addClass('active').children('.question__wrapper').slideDown();
        }
        return false;
    });
});