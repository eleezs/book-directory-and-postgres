"use strict";

// const Sequelize = require('sequelize');


// create schema
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  
  return User
};
