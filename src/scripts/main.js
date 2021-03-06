
$(document).ready(function(){

  //Upon user's selection of news section
  $('.section-options').change('option', function(){

    event.preventDefault();

    //Removes news from previously selected sections
    $('.news-container').empty();

    //Resizes header
    $('header').addClass('shrink');

    //Shows loader image
    $('.main-content').prepend('<img class="loader" src="build/images/ajax-loader.gif">');

    //Stores the value of the selected news section
    var chosenSection = $('.section-options').val();

    //Accessing NYT's JSON
    $.ajax({
    method: 'GET',
    dataType: 'json',
    url: 'http://api.nytimes.com/svc/topstories/v1/' + chosenSection + '.json?api-key=aec1669aa8a794669db617e0711c0397:19:75124068'
    })

    //What to do upon API retrieval
    .done ( function(data) {

      //Remove loader image
      $('.loader').remove();

      //Gather data from NYT
      var nytData = data.results;

      //Filter data
      if (nytData.length === 0) {
        $('.news-container').append('<p class="no-news">Sorry, nothing found! Please try again!</p>');
      } else {
        nytData = nytData.filter(function (item){
        return item.multimedia.length > 0;
        }).splice (0,12);
      } // end if/else statement

      for (var i = 0; i < nytData.length; i++) {
          var featuredPhoto = nytData[i].multimedia[4].url;
          var newsAbstract = nytData[i].abstract;
          var linkToFull = nytData[i].url;

          $('.news-container').append('<a class="outer-square" style="background-image: url(\'' + featuredPhoto + '\');" href="' + linkToFull + '" target="_blank"><p class="inner-square">' + newsAbstract + '</p></a>');

      } //end loop

    }); // end done

  }); //end change event

}); //end document ready
