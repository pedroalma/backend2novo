const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Produto = sequelize.define('Produto', {
    codProd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'codProd' // força o nome exato da coluna na tabela
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'descricao'
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quantidade'
    },
    peso: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
      field: 'peso'
    },
    unidade: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'unidade'
    },
    codBar: {
      type: DataTypes.STRING(13),
      allowNull: false,
      field: 'codBar'
    },
    dataDeEntrada: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'dataDeEntrada'
    },
    dataDeValidade: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'dataDeValidade'
    },
    dataLimiteDeSaida: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'dataLimiteDeSaida'
    },
    codUsu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'codUsu'
    },
    codOri: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'codOri'
    },
    codList: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'codList'
    }
  }, {
    tableName: 'tbprodutos',      // força usar exatamente sua tabela manual
    underscored: false           // mantém createdAt e updatedAt 
            // impede que Sequelize altere o nome da tabela
  });

  return Produto;
};