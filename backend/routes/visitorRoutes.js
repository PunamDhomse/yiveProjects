
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/visitor', function (req, res) {
    res.json({
        status: 'Visitor API Its Working',
        message: 'Welcome to Yive project!'
    });
});

// Import contact controller
var visitorController = require('../controllers/visitorController');

// Visitor routes

router.route('/visitor/list/:id')
    .get(visitorController.index);


router.route('/visitor/list/:startDate/:endDate/:id')
    .get(visitorController.index);

router.route('/visitor/list/:startDate/:endDate/:locationid/:businessid')
    .get(visitorController.listbyLocationId);
router.route('/visitorlist/:locationid/:businessid')
    .get(visitorController.listbyLocationId);

router.route('/visitor/count/all')
    .get(visitorController.countvisitor);

router.route('/visitor/countbydate/all/:startDatee/:endDatee')
    .get(visitorController.countvisitorbydate);

router.route('/visitor/count/byuser/:userid')
    .get(visitorController.countvisitorbyuserid);

router.route('/visitor/count/all/:startDate/:endDate')
    .get(visitorController.countvisitor);

router.route('/visitor/count/byuser/:userid/:startDate/:endDate')
    .get(visitorController.countvisitorbyuserid);

router.route('/visitor/count/bylocation/:locationid/:businessid/:startDate/:endDate')
    .get(visitorController.countvisitorByLocationId);

router.route('/visitor/add')
    .post(visitorController.add);

router.route('/visitor/visitorList')
    .get(visitorController.allvisitorList);

router.route('/visitor/:id')
    .put(visitorController.getByCustomerId);

router.route('/visitor/visitorList/:startDate/:endDate')
    .get(visitorController.allvisitorList);


router.route('/visitor/delete/:visitor_id')
    .delete(visitorController.delete);

// Export API routes : We have to epost this var to access in other files
module.exports = router;

