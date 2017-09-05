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
            

console.log(currentResult);
            $(".container.accordion").append('<div class="accordion-section"><a class="accordion-section-title" href="#accordion-'+i+'" style="border-right: solid #ff8800 '+(currentResult.scoreAvg*10)+'px">'+currentResult.itemName+"  |  "+currentResult.place.placeName+'<span>'+currentResult.scoreAvg+' puntos</span></a> <div id="accordion-'+i+'" class="accordion-section-content open"> <div class="row"> <div class="col-md-6"> <p class="place">'+currentResult.place.placeName+'</p> <p class="adress">Pellegrini: 1234</p> <p class="delivery">¿Tiene delivery?: '+haveDelivery+'</p> <p class="delivery">¿Tiene para llevar?: '+haveTakeAway+'</p> <p class="score">'+currentResult.scoreAvg+' puntos</p> </div> <div class="col-md-6"><img class="food-img" src="'+currentResult.itemUrlPhoto+'"></img> </div> </div> <div class="row"> <div class="col-md-6"> <div class="col-md-12">  <div>'+currentResult.place.googleMapsUrl+'</div> </div> </div> <div class="col-md-6"> <p class="score">Comentarios</p> <ul id="comments"></ul> </div> </div>');
            
            var commentsList = currentResult.itemReviews;
            // console.log(commentsList);
            var comments = [];
            for( k=0; k < commentsList.length; k++){
                var currentComment = commentsList[k].comment;
                //console.log('comentario nuemro '+k+currentComment);
                $("#comments").append('<li class="comment">'+currentComment+'</li>');
            };
        });
        accordion();
    });
}