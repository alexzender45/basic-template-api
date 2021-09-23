const Character = require("../service/Characters");
const { error, success } = require("../utils/baseController");
const { logger } = require("../utils/logger");

exports.fetchCharactersInMovie = async (req, res) => {
  try {
    const characters = await new Character(
      req.params.movieId
    ).fetchCharactersInMovie();
    return success(res, characters);
  } catch (err) {
    logger.error("Error occurred getting characters movies", err);
    return error(res, { code: err.code, message: err.message });
  }
};

exports.fetchCharacterById = async (req, res) => {
  try {
    const search = req.query;
    const movieId = req.params.movieId;
    const characters = await new Character({
      search,
      movieId,
    }).fetchCharacterById();
    return success(res, characters);
  } catch (err) {
    logger.error("Unable to complete request", err);
    return error(res, { code: err.code, message: err.message });
  }
};
