
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/customer', function (req, res) {
    res.json({
        status: 'Customer API Its Working',
        message: 'Welcome to Yive project!'
    });
});

// Import contact controller
var customerController = require('../controllers/customerController');


// Contact routes

router.route('/customer/list/all')
    .post(customerController.index);

router.route('/customer/count/all')
    .get(customerController.countcustomer);

router.route('/customer/count/byuser/:userid')
    .get(customerController.countcustomerByUserId);

// router.route('/customer/list/:business_owner_id/:business_id')
//     .get(customerController.listbybusinessowner);

router.route('/customer/list/:getby/:byId?/')
    .post(customerController.listby);

router.route('/customer/list/:startDate/:endDate/all/')
    .get(customerController.dashIndex);

router.route('/customer/list/:startDate/:endDate/:getby/:byId?/')
    .get(customerController.dashlistby);

router.route('/customer/count/all/:startDate/:endDate')
    .get(customerController.countcustomer);

router.route('/customer/count/byuser/:userid/:startDate/:endDate')
    .get(customerController.countcustomerByUserId);

router.route('/customer/count/bylocation/:locationid/:businessid/:startDate/:endDate')
    .get(customerController.countcustomerByLocationId);

router.route('/customer/list/:startDate/:endDate/:getby/:locationid/:businessid')
    .get(customerController.listbyLocationId);


// router.route('/customer/list/:business_owner_id')
//     .get(customerController.listbybusinessowner);

router.route('/customer/info/:user_id')
    .get(customerController.userData);
    
    

// Export API routes : We have to epost this var to access in other files
module.exports = router;