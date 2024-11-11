const router = require('express').Router();
const userController = require('./controllers/user');


router.post('/register', userController.create);
router.delete('/delete', userController.deleteOne);
router.get('/me', userController.profile);
router.get('/all', userController.getAll);

module.exports = router;
