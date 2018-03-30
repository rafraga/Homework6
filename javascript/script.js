$("#submit").on("click", function () {
    var button_name = ($("#search_box").val()).toLowerCase();
    if (button_name != "") {
        var resultNum = parseInt($("#sel1").val());
        var button = $('<button/>', {
            text: button_name,
            id: 'btn_'+button_name,
            click: function () { 
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC" + "&q=" + button_name;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                // console.log(response);
                for (var i = 0; i < resultNum; i++) {
                    var gifImage = $("<img>");
                    gifImage.attr("src", response.data[i].images.original.url);
                    gifImage.attr("alt", response.data[i].images.original_still.url);
                    var ratingImage = $("<div>" + "<h6>Rating: " + response.data[i].rating + "</h6></div><br>");
                    $("#display_results").prepend(ratingImage);
                    $("#display_results").prepend(gifImage);
                };
                $('img').on('click', function() {
                    var alt = $(this).attr('alt');
                    var src = $(this).attr('src');
                    $(this).attr('src', alt);
                    $(this).attr('alt', src);
                });
            });
            }
        });
        $("#display_buttons").prepend(button);
    };
});

$("#clear_results").on("click", function () {
    $("#search_box").val('');
    $("#display_results").empty();
    $("#display_buttons").empty();
});