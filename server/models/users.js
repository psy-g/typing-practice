module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "users",
    {
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
