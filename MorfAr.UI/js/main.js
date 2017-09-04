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
        $.each(data, function (i) {
            var currentResult = results.responseJSON[i];
            console.log(currentResult);
            $(".container.accordion").append('<div class="accordion-section"><a class="accordion-section-title" href="#accordion-'+i+'">'+currentResult.itemName+'</a><div id="accordion-'+i+'" class="accordion-section-content"><div class="row"> <div class="col-md-6">    <p class="place">'+currentResult.place.placeName+'</p><p class="adress">Pellegrini: 1234</p><p class="delivery">¿Tiene delivery?: Si</p><p class="delivery">¿Tiene para llevar?: Si</p><p class="score">8 puntos</p><img class="food-img" src="'+currentResult.itemUrlPhoto+'"></img></div><div class="col-md-6"><p class="score">Comentarios</p>  <p class="comments">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales mollis quam ac tincidunt. Vivamus tincidunt posuere tellus, sed laoreet orci auctor e"</p></div></div>');
        
        });
    });

    



    
}