// Initialize express router
let router = require('express').Router();

// Import contact controller
var reportsController = require('../controllers/reportsController');


// Contact routes

router.route('/reports/list/all')
    .post(reportsController.index);

router.route('/reports/list/:getby/:byId?/')
    .post(reportsController.listby);

// Export API routes : We have to epost this var to access in other files
module.exports = router;