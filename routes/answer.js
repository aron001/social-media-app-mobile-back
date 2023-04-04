const express = require('express')
const router = express.Router()
const {
 
  setAnswer,
  updateAnswer,
  deleteAnswer,
  likeAnswer,
  getAnswer
} = require('../controllers/answerController')

const { protect } = require('../middleware/authMiddleware')


router.post('/:id', protect, setAnswer)
router.put('/:id', protect,updateAnswer)
router.delete('/:id',protect,deleteAnswer)
router.put('/:id/like',protect,likeAnswer)
router.get('/getanswer',protect,getAnswer)


module.exports = router