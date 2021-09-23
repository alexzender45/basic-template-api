module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define(
    "Film",
    {
      // increase the size of opening_crawl to allow for longer films
      opening_crawl: DataTypes.STRING(10000),
      title: DataTypes.STRING(1000),
      episode_id: DataTypes.INTEGER,
      release_date: DataTypes.DATE(1000),
      comment_count: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Film",
      tableName: "Films",
    }
  );
  Film.associate = (/* models */) => {
    // associations can be defined here
  };

  return Film;
};
