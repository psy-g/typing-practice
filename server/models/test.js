module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "test",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      problem: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
