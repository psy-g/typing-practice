module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ranking",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
