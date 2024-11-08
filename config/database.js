//database.js
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ruta absoluta al archivo de la base de datos
const dbPath = path.resolve(__dirname, '../database/databasefinal.db');

// Conectar a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err);
  } else {
    console.log('Conectado a la base de datos');
    ejecutarSchema();  // Llama a la función para ejecutar el archivo SQL
  }
});

// Función para ejecutar el archivo la base de datos
function ejecutarSchema() {
  const schemaPath = path.resolve(__dirname, '../database/databasefinal.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8'); 
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error al crear tablas:', err.message);
    } else {
      console.log('Tablas creadas exitosamente');
    }
  });
}

module.exports = db;