exports.getMainOrganization = (db) =>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM organizacion WHERE ORDER BY orgfeccrea ASC LIMIT 1';
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
