import express from 'express'
import { createTour, deleteTours, getAllTour,getTourById,getTourByUserId, updateTours,searchTour,likeTour,commentTour } from '../Controller/TourController.js'
import CheckLogin from '../middlewares/CheckLogin.js'
const router  = express.Router()

router.post('/createtour',CheckLogin,createTour)
router.get('/getalltour',getAllTour)
router.get('/singletour/:id',getTourById)
router.get('/gettoursbyuserid/:id',CheckLogin, getTourByUserId)
router.put('/updatetour/:id',CheckLogin,updateTours)
router.delete('/deletetour/:id',CheckLogin,deleteTours)
router.get('/search',searchTour)
router.put('/liketour/:id',CheckLogin,likeTour)
router.put('/commenttour/:id',CheckLogin,commentTour)

export default router