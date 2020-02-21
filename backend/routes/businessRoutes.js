
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/business', function (req, res) {
    res.json({
        status: 'Business API is Working',
        message: 'Welcome to Yive project!'
    });
});


// Import Business controller
var businessController = require('../controllers/businessController');


router.route('/business/list')
    .get(businessController.businessList);

router.route('/business/list/owner/:owner_id')
    .get(businessController.businessListByOwner);

router.route('/business/count/all')
    .get(businessController.countbusiness);

router.route('/business/count/byuser/:userid')
    .get(businessController.countbusinessByUserId); 


router.route('/business/count/all/:startDate/:endDate')
    .get(businessController.countbusiness);

router.route('/business/count/byuser/:userid/:startDate/:endDate')
    .get(businessController.countbusinessByUserId); 

router.route('/business/add')
    .post(businessController.add);

router.route('/business/:business_id')
    .get(businessController.view)
    .patch(businessController.update)
    .put(businessController.update)
    .delete(businessController.delete);

router.route('/businesswithlocations/:business_id')
    .get(businessController.businessWithLocations) 

// Export API routes : We have to epost this var to access in other files
module.exports = router;