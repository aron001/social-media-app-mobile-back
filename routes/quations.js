const express = require('express')
const router = express.Router()
const {
 
    setQuation,
    updateQuation,
    deleteQuation,
    fetchallQuation,
    countallquations,
    admindeleteQuation
} = require('../controllers/quationController')

const { protect,isAdmin } = require('../middleware/authMiddleware')


router.post('/', protect, setQuation)
router.put('/:id', protect,updateQuation)
router.delete('/:id',protect,deleteQuation)
router.get('/fetchallquations',fetchallQuation)
router.get('/countallquations',protect,isAdmin,countallquations)
router.delete('/delete/:id',protect,isAdmin,admindeleteQuation)
module.exports = router