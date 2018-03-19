module.exports = (sequelize, DataTypes) => {
  const blacklist = sequelize.define('blacklist', {
    token: DataTypes.TEXT
  });
  return blacklist;
};
