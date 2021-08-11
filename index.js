require('colors');
require('dotenv').config();

const Searches = require('./models/searches');
const {
  readInput,
  pause,
  inquirerMenu,
  listPlaces
} = require('./helper/inquirer');

const main = async () => {

  let opt;

  const searches = new Searches();

  do {
    console.clear();

    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const textSearch = await readInput('City: ');
        const places = await searches.city(textSearch);
        const idSelected = await listPlaces(places);
        const placeSelected = places.find((place) => place.id === idSelected);
        const weatherPlaceSelected = await searches.placeWeather(
          placeSelected.lat, placeSelected.lng);

        console.clear();
        console.log('\n Place Information \n'.green);
        console.log('City:', placeSelected.name.green);
        console.log('Length:', placeSelected.lng);
        console.log('Latitude:', placeSelected.lat);
        console.log('Temperature:', weatherPlaceSelected.temp);
        console.log('Minimum:', weatherPlaceSelected.min);
        console.log('Maximum:', weatherPlaceSelected.max);
        console.log('Weather:', weatherPlaceSelected.description.green);

        break;
      case 2:

        break;
      case 0:

        break;

    }

    if (opt !== 0) await pause();

  } while (opt !== 0);


};

main().then();
