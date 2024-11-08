// models/userModel.js
const bcrypt = require('bcrypt');

exports.createUser = async (db, userData) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Usuario (UsuNom, UsuApePat, UsuApeMat, UsuCorEle, UsuNomUsu, UsuCon) VALUES (?, ?, ?, ?, ?, ?)';
        const { UsuNom, UsuApePat, UsuApeMat, UsuCorEle, UsuNomUsu, UsuCon } = userData;

        // Hashear la contraseña antes de guardarla
        bcrypt.hash(UsuCon, 10, (err, hashedPassword) => {
            if (err) {
                return reject(err);
            }
            db.run(sql, [UsuNom, UsuApePat, UsuApeMat, UsuCorEle, UsuNomUsu, hashedPassword], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.lastID); // Devolvemos el lastID como una promesa resuelta
            });
        });
    });
};

exports.getUserByUsername = (db, username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Usuario WHERE UsuNomUsu = ?';
        db.get(sql, [username], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};
