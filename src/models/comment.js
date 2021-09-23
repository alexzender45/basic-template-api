module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment: DataTypes.STRING,
      commentable_id: DataTypes.INTEGER,
      commentable_type: DataTypes.STRING,
      ip_address: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Comment",
      tableName: "Comments",
    }
  );
  Comment.associate = (/* models */) => {
    // associations can be defined here
  };

  return Comment;
};
