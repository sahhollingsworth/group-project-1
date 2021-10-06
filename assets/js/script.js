//variable for movie data
var movieData;
//variable that stores movieData.movie_results
var movieArray;
//array that stores Movie Objects
var movieObjects = [];

//might not be necessary
class Movie {
	constructor(title, released, poster, plot){
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
function organizeInfo(){
	for(var i = 0; i < 10; i++){
		//passes the IMDb ID to the function
		getMediaInfo(movieArray[i].imdb_id);
	}
}

function getMediaInfo(imdbID) {
	fetch("http://www.omdbapi.com/?apikey=726baba7&i=" + imdbID)
		.then(response => {
			console.log(response);
			return response.json();
		})
		.then(data => {
			//condition if media type is a movie
			if(data.Type === "movie"){
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

storeToLocalStorage({title:"wee", released: "2021"});

//getPopular("get-popular-movies", 2021);

// // Google books API fetch
// fetch(`https://www.googleapis.com/books/v1/volumes?q=cat&key=AIzaSyDtUUPKatgp-DpuXV5xxSYrWkT9DLYlIc8`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

// // NYT Fetch API
//     fetch(`https://api.nytimes.com/svc/books/v3/lists/'2021-02-02'/hardcover-fiction.json&api-key=nchTYYEyH5NAeLwlhujlR0i0GgClzSsd`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         console.log
//     });

// class book {
//     constructor(title, author, releaseDate, description) {
//         this.title = title;
//         this.author = author;
//         this.releaseDate = releaseDate;
//         this.description = description;
//     }
// }

