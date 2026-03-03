module.exports = (sequelize, DataTypes) => {
  const Lista = sequelize.define('Lista', {
    codList: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unidade: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    codUni: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'tblista',
    timestamps: false,          // ← ESSA LINHA É A CHAVE: desativa createdAt/updatedAt
    underscored: false          // mantenha false se já colocou antes
  });

  // Se tiver associate:
  Lista.associate = (models) => {
    Lista.hasMany(models.Produto, {
      foreignKey: 'codList',
      as: 'produtos'
    });
  };

  return Lista;
};