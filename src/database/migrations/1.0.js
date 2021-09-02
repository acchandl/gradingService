"use strict";
const path = require('path');
const Promise = require('bluebird');
const sqlite3 = require('sqlite3');

module.exports = {
    up: function () {
        return new Promise(function (resolve, reject) {
            let db = new sqlite3.Database('./database/gradingApp.db');

            db.run(`PRAGMA foreign_keys = ON`);

            db.serialize(function () {
                db.run(`CREATE TABLE student(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    created TIMESTAMP DEFAULT TIMESTAMP,
                    updated TIMESTAMP DEFAULT TIMESTAMP
                    )`);

                db.run(`CREATE TABLE worksheet (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    created TIMESTAMP DEFAULT TIMESTAMP,
                    updated TIMESTAMP DEFAULT TIMESTAMP,
                    studentID INTEGER,
                    FOREIGN KEY(studentID) REFERENCES student(id)
                    )`);

                db.run(`CREATE TABLE worksheetQuestions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    temperature INTEGER,
                    temperatureType TEXT,
                    typeTarget,
                    response,
                    grade,
                    worksheetID INTEGER,
                    FOREIGN KEY(worksheetID) REFERENCES worksheet(id)
                    )`);
            });

            db.close();
        });
    }
};
