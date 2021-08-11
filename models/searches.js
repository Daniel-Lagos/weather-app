const axios = require('axios');

class Searches {

  history = [''];

  constructor() {
    //TODO: read db if it exists
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


}

module.exports = Searches;
