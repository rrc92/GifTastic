 // Initial array of movies
 var movies = ["party", "college", "nightclub", "booze"];

 // Function for displaying movie data
 function renderButtons() {
     $("#buttons-view").empty();


     // YOUR CODE GOES HERE
     for (var i = 0; i < movies.length; i++) {
         createButton(movies[i]);
     }

 }

 function createButton(mName) {
     var b = $("<button>");
     b.attr("class", "bMovie")
     b.text(mName);
     $("#buttons-view").append(b);
 }

 $(document).on("click", ".bMovie", function () {
     var movieName = $(this).text();


     var u =
         "https://api.giphy.com/v1/gifs/search?q=" +
         movieName +
         "&api_key=XZO13xGmo30LErC3ChdRvhNU1YKtpHpC"

     $.ajax({
         url: u,
         method: "GET"
     }).then(function (response) {
         console.log(response);


         for (var i = 0; i < 10; i++) {
             var p = $("<p>");
             var img = $("<img>");

             p.text(response.data[i].rating);
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-still", response.data[i].images.fixed_height_still.url);
            img.attr("data-animate", response.data[i].images.fixed_height.url);
            img.attr("data-state", "still");
            img.addClass("picture");

             $("#movieInfo").append(img, p);




         }


     });

 });
            




 $(document).on("click", ".picture", function() {
var ds = $(this).attr("data-state");

if (ds == "still") {
$(this).attr("src", $(this).data("animate"));
$(this).attr("data-state", "animate");
} else {
$(this).attr("src", $(this).data("still"));
$(this).attr("data-state", "still");
}
});
         
 // This function handles events where one button is clicked
 $("#find-movie").on("click", function () {
     var v = $("#movie-input").val();



     if (v == "") {

         alert("Seach bar cannot be empty");
     } else {


         movies.push(v);
         createButton(v);



         $("#movie-input").val("");

     }

     event.preventDefault();

 });

 // Calling the renderButtons function to display the initial list of movies
 renderButtons();