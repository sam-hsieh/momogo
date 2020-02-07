$(function () {
    $('footer').load('footer.html')
    $('.nav,.nav.backgo').load('nav.html',menuOpen )
    function menuOpen () {
        $('.menu-hamburger').click(function (event) {
            $('.nav ul').toggleClass('open')
            $('.menu-hamburger').toggleClass('open')
        });
    }
})