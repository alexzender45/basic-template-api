const characterRouter = require("../core/routerConfig");
const characterController = require("../controller/characterController");

characterRouter
  .route("/characters/:movieId")
  .get(characterController.fetchCharactersInMovie);

characterRouter
  .route("/characters/character-search/:movieId")
  .get(characterController.fetchCharacterById);

module.exports = characterRouter;
