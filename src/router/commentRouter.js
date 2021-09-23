const commentRouter = require("../core/routerConfig");
const commentController = require("../controller/commentController");

commentRouter.route("/comments").post(commentController.addComment);

commentRouter.route("/comments/:movieId").get(commentController.getComments);

module.exports = commentRouter;
