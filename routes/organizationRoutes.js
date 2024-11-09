const express = require('express');
const organizationController = require('../controllers/organizationController');
const auth = require('../middleware/auth.js');

const router = express.Router();

// rutas
router.get('/principal', /*auth,*/ organizationController.getMainOrganization); // Obtener la organización principal
router.get('/', /*auth,*/ organizationController.getOrganizations); // Obtener todas las organizaciones
//router.get('/:id', /*auth,*/ organizationController.getOrganization); // Ver una organización por ID
router.post('/', /*auth,*/ organizationController.createOrganization); // Crear una organización
router.put('/:id', /*auth,*/ organizationController.updateOrganization); // Actualizar una organización
router.delete('/:id', /*auth,*/ organizationController.deleteOrganization); // Eliminar una organización
router.get('/search', /*auth,*/ organizationController.searchOrganizations); // Buscar una organización
router.get('/export/excel', /*auth,*/ organizationController.exportToExcel); // Exportar a excel
router.get('/export/pdf', /*auth,*/ organizationController.exportToPDF); // Exportar a pdf

module.exports = router;

