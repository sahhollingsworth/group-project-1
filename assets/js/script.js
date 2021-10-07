//variable for movie data
var movieData;
//variable that stores movieData.movie_results
var movieArray;
//array that stores Movie Objects
var movieObjects = [];

// Carousel for media results sections
bulmaCarousel.attach('#carousel', {
	slidesToScroll: 1,
	slidesToShow: 4,
	navigation: true,
	loop: true,
});

//might not be necessary
class Movie {
	constructor(title, released, poster, plot) {
		this.title = title;
		this.released = released;
		this.poster = poster;
		this.plot = plot;
	}
}

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
			//stores data to to variable
			movieData = data;
			//puts array of media into global array
			movieArray = movieData.movie_results;
			console.log(movieArray);
			//gets more info from OMDb API
			organizeInfo();
		});
}

//gets information from OMDb and creates an array of media objects
function organizeInfo() {
	for (var i = 0; i < 10; i++) {
		//passes the IMDb ID to the function
		getMediaInfo(movieArray[i].imdb_id);
	}

	//fill the cards with info
	fillCards(movieObjects, "movie-card-")
}

function getMediaInfo(imdbID) {
	fetch("http://www.omdbapi.com/?apikey=726baba7&i=" + imdbID)
		.then(response => {
			console.log(response);
			return response.json();
		})
		.then(data => {
			//condition if media type is a movie
			if (data.Type === "movie") {
				console.log(data);
				movieObjects.push(data);
				console.log(movieObjects);


			}
			//condition if media type is a series
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

getPopular("get-popular-movies", 2021);

//fill card elements by type {movie-card- , tv-card- }
function fillCards(mediaArray,type) {
	
	//for loop that iterates through the mediaArray
	for(var i = 0; i < mediaArray.length; i++){
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

//example movieObject
var myMovie = {
	Title: "Zack Snyder's Justice League",
	Year: "2021",
	Rated: "R",
	Released: "18 Mar 2021",
	Runtime: "242 min",
	Genre: "Action, Adventure, Fantasy",
	Director: "Zack Snyder",
	Writer: "Jerry Siegel, Joe Shuster, Zack Snyder",
	Actors: "Henry Cavill, Ben Affleck, Gal Gadot",
	Plot: "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
	Language: "English, Icelandic, French",
	Country: "United States, United Kingdom",
	Awards: "2 nominations",
	Poster: "https://m.media-amazon.com/images/M/MV5BYjI3NDg0ZTEtMDEwYS00YWMyLThjYjktMTNlM2NmYjc1OGRiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
	Ratings: [{
			Source: "Internet Movie Database",
			Value: "8.1/10"
		},
		{
			Source: "Metacritic",
			Value: "54/100"
		}
	],
	Metascore: "54",
	imdbRating: "8.1",
	imdbVotes: "333,160",
	imdbID: "tt12361974",
	Type: "movie",
	DVD: "N/A",
	BoxOffice: "N/A",
	Production: "N/A",
	Website: "N/A",
	Response: "True"
}



console.log(movieObjects);

setTimeout(function(){
	fillCards(movieObjects, "movie-card-")
}, 500);