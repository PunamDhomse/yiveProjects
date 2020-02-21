
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/location', function (req, res) {
    res.json({
        status: 'Business location API Its Working',
        message: 'Welcome to Yive project!'
    });
});


// Import contact controller
var locationController = require('../controllers/businessLocationController');

// Contact routes

router.route('/location/list')
    .get(locationController.index);

router.route('/location/add')
    .post(locationController.add);

router.route('/location/:business_id')
    .get(locationController.view)

router.route('/location/business/:business_id')
    .put(locationController.updateBusinessLocation)

router.route('/location/multiple')
    .post(locationController.getMultiple)

router.route('/location/:location_id')
    .patch(locationController.update)
    .put(locationController.update)
    .delete(locationController.delete);

// Export API routes : We have to epost this var to access in other files
module.exports = router;