const _ = require("lodash");
//const Film = require("../models/Film");
//const commentSchema = require("../models/Comment");
const { throwError } = require("../utils/handleErrors");
const { Film, Comment } = require("../models");

class Comments {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  // Save comment to database
  async addComment() {
    const { commentable_id, commentable_type, comment, ip_address } = this.data;
    await Film.find({
      attributes: [
        "title",
        "opening_crawl",
        "episode_id",
        "release_date",
        "comment_count",
      ],
    }).then((obj) => {
      if (obj != null) {
        let check = false;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].episode_id === commentable_id) {
            check = true;
            break;
          }
        }
        let comm = {
          comment: comment,
          commentable_id: commentable_id,
          commentable_type: commentable_type,
          ip_address,
        };
        Comment.create(comm);
        // add new comment to the database

        // Get the movie with the episode id we have submitted on the form and then update the comment
        let Allow = Film.findOne({ episode_id: comm.commentable_id });
        Allow.then((doc) => {
          Film.update(
            { comment_count: doc.comment_count + 1 },
            { where: { episode_id: comm.commentable_id } }
          );
        });
        return {
          status: true,
          message: "comment created successfully",
          data: null,
        };
      } else {
        throwError("Movie not found");
      }
    });
  }

  // Get comment for a movie
  async getComments() {
    const film = await Film.findOne({ where: { episode_id: this.data } });
    console.log(film);
    const comments = await Comment.findOne({
      where: { commentable_id: film.episode_id },
    });

    return {
      message: "Comments retrieved successfully for movie" + this.data,
      ip_address: comments.ip_address,
      data: _.sortBy(comments, "release_date"),
    };

    //   .then((dd) => {
    // if (!dd) {
    //   throwError("Movie Id does not exist");
    // } else {
    //   commentSchema
    // .find({ commentable_id: dd.episode_id })
    // .exec()
    // .then((doccumen) => {
    //   if (doccumen.length !== 0) {
    // results = {
    //   status: true,
    //   message: "Comment retrieved for Movie number " + this.data,
    //   ip_address: doccumen.ip_address,
    //   data: _.sortBy(doccumen, "release_date"),
    // };
    //   } else {
    // throwError("No comments found for this movie");
    //   }
    // });
    // }
    //   });
    // console.log(check);
    // return results;
  }
}

module.exports = Comments;
