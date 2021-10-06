
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