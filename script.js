$(document).ready(function() {
    var particles = [];
    var maxParticles = 20;

    function createParticle(e) {
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        var size = Math.random() * 5 + 1;
        var color = 'hsl(' + Math.random() * 360 + ', 80%, 50%)';

        var particle = $('<div class="particle"></div>');
        particle.css({
            left: x,
            top: y,
            width: size + 'px',
            height: size + 'px',
            backgroundColor: color
        });

        $('#particle-container').append(particle);
        particles.push(particle);

        if (particles.length > maxParticles) {
            particles.shift().remove();
        }
    }

    $('#particle-container').on('mousemove', function(e) {
        createParticle.call(this, e);
    });

    // Pizza trail effect with controlled frequency
    var lastPizzaTime = 0;
    var pizzaInterval = 500; // Interval in milliseconds

    $(document).on('mousemove', function(event) {
        var currentTime = new Date().getTime();
        if (currentTime - lastPizzaTime > pizzaInterval) {
            const trailContainer = $('#trail-container');
            const trail = $('<div class="trail">🍕</div>');
            trail.css({
                top: `${event.clientY}px`,
                left: `${event.clientX}px`
            });

            trailContainer.append(trail);

            setTimeout(() => {
                trail.remove();
            }, 1000); // 1 second to match the CSS animation duration

            lastPizzaTime = currentTime;
        }
    });

    // typing animation
    (function ($) {
        $.fn.writeText = function (content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function () {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };
    })(jQuery);

    // input text for typing animation
    $("#holder").writeText("TECH ENTHUSIAST + STUDENT (pizza is life)");

    // initialize wow.js
    new WOW().init();

    // Push the body and the nav over by 285px over
    var main = function () {
        $(".fa-bars").click(function () {
            $(".nav-screen").animate(
                {
                    right: "0px"
                },
                200
            );

            $("body").animate(
                {
                    right: "285px"
                },
                200
            );
        });

        // Then push them back
        $(".fa-times").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                200
            );

            $("body").animate(
                {
                    right: "0px"
                },
                200
            );
        });

        $(".nav-links a").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                500
            );

            $("body").animate(
                {
                    right: "0px"
                },
                500
            );
        });
    };

    $(document).ready(main);

    // initiate full page scroll
    $("#fullpage").fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ["home", "about", "portfolio", "contact", "connect"],
        anchors: ["home", "about", "portfolio", "contact", "connect"],
        menu: "#myMenu",
        fitToSection: false,

        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            if (index == 1) {
                $(".fa-chevron-down").each(function () {
                    $(this).css("opacity", "1");
                });
                $(".header-links a").each(function () {
                    $(this).css("color", "white");
                });
                $(".header-links").css("background-color", "transparent");
            } else if (index != 1) {
                $(".header-links a").each(function () {
                    $(this).css("color", "black");
                });
                $(".header-links").css("background-color", "white");
            }

            if (index == 2) {
                $(".skillbar").each(function () {
                    $(this)
                        .find(".skillbar-bar")
                        .animate(
                            {
                                width: $(this).attr("data-percent")
                            },
                            2500
                        );
                });
            }
        }
    });

    // move section down one
    $(document).on("click", "#moveDown", function () {
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on("click", "#skills", function () {
        $.fn.fullpage.moveTo(2);
    });

    $(document).on("click", "#projects", function () {
        $.fn.fullpage.moveTo(3);
    });

    $(document).on("click", "#contact", function () {
        $.fn.fullpage.moveTo(4);
    });

    // smooth scrolling
    $(function () {
        $("a[href*=#]:not([href=#])").click(function () {
            if (
                location.pathname.replace(/^\//, "") ==
                    this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html,body").animate(
                        {
                            scrollTop: target.offset().top
                        },
                        700
                    );
                    return false;
                }
            }
        });
    });
});
