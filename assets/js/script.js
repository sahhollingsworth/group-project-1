
// Google books API fetch
fetch(`https://www.googleapis.com/books/v1/volumes?q=cat&key=AIzaSyDtUUPKatgp-DpuXV5xxSYrWkT9DLYlIc8`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// NYT Fetch API
    fetch(`https://api.nytimes.com/svc/books/v3/lists/'2021-02-02'/hardcover-fiction.json&api-key=nchTYYEyH5NAeLwlhujlR0i0GgClzSsd`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log
    });

// class book {
//     constructor(title, author, releaseDate, description) {
//         this.title = title;
//         this.author = author;
//         this.releaseDate = releaseDate;
//         this.description = description;
//     }
// }

