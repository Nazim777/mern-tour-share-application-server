import express from 'express'
const router = express.Router()
import {getSingleUser, registerUser,userLogin} from '../Controller/AuthController.js'
import CheckLogin from '../middlewares/CheckLogin.js'
router.post('/register',registerUser)
router.post('/login',userLogin),
router.get('/singleuser/:id',CheckLogin, getSingleUser)

export default router