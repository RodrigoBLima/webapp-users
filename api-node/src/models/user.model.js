module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
    },
    birth: {
      type: DataTypes.DATE,
    },
    photo: {
      type: DataTypes.BLOB,
    },
  });

  return User;
};
