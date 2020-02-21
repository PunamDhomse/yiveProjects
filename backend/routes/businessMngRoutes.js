
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/businessmng', function (req, res) {
    res.json({
        status: 'Customer API Its Working',
        message: 'Welcome to Yive project!'
    });
});

// Import contact controller
var customerController = require('../controllers/businessMngController');


// Contact routes

router.route('/businessmng/list/all')
    .post(customerController.index);

router.route('/businessmng/count/all')
    .get(customerController.countcustomer);

router.route('/businessmng/count/byuser/:userid')
    .get(customerController.countcustomerByUserId);

// router.route('/customer/list/:business_owner_id/:business_id')
//     .get(customerController.listbybusinessowner);

router.route('/businessmng/list/:getby/:byId?/')
    .post(customerController.listby);


router.route('/businessmng/count/all/:startDate/:endDate')
    .get(customerController.countcustomer);

router.route('/businessmng/count/byuser/:userid/:startDate/:endDate')
    .get(customerController.countcustomerByUserId);

// router.route('/customer/list/:business_owner_id')
//     .get(customerController.listbybusinessowner);

router.route('/businessmng/info/:user_id')
    .get(customerController.userData);
    
    

// Export API routes : We have to epost this var to access in other files
module.exports = router;