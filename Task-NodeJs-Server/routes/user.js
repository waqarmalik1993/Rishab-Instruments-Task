const router = require('express').Router();
const get = require('multer')()
const checkToken = require('../middleware/user_autenticate')
const userController = require('../controllers/user.controller')

router.post('/login', get.any(), userController.login);

// Create a new user
router.post('/add-user', get.any(), checkToken, userController.add_user);

router.get('/get-all-users', get.any(), checkToken, userController.getUser)

//edit movie in favurite list 
router.put('/edit-user/:id', get.any(), checkToken, userController.update_user)

//delete movie in favurite list
router.delete('/delete-user/:id', checkToken, userController.delete_user)

module.exports = router;