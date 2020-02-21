
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/user', function (req, res) {
    res.json({
        status: 'User API Its Working',
        message: 'Welcome to Yive project!'
    });
});

// Import contact controller
var userController = require('../controllers/userController');

// Contact routes

// router.route('/user/list')
//     .get(userController.index);

router.route('/user/adminlist')
    .get(userController.getalladmin);

router.route('/user/list/all')
    .get(userController.index)    

router.route('/user/register')
    .post(userController.new);

router.route('/user/authenticate')
    .post(userController.authenticate);


router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route('/user/profile/:user_id')
    .get(userController.profile);

router.route('/user/forgotpassword')
    .post(userController.forgetPassword);




// Export API routes : We have to epost this var to access in other files
module.exports = router;