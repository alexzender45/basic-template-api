const Film = require("./Film"),
  axios = require("axios");
const { throwError } = require("../utils/handleErrors");
const _ = require("lodash");

class Character {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async fetchCharactersInMovie() {
    const movieData = await new Film(this.data).getFilmById();
    Promise.all();
    let movieCharacters = await Promise.all(
      movieData.characters.map(async (url) => {
        const characterData = await axios.get(url);
        return characterData.data;
      })
    );

    return movieCharacters;
  }

  async fetchCharacterById() {
    const { search, movieId } = this.data;
    const movieData = await new Film(movieId).getFilmById();
    Promise.all();
    let characters = await Promise.all(
      movieData.characters.map(async (url) => {
        const characterData = await axios.get(url);
        return characterData.data;
      })
    );
    if (characters.length !== 0) {
      if ("sortBy" in search) {
        if (
          search.sortBy !== "name" &&
          search.sortBy !== "gender" &&
          search.sortBy !== "height"
        ) {
          throwError("sortBy Parameter must be name or gender or height");
        }
        const sort = _.sortBy(characters, ["name", "gender", "height"]);
        const orderBy = _.orderBy(sort, ["created"], [search.order]);

        if ("order" in search) {
          if (search.order !== "asc" && search.order !== "desc") {
            throwError("order parameter must be asc or desc");
          }
          if (search.order === "asc" || search.order === "desc") {
            _.orderBy(sort, ["created"], [search.order]);
          }
        }
        if ("gender" in search) {
          if (search.gender !== "male" && search.gender !== "female") {
            throwError("Gender parameter must be male or female");
          }
          if (search.gender === "male") {
            const orderByGenderMale = _.filter(orderBy, [
              "gender",
              search.gender,
            ]);
            return {
              message: "Movie retrieved for number " + movieId,
              data: orderByGenderMale,
            };
          } else {
            const orderByGenderFemale = _.filter(orderBy, [
              "gender",
              search.gender,
            ]);
            return {
              message: "Movie retrieved for number " + movieId,
              data: orderByGenderFemale,
            };
          }
        }
      } else {
        throwError("No character retrieved for movie number " + movieId, 404);
      }
    }
  }
}

module.exports = Character;
