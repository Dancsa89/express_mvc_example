const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const clocks = require('./controllers/clocks');
const videogames = require('./controllers/videogames');
const pokemons = require('./controllers/pokemons');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));

app.use('/clocks', clocks);
app.use('/videogames', videogames);
app.use('/pokemons', pokemons);
app.listen(process.env.PORT, () => {
  console.log('Listen on PORT 5001');
});

// modellel a tábla adatait tudjuk kezelni - adatlekérdező/adatmanipuláció

// migrációval a tábla struktúráját tudjuk változtatni - adatdefiníció
