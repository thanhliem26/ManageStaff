'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Work, {foreignKey: 'work_id', as: 'work_data'});
      User.hasMany(models.Contract, {foreignKey: 'user_id', as: 'user_info'});
      User.hasMany(models.Spending, {foreignKey: 'user_id', as: 'user_info'});
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING(25),
    address: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    role_user:  DataTypes.ENUM('1', '2', '3'),
    work_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

/*
Name	type	descrption	is Null	default
id	int		no	
fullName	char(255)		no	
password	char(32)		no	
email	char(255)		no	
phoneNumber	int		no	
address	char(255)		yes	
dateOfBirth	date		yes	
role_user	tinyint(1, 2, 3)	1: Admin, 2: Staf, 3: Customer	no	3
work_id	int			
created_at	date		no	
update_at	date		no	

*/