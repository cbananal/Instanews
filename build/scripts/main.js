$(document).ready(function(){$(".section-options").change("option",function(){event.preventDefault(),$(".news-container").empty(),$("header").addClass("shrink"),$(".main-content").prepend('<img class="loader" src="build/images/ajax-loader.gif">');var e=$(".section-options").val();$.ajax({method:"GET",dataType:"json",url:"http://api.nytimes.com/svc/topstories/v1/"+e+".json?api-key=aec1669aa8a794669db617e0711c0397:19:75124068"}).done(function(e){$(".loader").remove();var a=e.results;0===a.length?$(".news-container").append('<p class="no-news">Sorry, nothing found! Please try again!</p>'):a=a.filter(function(e){return e.multimedia.length>0}).splice(0,12);for(var n=0;n<a.length;n++){var t=a[n].multimedia[4].url,r=a[n]["abstract"],o=a[n].url;$(".news-container").append('<li class="outer-square" style="background-image: url(\''+t+'\');"><a class="inner-square" href="'+o+'" target="_blank"><p>'+r+"</p></a></li>")}})})});