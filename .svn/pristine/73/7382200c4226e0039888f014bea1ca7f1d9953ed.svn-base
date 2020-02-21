// Initialize express router
let router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.params.userDetail_id + file.originalname)
  }
});
const upload = multer({ storage: storage });

// Set default API response
router.get('/userinfo', function (req, res) {
    res.json({
        status: 'User Profile API is Working',
        message: 'Welcome to Yive project!'
    });
});


// Import Business controller
var UserProfileControl = require('../controllers/userProfileController');

// Business routes

router.route('/userinfo/list')
    .get(UserProfileControl.index);

router.route('/userinfo/add')
    .post(UserProfileControl.new);

router.route('/userinfo/profile/:userDetail_id')
    .get(UserProfileControl.view)
    .patch(UserProfileControl.update)
    .put(UserProfileControl.update);

router.put('/userinfo/updatePic/:userDetail_id', upload.single('file'), UserProfileControl.update);

    

// Export API routes : We have to epost this var to access in other files
module.exports = router;