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
}