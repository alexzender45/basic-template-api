module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Films", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      opening_crawl: {
        type: Sequelize.STRING(10000),
        allowNull: false,
      },
      episode_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATE(1000),
        allowNull: false,
      },
      comment_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Films"),
};
