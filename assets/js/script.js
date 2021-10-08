//variable for movie data
var movieData;
//variable for tv data
var tvData;
//variable that stores tvData.tv_results
var tvArray;
//variable that stores movieData.movie_results
var movieArray;
//array that stores Movie Objects
var movieObjects = [];
//array to store TV Shows
var tvObjects = [];

// Carousel for media results sections
bulmaCarousel.attach('#carousel', {
	slidesToScroll: 1,
	slidesToShow: 4,
	navigation: true,
	loop: true,
});

//type={get-popular-movies, get-popular-shows}
function getPopular(type, year) {
	fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=" + type + "&page=1&year=" + year, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
			"x-rapidapi-key": "1acff560dfmshb97c3c2facb502cp19f4b7jsn8e70140c970f"
		}
	})
		.then(response => {
			console.log(response);
			return response.json();
		})

		.then(data => {
			console.log(data);
			if (type === "get-popular-movies") {
				//stores data to variable
				movieData = data;
				//puts array of media into global array
				movieArray = movieData.movie_results;
				console.log(movieArray);
			} else if (type === "get-popular-shows") {
				//store data to variable
				tvData = data;
				//put array of tv results into global array
				tvArray = tvData.tv_results;
			}
			organizeInfo(type);
		});
}

//gets information from OMDb and creates an array of media objects
function organizeInfo(type) {
	for (var i = 0; i < 10; i++) {
		console.log(type);
		if (type === "get-popular-movies") {
			//passes the IMDb ID to the function
			getMediaInfo(movieArray[i].imdb_id);
		} else if (type === "get-popular-shows") {
			//passes the IMDb ID to the function
			getMediaInfo(tvArray[i].imdb_id);
		}
	}
}

function getMediaInfo(imdbID) {
	fetch("https://www.omdbapi.com/?apikey=726baba7&i=" + imdbID)
		.then(response => {
			console.log(response);
			return response.json();
		})
		.then(data => {
			//condition if media type is a movie
			if (data.Type === "movie") {
				//console.log(data);
				movieObjects.push(data);
				//console.log(movieObjects);
			}
			//condition if media type is a series
			else if (data.Type === "series") {
				tvObjects.push(data);
			}
		})
}

function storeToLocalStorage(obj) {
	//get local storage objects
	var localStorageArray = JSON.parse(localStorage.getItem("myMediaList"));
	//condition to check if localStorageArray is empty
	if (localStorageArray === null) {
		//place object in array
		localStorageArray = [obj];
	}
	//when localStorageArray is not empty
	else {
		//boolean to determine repeat titles
		var isRepeat = false;
		//check for repeat titles
		for (var i = 0; i < localStorageArray.length; i++) {
			if (localStorageArray[i].title == obj.title) {
				isRepeat = true;
			}
		}
		//when there are repeat titles
		if (isRepeat) {
			//modal to tell user that the item has been saved already
			swal("Oh No!", "Looks like this item is already on your list.", "info")
		}
		//when there are no repeat titles
		else {
			//push obj to the end of the array
			localStorageArray.push(obj);
		}
	}
	console.log(localStorageArray);
	//update local storage with updated array
	localStorage.setItem("myMediaList", JSON.stringify(localStorageArray));
}

//storeToLocalStorage({title:"wee", released: "2021"});

//fill card elements by type {movie-card- , tv-card- }
function fillCards(mediaArray, type) {

	emptyCards(mediaArray, type);
	//for loop that iterates through the mediaArray
	for (var i = 0; i < mediaArray.length; i++) {
		//get element by card id
		var element = document.getElementById(type + i);
		//add media poster to element at index i
		element.children[0].children[0].children[0].setAttribute('src', mediaArray[i].Poster);
		//add alt description to image
		element.children[0].children[0].children[0].setAttribute('alt', "Poster of " + mediaArray[i].Title)
		//add title to element at index i
		element.children[1].children[0].children[0].textContent = mediaArray[i].Title;
		//add release date to element at index i
		element.children[1].children[0].children[1].textContent = mediaArray[i].Released;
		//add short plot to element at index i
		element.children[1].children[1].textContent = mediaArray[i].Plot;
		//add link to scroll page to my list
		element.children[2].children[0].setAttribute('href', '#my-list');
		//add IMDb link to element
		element.children[2].children[1].setAttribute('href', 'https://www.imdb.com/title/' + mediaArray[i].imdbID + '/');
		//make link open in new tab
		element.children[2].children[1].setAttribute('target', '_blank');
	}

}

//clears cards to be filled again
function emptyCards(mediaArray, type) {
	//for loop that iterates through the mediaArray
	for (var i = 0; i < mediaArray.length; i++) {
		//get element by card id
		var element = document.getElementById(type + i);
		//add media poster to element at index i
		element.children[0].children[0].children[0].removeAttribute('src');
		//add alt description to image
		element.children[0].children[0].children[0].removeAttribute('alt', "");
		//add title to element at index i
		element.children[1].children[0].children[0].textContent = "";
		//add release date to element at index i
		element.children[1].children[0].children[1].textContent = "";
		//add short plot to element at index i
		element.children[1].children[1].textContent = "";
		//add link to scroll page to my list
		element.children[2].children[0].removeAttribute('');
		//add IMDb link to element
		element.children[2].children[1].removeAttribute('href');
		//make link open in new tab
		element.children[2].children[1].removeAttribute('target');
	}
}

function getPopularMoviesOf(year) {
	getPopular("get-popular-movies", year);
	setTimeout(function () {
		clearArrObj();
		fillCards(movieObjects, "movie-card-");
	}, 1000);
}

function getPopularShowsOf(year) {
	getPopular("get-popular-shows", year)
	setTimeout(function () {
		clearArrObj();
		fillCards(tvObjects, "tv-card-");
	}, 1000);
}

function clearArrObj() {
	setTimeout(function () {
		//clear arrays and objects
		tvArray = [];
		movieArray = [];
		tvObjects = [];
		movieObjects = [];
	}, 800);
}

getPopularMoviesOf(2021);
getPopularShowsOf(2021);


$("#submit").on('click', function (e) {
	e.preventDefault();

	//get inner text of input field
	var textInput = $(".input").val();
	console.log(textInput);

	//get media type selection
	var mediaType = $("select").find(":selected").text();
	console.log(mediaType);

	if (textInput.length === 4 && textInput > 1920) {
		if (mediaType === "All") {
			//get media
			getPopularMoviesOf(textInput);
			getPopularShowsOf(textInput);
			Pace.restart();
		} else if (mediaType === "TV Shows") {
			//get media
			getPopularShowsOf(textInput);
			Pace.restart();
		} else {
			//get media
			getPopularMoviesOf(textInput);
			Pace.restart();
		}

	} else {
		swal("Oops!", "Invalid Year! Try Again!", "error");
	}

	$(".input").val('');
});

// Hamburger menu in main nav
document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}

});
