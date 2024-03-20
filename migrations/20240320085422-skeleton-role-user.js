'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "user"
    }),
    await queryInterface.addColumn('Products', 'status', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "available"
    }),
    await queryInterface.addColumn('Products', 'imageUrl', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'role'),
    await queryInterface.removeColumn('Products', 'status')
    await queryInterface.removeColumn('Products', 'imageUrl')
  }
};
