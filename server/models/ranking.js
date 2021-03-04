module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ranking",
    {
      name: {
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
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
    }
  );
