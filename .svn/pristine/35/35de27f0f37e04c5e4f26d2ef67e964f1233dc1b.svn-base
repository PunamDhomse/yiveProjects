
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/country', function (req, res) {
    res.json({
        status: 'Country API Its Working',
        message: 'Welcome to Yive project!'
    });
});

// Import country controller
var countryController = require('../controllers/countryController');
// Import region controller
var regionController = require('../controllers/regionController');
// country routes

router.route('/country/list')
    .get(countryController.index);

router.route('/country/add/')
    .post(countryController.new);

router.route('/country/regions/:countryId/')
    .get(countryController.regions);

router.route('/region/add/')
    .post(regionController.add);

// Export API routes : We have to epost this var to access in other files
module.exports = router;