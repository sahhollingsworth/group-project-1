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

//storeToLocalStorage({title:"wee", released: "2021"});

//getPopular("get-popular-movies", 2021);

//create a card element and return it
function makeCard(mediaObj){
	//make <div> with class card
	var card = $("<div>").addClass("card");
	
	//make <div> for card img
	var cardImage = $("<div>").addClass("card-image").attr("id", "poster");
	//make <figure> for cardImage
	var figureImage = $("<figure>").addClass("image");
	//make <img> element with url and alt, gets movieObjects[index].Poster
	var imgElement = $("<img>").attr("src", mediaObj.Poster).attr("alt", "Poster of " + mediaObj.Title).attr("style","max-height: 400px; max-width: 200px");

	//append imgElement to figureImage
	figureImage.append(imgElement);
	//append figureImage to cardImage
	cardImage.append(figureImage);
	//append cardImage to card
	card.append(cardImage);

	//make <div> for card-content
	var cardContent = $("<div>").addClass("card-content");
	
	//make <div> for content
	var titleContent = $("<div>").addClass("content");
	//make <p> for title
	var title = $("<p>").addClass("title is-4").attr("id","title").text(mediaObj.Title);
	//make <p> for subtitle
	var releaseDate = $("<p>").addClass("subtitle is-6").attr("id", "release-date").text(mediaObj.Released);

	//append title to content
	titleContent.append(title);
	//append releaseDate to content
	titleContent.append(releaseDate);
	//append titleContent to cardContent
	cardContent.append(titleContent);

	//create <div> for synopsis
	var synopsis = $("<div>").addClass("content").attr("id", "synopsis").text(mediaObj.Plot);

	//append synopsis to cardContent
	cardContent.append(synopsis);
	//append cardContent to card
	card.append(cardContent);

	//make <footer> for card-footer
	var cardFooter = $("<footer>").addClass("card-footer");
	//make <a> for addToList
	var addToList = $("<a>").addClass("card-footer-item").attr("href", "#my-list").text("Add to My List");
	//make <a> for more info
	var moreInfo = $("<a>").addClass("card-footer-item").attr("href", "https://www.imdb.com/title/" + mediaObj.imdbID + "/").attr("target", "_blank").text("More Info");

	//append addToList to cardFooter
	cardFooter.append(addToList);
	//append moreInfo to cardFooter
	cardFooter.append(moreInfo);
	//append cardFooter to card
	card.append(cardFooter);

	return card;
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
    Ratings: [
        {
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

console.log(makeCard(myMovie));
putInCarousel(makeCard(myMovie), $(".tv-carousel"))

function putInCarousel(card, element){
	element.append(card);
}