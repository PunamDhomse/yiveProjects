let router = require('express').Router();
var photoController = require('../controllers/memberPhotoController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + file.originalname)
    }
});
const upload = multer({ storage: storage });

// router.route('/device/list/all')
//     .get(deviceController.index);

// router.route('/device/list/:business_id')
//     .get(deviceController.listby);

// router.route('/device/get/:id')
//     .get(deviceController.deviceData);

router.post('/photo/create/:id', upload.single('file'), photoController.new);
router.put('/photo/:id', upload.single('file'), photoController.updatePhoto);
router.get('/photo/:id', photoController.getPhotos);

// router.route('/device/update/:id')
//     .post(deviceController.update);

// router.route('/device/delete/:id')
//     .get(deviceController.delete);


module.exports = router;