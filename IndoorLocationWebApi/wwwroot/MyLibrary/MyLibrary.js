

function xx() {
    //console.log("ff")
    //const express = require('express')
    //const app = express();
    //const port = 60210

    //app.get('/', (req, res) => res.send('Hello World!'))

    //app.listen(port, () => console.log(`Example app listening at http://localhost:${port}/Home/Index`))

    //debugger
    //const express = require('express');
    //const app = express();
    //const homeController = require('./controller');

    //app.set('view engine', 'ejs');
    //app.set('views', './view');
    //const port = 60210
    //app.use('http://localhost:${port}/Home/Index');

    //app.listen(60210, function () {
    //    console.log('Sunucu çalışıyor...');
    //});

    

}

function json(response) {
    return response.json()
}

fetch('https://api.github.com/users', {
    method: 'post',
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: {
        "userId": 1,
        "title": "title test",
        "body": "body test"
    }
})
    .then(json)
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
//function fetchMoviesJSON() {
//    fetch("https://api.github.com/users").then(function (response) {
//        return response.json();
//    }).then(function (user) {
//        console.log(user);
//    });

}
json();