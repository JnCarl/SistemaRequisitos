const e = require("express");

exports.getMainOrganization = (db) =>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM organizacion ORDER BY orgfeccrea ASC LIMIT 1';
        db.get(sql, [], (err, row) =>{
            if(err){
                reject(err);
            }
            resolve(row);
        });
    });
};
// Crear una nueva organización
exports.createOrganization = (db, orgData) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO organizacion 
            (orgcod, orgver, orgfecmod, orgnom, orgdir, orgtel, orgrepleg, orgtelrepleg, orgruc, orgcontact, orgtelcon, orgtiporgcod, orgautcod, orgest, orgcom, orgartcod, orgusuid) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const {
            orgcod,
            orgver,
            orgfecmod,
            orgnom,
            orgdir,
            orgtel,
            orgrepleg,
            orgtelrepleg,
            orgruc,
            orgcontact,
            orgtelcon,
            orgtiporgcod,
            orgautcod,
            orgest,
            orgcom,
            orgartcod,
            orgusuid
        } = orgData;

        db.run(sql, [
            orgcod,
            orgver,
            orgfecmod,
            orgnom,
            orgdir,
            orgtel,
            orgrepleg,
            orgtelrepleg,
            orgruc,
            orgcontact,
            orgtelcon,
            orgtiporgcod,
            orgautcod,
            orgest,
            orgcom,
            orgartcod,
            orgusuid
        ], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
};
//Listar/Obtener todas las organizaciones menos la principal
exports.getOrganizations = (db) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM organizacion ORDER BY orgfeccrea ASC LIMIT -1 OFFSET 1';
        db.all(sql, [], (err, rows)=>{
            if(err) reject(err);
            else resolve(rows);
        });
    });
};
// Obtener una organización específica por su código
exports.getOrganization = (db, orgcod) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM organizacion WHERE orgcod = ?';
        db.get(sql, [orgcod], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Buscar organizaciones
exports.searchOrganizations = (db, nombre, year, month) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM organizacion WHERE 1=1';
        const params = [];
        if(nombre){
            sql += ' AND orgnom LIKE ?';
            params.push(`%${nombre}%`);
        }
        if(year){
            sql += ' AND strftime("%Y", orgfeccrea) = ?';
            params.push(year);
        }
        if(month){
            sql += ' AND strftime("%m", orgfeccrea) = ?';
            params.push(month);
        }
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
};