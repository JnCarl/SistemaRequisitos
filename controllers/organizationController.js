const organizationModel = require('../models/organizationModel');
const excel = require('exceljs');
const PDFDocument = require('pdfkit');

//Organizacion principal
exports.getMainOrganization = async (req, res) => {
    try{
        const mainOrg = await organizationModel.getMainOrganization(req.db);
        res.status(200).json(mainOrg);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//Obtener todas las organizaciones
exports.getOrganizations = async(req, res) => {
    try{
        const organizations = await organizationModel.getOrganizations(req.db);
        res.status(200).json(organizations);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
//  Ver organización específica por ID
exports.getOrganization = async(req, res) => {
    try{
        const id = req.params.id;
        const organization = await organizationModel.getOrganization(req.db, id)
        if(!organization){
            return res.status(404).json({error: 'Organization no encontrada'});
        }
        res.status(200).json(organization);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

// Crear una organización
exports.createOrganization = async(req, res) => {
    try{
        const orgData = req.body;
        await organizationModel.createOrganization(req.db, orgData);
        res.status(201).json({message: 'Organizacion creada exitosamente'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
//Editar una organización
exports.updateOrganization = async(req, res) => {
    try{
        const {id} = req.params;
        const organizationData = req.body;
        const success = await organizationModel.updateOrganization(req.db, id, organizationData);
        if(success){
            res.status(200).json({message: 'Organización actualizada exitosamente'});
        }else{
            res.status(404).json({error: 'Organización no encontrada'});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
//Eliminar una organización
exports.deleteOrganization = async(req, res) => {
    try{
        const {id} = req.params;
        const success = await organizationModel.deleteOrganization(req.db, id);
        if(success){
            res.status(200).json({message: 'Organización eliminada exitosamente'});
        }else{
            res.status(404).json({error: 'Organización no encontrada'});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
//Buscar una organización por nombre, año y mes
exports.searchOrganizations = async(req, res) => {
    try{
        const {nombre, year, month} = req.query;
        const results = await organizationModel.searchOrganizations(req.db, nombre, year, month);
        res.status(200).json(results);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
// Exportar organizaciones a Excel
exports.exportToExcel = async (req, res) => {
    const organizations = await organizationModel.getOrganizations(req.db);
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Organizaciones');

    worksheet.columns = [
        { header: 'Código', key: 'codigo', width: 15 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Fecha de Creación', key: 'fecha_creacion', width: 15 },
        { header: 'Versión', key: 'version', width: 10 }
    ];

    worksheet.addRows(organizations);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=organizaciones.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};

// Exportar organizaciones a PDF
exports.exportToPDF = async (req, res) => {
    const organizations = await organizationModel.getOrganizations(req.db);
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=organizaciones.pdf');

    doc.pipe(res);

    doc.fontSize(16).text('Organizaciones', { align: 'center' });
    doc.moveDown();

    organizations.forEach(org => {
        doc.fontSize(12).text(`Código: ${org.codigo}`);
        doc.text(`Nombre: ${org.nombre}`);
        doc.text(`Fecha de Creación: ${org.fecha_creacion}`);
        doc.text(`Versión: ${org.version}`);
        doc.moveDown();
    });

    doc.end();
};