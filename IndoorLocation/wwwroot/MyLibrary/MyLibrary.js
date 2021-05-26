

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

    async function fetchMoviesJSON() {
        const response = await fetch('/Home/Index');
        debugger;
        const movies = await response.json();
        debugger;
        return movies;
    }

    fetchMoviesJSON().then(movies => {
        movies; // fetched movies
    });
}
xx();