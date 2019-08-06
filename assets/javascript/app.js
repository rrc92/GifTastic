 // Initial array of GIF's
 var gifs = ["party", "college", "nightclub", "booze"];

 // Function for displaying gif data
 function renderButtons() {
     $("#buttons-view").empty();

    //  for loop for creating buttons
     for (var i = 0; i < gifs.length; i++) {
         createButton(gifs[i]);
     }

 }

 function createButton(gName) {
     var b = $("<button>");
     b.attr("class", "bgif")
     b.text(gName);
     $("#buttons-view").append(b);
 }

 $(document).on("click", ".bgif", function () {
     var gifyName = $(this).text();


     var u =
         "https://api.giphy.com/v1/gifs/search?q=" +
         gifyName +
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

             $("#gifinfo").append(img, p);




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
 $("#find-gify").on("click", function () {
     var v = $("#gify-input").val();



     if (v == "") {

         alert("Seach bar cannot be empty");
     } else {


         gifs.push(v);
         createButton(v);



         $("#gify-input").val("");

     }

     event.preventDefault();

 });

 // Calling the renderButtons function to display the initial list of gifs
 renderButtons();