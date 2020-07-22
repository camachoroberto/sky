// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    $.get( "https://sky-frontend.herokuapp.com/movies", function( data ) {
        console.log('data', data);
        var html = '';
        var ol = '<ol class="carousel-indicators">';
        var isActive = true;
        var count = 0;
        var images = '<div class="carousel-inner">';
        for (const dataBanner of data[0].items) {
            var active = '';
            if(isActive) {
               isActive = false;
               active = 'active';
            }
            ol += '<li data-target="#carouselExampleIndicators" data-slide-to="'+count+'" class="'+active+'"></li>';
            count++;
            images += '<div class="carousel-item '+active+'">';
            images += '<img class="d-block w-100" src="'+dataBanner.images[0].url+'" alt="First slide">';
            images += '</div>';
        }
            ol += '</ol>';
            images += '</div>';

        images += '<a class="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">';
        images += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
        images += '<span class="sr-only">Previous</span>';
        images += '</a>';
        images += '<a class="carousel-control-next" href="#carouselHome" role="button" data-slide="next">';
        images += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
        images += '<span class="sr-only">Next</span>';
        images += '</a>';

        $('#carouselHome').html(ol + images);


        for (const dataMovie of data[2].movies) {
            var img = dataMovie.images;
            html += '<div class="element-item actinoid metal inner-transition '+dataMovie.programType+'" data-category="'+dataMovie.programType+'">';
            // html += '<h3 class="name">'+dataMovie.title+'</h3>';
            // html +=     '<img src="'+img[0].url+'" width="'+img[0].width+'" height="'+img[0].height+'">';
            html +=     '<div class="card">';
            html +=         '<img src="'+img[0].url+'" width="245" height="368">';
            html +=     '</div>';
            html += '</div>';
        }

        $('.grid').html(html);

        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function( itemElem ) {
                    var weight = $( itemElem ).find('.weight').text();
                    return parseFloat( weight.replace( /[\(\)]/g, '') );
                }
            }
        });

// filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt( number, 10 ) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match( /ium$/ );
            }
        };

// bind filter button click
        $('#filters').on( 'click', 'a', function() {
            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({ filter: filterValue });
        });

// bind sort button click
//         $('#sorts').on( 'click', 'button', function() {
//             var sortByValue = $(this).attr('data-sort-by');
//             $grid.isotope({ sortBy: sortByValue });
//         });

// change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });
    }, "json" );

});

