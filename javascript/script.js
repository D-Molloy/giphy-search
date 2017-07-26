
var politicians = ["Donald Trump", "Hillary Clinton", "Bernie Sanders", "Barack Obama", "Joe Biden", "John Boehner", "Bill Clinton", "George W Bush", "Chris Christie"];
// still image - response.data[0].images.fixed_height_still.url
// // GIF - response.data[0].images.fixed_height.url

var currentResponse;
var gifClick=false;

function displayGifs() {
    $('.gif-display').empty();   
	var userSubmit = $(this).attr("data-name");
	console.log(userSubmit);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSubmit + "&limit=11&api_key=6181b0ebaf0342f1b3f5f8e23474b3fe"

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
	
	//append the results to gif-diplay
	// $('.gif-display').empty();
		currentResponse = response;
		console.log(currentResponse);
		
		for (var i = 0; i <= 10; i++) {
			var gifImg = $('<img>');
			gifImg.addClass('gif-img');
			gifImg.attr('src', response.data[i].images.fixed_height_still.url);
			$('.gif-display').append(gifImg);
			console.log(gifImg);
			// gifImg.text(response.data[0].images.fixed_height_still.url);
		}
		// function switchUrl(){
		// var clickedGif = $(this).attr("src", response.data[i].images.fixed_height.url);
		// }
		return currentResponse;
	});
}

function switchUrl(){

	var gifIndex = $(this).index();

	if (gifClick == false){
		$(this).attr("src", currentResponse.data[gifIndex].images.fixed_height.url);
		gifClick = true;
	} else {
		$(this).attr("src", currentResponse.data[gifIndex].images.fixed_height_still.url);
		gifClick = false;
	}
	console.log(gifIndex);
	// var clickedGif = $(this).attr("src", currentResponse.data[gifIndex].images.fixed_height.url);
}

function renderButtons(){
	$('.btn-display').empty();

	for (var i = 0; i < politicians.length; i++) {
		var polBtn = $('<button>');
		polBtn.addClass('politician');
		polBtn.attr('data-name', politicians[i]);
		polBtn.text(politicians[i]);
		$('.btn-display').append(polBtn);
		console.log(polBtn);
	}

	$('.submit-btn').on('click', function(event){
		// event.preventDefault();

		var userPick = $('.entry-form').val().trim();
		console.log(userPick);
		politicians.push(userPick);
		console.log(politicians);
		$('.entry-form').empty();
		// $('submit-btn').off();
		renderButtons();
	});

}

$(document).on("click", ".politician", displayGifs);
$(document).on("click", ".gif-img", switchUrl);

renderButtons();


