// conncet to DB
const Sequelize = require("sequelize");
var express = require("express");
const sql = require("mssql");

var dbConnectionData = function(sequelize) {
  const BookDB = sequelize.define(
    "Book",
    {
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        get() {
          return this.getDataValue("bookId");
        }
      },
      title: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue("title");
        }
      },
      genre: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue("genre");
        }
      },
      author: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue("author");
        }
      },
      content: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue("content");
        }
      }
    },
    {
      timestamps: false,
      setterMethods: {
        bookId: function(bookId) {
          this.setDataValue("bookId", bookId);
        },
        title: function(title) {
          this.setDataValue("title", title);
        },
        genre: function(genre) {
          this.setDataValue("genre", genre);
        },
        author: function(author) {
          this.setDataValue("author", author);
        },
        content: function(content) {
          this.setDataValue("content", content);
        }
      }
    }
  );

  return BookDB;
};
module.exports = dbConnectionData;
