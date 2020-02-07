let vm = new Vue({
    el: "#app",
    data: {
        fbContents: [],
        igPicture: [],
        sales: []
    },
    mounted() {
        axios.get('facebook.php').then((res) => {
            
            this.fbContents = res.data

        }).catch((err) => {
            console.log("error")

        }),
        axios.get('ig.php').then((res) => {
            
            this.igPicture = res.data

        }).catch((err) => {
            console.log("error")

        }),
        axios.get('sales.json').then((res) => {

            this.sales = res.data
        }).catch((err) => {
            console.log("error")

        })


    }
})

$(function () {
    $('a.page-scroll').bind('click', function (event) {

        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 0)
        }, 1250, 'easeInOutExpo');

        event.preventDefault();
    });

    AOS.init();
    $('.home .owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        //nav: true,
        autoplayTimeout: 10000,
        smartSpeed: 1500,
        //autoplayHoverPause: true,
        items: 1
    })
    $('.sales-list.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        //nav: true,
        dotsEach: true,
        autoplayTimeout: 10000,
        smartSpeed: 1500,
        //autoplayHoverPause: true,
        items: 4,
        responsive: {
            375: {
                items: 1,
                //nav: true,  
            },
            768: {
                items: 2,
                //nav: true,

            },
            1024: {
                items: 3,
                //nav: true,

            },
            1280: {
                item: 4,
                //nav: true,
            }
        }
    })

    $(window).scroll(function () {
        $('.menu-hamburger').removeClass('open')
        $('.nav ul').removeClass('open')
        if ($(".logo").offset().top < $('#about').offset().top) {
            $(".nav").removeClass("backgo");
        } else {
            $(".nav").addClass("backgo");
        }
    });
    $('.menu-hamburger').click(function (event) {
        $('.nav ul').toggleClass('open')
        $('.menu-hamburger').toggleClass('open')
    });
    
})