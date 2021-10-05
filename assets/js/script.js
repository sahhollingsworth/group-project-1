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
