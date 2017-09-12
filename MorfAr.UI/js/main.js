(function () {
     var option = 'all';
     var url = "http://vpros-dlastorta/MorfAr/api/ItemTag?type=all";
     var foodList = $.getJSON(url, function (data) {
        var items = [];
        $.each(data, function (i) {
            var currentFood = foodList.responseJSON[i].tagName;
            $("#foodList").append("<option value='" + currentFood + "' />");
        });
    });
     $('.checkbox').on('change', function() {
        option= ($('input[type=radio]:checked').val()); 
        url = "http://vpros-dlastorta/MorfAr/api/ItemTag?type="+option;
        var foodList = $.getJSON(url, function (data) {
            $("#foodList").empty();
            $('#foodFilter').val('');
            var items = [];
            $.each(data, function (i) {
                var currentFood = foodList.responseJSON[i].tagName;
                $("#foodList").append("<option value='" + currentFood + "' />");
            });
        });
     });

})();

(function () {
    var citiesList = $.getJSON('http://vpros-dlastorta/MorfAr/api/Location', function (data) {
        var items = [];
        $.each(data, function (i) {
            var currentCity = citiesList.responseJSON[i];
            $("#citiesList").append("<option locationId='" + currentCity.locationId + "' value='"+currentCity.locationName+"'>" + currentCity.locationName + "</option>");
        });
    });
})();

function doSearch(){
    var searchItem = $('#foodFilter').val();
    var searchLocation = $('#citiesList > option').attr( "locationId" );
    var searchUrl = "http://vpros-dlastorta/MorfAr/api/Item?search="+searchItem+"&locationId="+searchLocation;
    console.log(searchUrl);
    var results = $.getJSON(searchUrl, function (data) {
        var items = [];
        $(".container.accordion").empty();
        $.each(data, function (i) {
            var currentResult = results.responseJSON[i];
            var delivery = currentResult.place.placeIsDelivery;
            var takeAway = currentResult.place.placeIsTakeAway;
            var haveDelivery;
            var haveTakeAway;

        if (currentResult.scoreAvg > 7) {
            var scoreColor ="00FF48";

        } else if (currentResult.scoreAvg > 4){
            var scoreColor ="ff8800";

        } else {
            var scoreColor ="B20000";

        }

                  
            if( delivery ){
                haveDelivery = "Si";
            }else{
                haveDelivery = "No";
            }
            console.log('delivery es '+delivery+' y haveDelivery es '+ haveDelivery );
            
            if( takeAway ){
                haveTakeAway = "Si";
            }else{
                haveTakeAway = "No";
            }

var accordionTab =' <a class="accordion-section-title" href="#accordion-'+i+'" style="border-right: solid #'+scoreColor+' '+(currentResult.scoreAvg*10)+'px">'+currentResult.itemName+"  |  "+currentResult.place.placeName+'<span>'+currentResult.scoreAvg+' puntos</span></a>';
var leftCol ='<div class="col-md-6"> <p class="place">'+currentResult.place.placeName+'</p> <p class="delivery">¿Tiene delivery?: '+haveDelivery+'</p> <p class="delivery">¿Tiene para llevar?: '+haveTakeAway+'</p> <img class="food-img" src="'+currentResult.itemUrlPhoto+'"></img></div>';
var rightCol ='<div class="col-md-6"> <p class="score">Comentarios</p> <ul id="comments"></ul> </div>';
var googleMap ='<div class="resultMap">'+currentResult.place.googleMapsUrl+'</div>';
console.log (currentResult.place.googleMapsUrl);
            $(".container.accordion").append('<div class="accordion-section">' + accordionTab + ' <div id="accordion-'+i+'" class="accordion-section-content open"> <div class="row">' + leftCol + rightCol + '  </div> <div class="row"> <div class="col-md-6"> <div class="col-md-12">  ' + googleMap + ' </div> </div> </div>');
            
            var commentsList = currentResult.itemReviews;
            var comments = [];
            for( k=0; k < commentsList.length; k++){
                var currentComment = commentsList[k].comment;
                $("#comments").append('<li class="comment">'+currentComment+'</li>');
            };
        });
        accordion();
    });
}