const Comments = require("../service/Comment");
const { error, success } = require("../utils/baseController");
const { logger } = require("../utils/logger");
var requestIp = require("request-ip");

exports.addComment = async (req, res) => {
  try {
    const { comment, commentable_id, commentable_type } = req.body;
    await new Comments({
      comment,
      commentable_id,
      commentable_type,
      ip_address: requestIp.getClientIp(req),
    }).addComment();
    return success(res, { message: "Comment added successfully" });
  } catch (err) {
    logger.error("Error occurred creating comment", err);
    return error(res, { code: err.code, message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const movies = await new Comments(req.params.movieId).getComments();
    return success(res, movies);
  } catch (err) {
    logger.error("Unable to complete request", err);
    return error(res, { code: err.code, message: err.message });
  }
};
