const Films = require("../service/Film");
const { error, success } = require("../utils/baseController");
const { logger } = require("../utils/logger");

exports.fetchMovies = async (req, res) => {
  try {
    const movies = await new Films().fetchMovies();
    return success(res, movies);
  } catch (err) {
    logger.error("Error occurred getting movies", err);
    return error(res, { code: err.code, message: err.message });
  }
};

exports.getAllMoviesFromApi = async (req, res) => {
  try {
    const movies = await new Films().getAllMoviesFromApi();
    return success(res, movies);
  } catch (err) {
    logger.error("Unable to complete request", err);
    return error(res, { code: err.code, message: err.message });
  }
};
