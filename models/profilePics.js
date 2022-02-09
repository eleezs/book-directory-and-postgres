"use strict";

// const Sequelize = require('sequelize');


// create schema
module.exports = function(sequelize, DataTypes) {
  const ProfilePics = sequelize.define("profilepic",{
    id: {
      allowNull: false,
      primaryKey: true,
      // foreignKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });
  
  return ProfilePics
};
// {
//   user_id: {
//     allowNull: false,
//     // autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//   }, 