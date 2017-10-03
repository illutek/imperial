/**
 * Created by stefan on 03.10.17.
 *
 */
(function ($) {
    $(document).ready(function () {
        function sticky_relocate() {
            var window_top = $(window).scrollTop();
            var div_top = $('#sticky-anchor').offset().top;
            if (window_top > div_top) {
                $('.sticky').addClass('stick');
            } else {
                $('.sticky').removeClass('stick');
            }
        }

        $(function () {
            $(window).scroll(sticky_relocate);
            sticky_relocate();
        });
    });
})(jQuery);