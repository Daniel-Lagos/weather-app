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

        if (idSelected === '0') continue;

        const placeSelected = places.find((place) => place.id === idSelected);

        searches.addHistory(placeSelected.name);

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
        searches.capitalHistory.forEach((place, index) => {
          const idx = `${index + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
      case 0:

        break;

    }

    if (opt !== 0) await pause();

  } while (opt !== 0);


};

main().then();
