var getLocation = $.getJSON('http://vpros-dlastorta/morfar/api/Item?search=test&location=test', function (data) {

    var items = [];
    $.each(data, function (key, val) {
        items.push("<li id='" + key + "'>" + val + "</li>");
    });
    $("<ul/>", {
        "class": "my-new-list",
        html: items.join("")
    }).appendTo("body");
});
console.log(getLocation);

function myFunction() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getLocation, true);   // 
    alert("test");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var myArray = JSON.parse(xhr.responseText);

            console.log(myArray);

        };
    };
};
