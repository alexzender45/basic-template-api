const axios = require("axios");
const stringify = require("json-stringify-safe");
const _ = require("lodash");
const { SWAPI_URL } = require("../core/config");
const { Film } = require("../models");

class Films {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async fetchMovies() {
    const api_url = `${SWAPI_URL}/films`;
    const response_api = await axios.get(api_url);
    const repr = JSON.parse(stringify(response_api));
    const sortMovieByReleaseDate = _.sortBy(
      repr.data["results"],
      "release_date"
    );
    return sortMovieByReleaseDate;
  }

  async getAllMoviesFromApi() {
    const api_url = `${SWAPI_URL}/films`;
    const response_api = await axios.get(api_url);
    const repr = JSON.parse(stringify(response_api));
    //sort the movies by release date
    const sort = _.sortBy(repr.data["results"], "release_date");
    //console.log(sort);
    const obj = await Film.findAll({
      attributes: [
        "title",
        "opening_crawl",
        "episode_id",
        "release_date",
        "comment_count",
      ],
    });
    console.log(obj);
    if (obj != null) {
      const retrieved = {
        count: obj.length,
        filmArray: obj.filter((ob) => {
          return {
            title: ob.title,
            opening_crawl: ob.opening_crawl,
            episode_id: ob.episode_id,
            release_date: ob.release_date,
            comment_count: ob.comment_count,
          };
        }),
      };
      return retrieved;
    } else {
      var film = Film.bulkCreate(sort);

      return sort;
    }
  }

  // fetch film by id
  async getFilmById() {
    const response = await axios.get(`${SWAPI_URL}/films/${this.data}`);
    return response.data;
  }
}

module.exports = Films;
