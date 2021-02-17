module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ranking",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      time: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      average: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
    }
  );
