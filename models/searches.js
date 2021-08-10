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

}

module.exports = Searches;
