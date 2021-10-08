# Nostalgia Generator
The Nostalgia Generator is a Javascript-based web application that allows users to search for all media for a given year. They are able to broswe through titles in a simple set of carousels, choosing between learning more about titles of interst or saving interesting titles for later review in their personal List.


## Deployed Application
[Click here to check the Nostalgia Generator.](https://sahhollingsworth.github.io/nostalgia-generator/ "link to the Nostalgia Generator web application")

![Image](./assets/images/nostalgia-generator_screenshot.png "screenshot of web Nostalgia Generator application")

## Summary
The Nostalgia Generator is a web application that allows user to enter a year value and media type to receive a carousel of the most popular movies and tv shows for any given year. Each movie or tv show is presented with a poster, description, and release date. For any item, the user can choose to see more information about it and be redirected to IMDB.com or save it to their list to revisit at a later date.

should note that it's build on javascript using Pace for loading elements and SweetAlert for alert elements. Using minimal custom CSS and instead leverage Bulma framework so Nostalgia Generator is a dynamic, mobile first web application.

[Walkthrough of app development details](https://docs.google.com/presentation/d/1TSzjUfo8YNB_hXrAkpGvDFMkXpFUUqa8xXrjsFbQFSI/edit?usp=sharing "Link to Nostalgia Generator development walkthrough")

## Future Developement
* Handle slow API responses or find alternate resources
* Add ability to remove cards from my list
* Handle non-200 API responses, update user
* Dynamic creation of media cards via javascript
* Support adding Book results to a user’s Google Books list directly from the app. Requires Google OAuth implementation
* Switch to a less verbose, more widely-supported CSS library
* Improve small screen device support
* Handle case when media description is empty
* Search filters for genre, age, volume of results, content language
* Support time range search in addition to year
* Support additional media types, such as toys, video games, books, music

## Built with
* [SweetAlert.js](https://sweetalert.js.org/guides/)
* [Pace.js](https://codebyzach.github.io/pace/)
* [Barber Shop CSS template](https://nicepage.com/s/72045/the-barber-shop-css-template)
* [Bulma.io CSS framework](https://bulma.io/)
* [JQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript) 
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

* [OMDP API](https://www.omdbapi.com/)
* [IMDB API](https://imdb-api.com/API)
* [Google Fonts API](https://developers.google.com/fonts/docs/getting_started)

## Authors
* Isaac Cortes Hernandez
  * [Github](https://github.com/icortes)
  * [LinkedIn](https://www.linkedin.com/in/cortes-isaac/)
* George Sandoval
  * [Github](https://github.com/gsandoval09)
  * [LinkedIn](https://www.linkedin.com/in/george-sandoval-4467641b3/)
* Joel Samuel
  * [Github]()
  * [LinkedIn]()
* Sarah Hollingsworth
  * [Github](https://github.com/sahhollingsworth)
  * [LinkedIn](https://www.linkedin.com/in/sarahhollingsworth/)

## Acknowledgments
* Reset.css in public domain, found at [Meyer Web](http://meyerweb.com/eric/tools/css/reset/)
