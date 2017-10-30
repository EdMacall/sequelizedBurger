module.exports = function(sequelize, DataTypes) {
  var Eater = sequelize.define("Eater", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    }
  });

  Eater.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Eater.hasMany(models.Burger, {
      onDelete: "cascade"
    });
  };
  return Eater;
};