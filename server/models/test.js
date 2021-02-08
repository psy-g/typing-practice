module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "test",
    {
      problem: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
