module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING, 
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    confirmPassword: {
      type: Sequelize.STRING,
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

