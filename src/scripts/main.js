
$(document).ready(function(){

  //Upon user's selection of news section
  $('.section-options').change('option', function(){

    event.preventDefault();
    $('.news-container').empty();
    $('.main-content').prepend('<img class="loader" src="src/images/ajax-loader.gif">');

    //Stores the value of the selected news section
    var chosenSection = $('.section-options').val();
    console.log(chosenSection);

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

      var nytData = data.results;
      // console.log(nytData);
      // var featured = 0;

      nytData = nytData.filter(function (item){
        return item.multimedia.length > 0;
        }).splice (0,12);

      for (var i = 0; i < nytData.length; i++) {
          var featuredPhoto = nytData[i].multimedia[4].url;
          var newsAbstract = nytData[i].abstract;
          var linkToFull = nytData[i].url;

          $('.news-container').append('<li class="outer-square" style="background-image: url(\'' + featuredPhoto + '\');"><a class="inner-square" href="' + linkToFull + '" target="_blank"><p>' + newsAbstract + '</p></a></li>');

          console.log(featuredPhoto);
          // console.log(newsAbstract);
          console.log(linkToFull);
      } //end for loop

    }); // end for done




  }); //end for event change

}); //end for documentready
