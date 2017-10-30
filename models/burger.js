module.exports = function(sequelize, DataTypes) {

  var Burger = sequelize.define("Burger", {
    // Giving the Burger model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Burger.associate = function(models) {
    // Associating Burger with Eaters
    // A Burger can be created without an Eater
    Burger.belongsTo(models.Eater, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Burger;
};


