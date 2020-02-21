
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/locationManager', function (req, res) {
    res.json({
        status: 'locationManager API Its Working',
        message: 'Welcome to Yive project!'
    });
});

// Import locationManager controller
var locationManagerController = require('../controllers/locationManagerController');


// locationManager routes

router.route('/locationManager/list/all')
    .post(locationManagerController.index);

/*router.route('/locationManager/count/all')
    .get(locationManagerController.countlocationManager);*/

router.route('/locationManager/count/byuser/:userid')
    .get(locationManagerController.countlocationManagerByUserId);

// router.route('/locationManager/list/:business_owner_id/:business_id')
//     .get(locationManagerController.listbybusinessowner);

router.route('/locationManager/list/:getby/:byId?/')
    .post(locationManagerController.listby);

router.route('/locationManager/list/:startDate/:endDate/all/')
    .get(locationManagerController.dashIndex);

router.route('/locationManager/list/:startDate/:endDate/:getby/:byId?/')
    .get(locationManagerController.dashlistby);

/*router.route('/locationManager/count/all/:startDate/:endDate')
    .get(locationManagerController.countlocationManager);*/

router.route('/locationManager/count/byuser/:userid/:startDate/:endDate')
    .get(locationManagerController.countlocationManagerByUserId);

// router.route('/locationManager/list/:business_owner_id')
//     .get(locationManagerController.listbybusinessowner);

router.route('/locationManager/info/:user_id')
    .get(locationManagerController.userData);
    
    

// Export API routes : We have to epost this var to access in other files
module.exports = router;