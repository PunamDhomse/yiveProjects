let router = require('express').Router();
var deviceController = require('../controllers/deviceController');

router.route('/device/list/all')
    .get(deviceController.index);

router.route('/device/list/:business_id')
    .get(deviceController.listby);

router.route('/device/get/:id')
    .get(deviceController.deviceData);

router.route('/device/create')
    .post(deviceController.new);

router.route('/device/update/:id')
    .post(deviceController.update);

router.route('/device/delete/:id')
    .get(deviceController.delete);


module.exports = router;