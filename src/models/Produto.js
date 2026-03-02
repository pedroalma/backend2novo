// models/Produto.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Produto = sequelize.define('Produto', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    unidade: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'kg'
    },
    quantidade_por_unidade: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    quantidade_de_pacotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    validade: {
      type: DataTypes.DATEONLY,      // ou STRING se preferir guardar "MM/AAAA"
      allowNull: false
    },
    data_recebimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'produtos',
    underscored: true,   // garante snake_case
    timestamps: true
  });

  return Produto;
};