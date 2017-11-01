module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Vote, {
      foreignKey: 'userId'
    });
  };
  return User;
};

