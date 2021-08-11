const fs = require('fs');

const axios = require('axios');

class Searches {

  history = [];
  path = './db/database.json';

  constructor() {
    this.readDB();
  }

  get capitalHistory() {
    return this.history.map((place) => {
      let words = place.split(' ');
      words = words.map(w => w[0].toUpperCase() + w.substring(1));
      return words.join(' ');
    });
  }

  get paramsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    };
  }

  async city(city = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
        params: this.paramsMapBox
      });
      const response = await instance.get();
      return response.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }));
    } catch (e) {
      console.log('');
      return [];
    }
  }

  async placeWeather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          'appid': process.env.OPENWEATHER_KEY,
          'units': 'metric',
          'lang': 'es'
        }
      });
      const { data } = await instance.get();
      return {
        description: data.weather[0].description,
        min: data.main.temp_min,
        max: data.main.temp_max,
        temp: data.main.temp,
      };
    } catch (e) {
      console.log(e);
    }
  }

  addHistory = (place = '') => {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.history.unshift(place.toLocaleLowerCase());
  };

  saveDB() {
    const payload = {
      history: this.history
    };
    fs.writeFileSync(this.path, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.path)) return;
    const fileData = fs.readFileSync(this.path, { encoding: 'utf-8' });
    const data = JSON.parse(fileData);
    this.history = data.history;
  }

}

module.exports = Searches;
