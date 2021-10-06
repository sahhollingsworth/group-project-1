function getPopular(type, year) {
	fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-popular-movies&page=1&year=2018", {
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
		});
}


ombdkey = "726baba7";

fetch("http://www.omdbapi.com/?apikey=" + ombdkey + "&i=tt1285016")
	.then(response => {
		console.log(response);
		return response.json();
	})
	.then(data => {
		console.log(data);
	})

getPopular();

// Google books API fetch
fetch(`https://www.googleapis.com/books/v1/volumes?q=cat&key=AIzaSyDtUUPKatgp-DpuXV5xxSYrWkT9DLYlIc8`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });


    fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=nchTYYEyH5NAeLwlhujlR0i0GgClzSsd`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
