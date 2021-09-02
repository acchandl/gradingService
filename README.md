# gradingService

Prerequisites
Install Node and npm

Install and run
Clone repo
Run 'npm install'
Run 'node src/server'

sqlite3 db

student(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    created TIMESTAMP DEFAULT TIMESTAMP,
                    updated TIMESTAMP DEFAULT TIMESTAMP
                    );
                    
worksheet (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    created TIMESTAMP DEFAULT TIMESTAMP,
                    updated TIMESTAMP DEFAULT TIMESTAMP,
                    studentID INTEGER,
                    FOREIGN KEY(studentID) REFERENCES student(id)
                    );
                    
worksheetQuestions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    temperature INTEGER,
                    temperatureType TEXT,
                    typeTarget,
                    response,
                    grade,
                    worksheetID INTEGER,
                    FOREIGN KEY(worksheetID) REFERENCES worksheet(id)
                    );
