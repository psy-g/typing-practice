module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ranking",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      time: {
        // type: DataTypes.INTEGER(),
        type: DataTypes.DECIMAL(10, 1),
        allowNull: false,
      },
      average: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      one: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      two: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      three: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      four: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      five: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      six: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      seven: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
    }
  );
