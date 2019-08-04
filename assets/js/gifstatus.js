
//create buttons for gifs
var movies = ["Lion King", "Little Mermaid", "Aladdin", "Mulan", "Pocahontas", "Beauty and The Beast"];

for (let i = 0; i < movies.length; i++) {
    const element = movies[i];
    

    console.log(element);

    $(".buttons-wrap").append("<button class='btn btn-primary' data-movie='"+ element +"' >" + element + "</button>");
    
}

//add movie with submit button is clicked
$(".entry .btn").on("click", function(){
    var inputVal = $(".entry input").val().trim();
    console.log(inputVal);

    $(".buttons-wrap").append("<button class='btn btn-primary' data-movie='"+ inputVal +"' >" + inputVal + "</button>");
    buttonClicks();
});

function buttonClicks(){
    $(".buttons-wrap button").on("click", function(){
        var movieName = $(this).data("movie");
        // console.log(movieName);
    
        //clear the image after each click 
        $("#gifs-appear-here").html("");
        
        //enter own API code from giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieName + "&api_key=1KLxurPLhGCBdZbnN02fYzTOcFwlED32&limit=10";
    
        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
    
            console.log(results);
    
            for (let i = 0; i < results.length; i++) {
                const element = results[i];
    
                // console.log(element);
    
                $("#gifs-appear-here").append("<div class='movie-wrap' ><img src='" + element.images.downsized_still.url + "' data-still='"+ element.images.downsized_still.url +"' data-animate='"+ element.images.downsized.url+"'  data-state='still' ><p>Rating: "+ element.rating +"</p></div>");
                
                
            }
    
            var pause = "";
            var animate = "";
            var state = "";
    
            $("img").on("click", function(){
                pause = $(this).attr("data-still");
                animate = $(this).attr("data-animate");
                state = $(this).attr("data-state");
    
                console.log( state);
                
                if(state == "animate"){
                    console.log('1');
                    //change the state to still
                    $(this).attr("data-state","still");
    
                    //change image source to still
                    $(this).attr("src", pause);
                }else{
                    console.log('2');
                    //change the state to animate
                    $(this).attr("data-state", "animate");
                    
                    //change image source to animate 
                    $(this).attr("src", animate);
                }
            })
            //create ratings for each gifs 
            
        });
    
    
    });
}


buttonClicks();

