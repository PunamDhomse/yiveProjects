let router = require('express').Router();

router.use('/', require('./userRoutes'));
router.use('/', require('./businessRoutes'));
router.use('/', require('./userProfileRoutes'));
router.use('/', require('./businessLocationRoutes'));
router.use('/', require('./customerRoutes'));
router.use('/', require('./countryRegionRoutes'));
router.use('/', require('./visitorRoutes'));
router.use('/', require('./reportsRoutes'));
router.use('/', require('./locationManagerRoutes'));
router.use('/', require('./businessMngRoutes'));
router.use('/', require('./deviceRoutes'));
router.use('/', require('./memberPhotoRoutes'));
module.exports = router;