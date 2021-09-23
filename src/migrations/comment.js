module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      commentable_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      commentable_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable("Comments"),
};
