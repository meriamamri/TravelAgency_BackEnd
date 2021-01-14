var express = require ('express')
var router = express.Router();
const rateDiscountController = require('../controllers/rateDiscount.controller')

router.post('/add', rateDiscountController.AddDiscount);
router.post('/addAd', rateDiscountController.AddDiscountAd);
router.post('/addCh', rateDiscountController.AddDiscountCh);
router.put('/update/:id', rateDiscountController.AddDiscount);
router.put('/updateAd/:id', rateDiscountController.UpdateDiscountAd);
router.put('/updateCh/:id', rateDiscountController.UpdateDiscountCh);
router.get('/getAd/:id', rateDiscountController.getDiscountAd);
router.get('/getCh/:id', rateDiscountController.getDiscountCh);
router.get('/Ad/:id', rateDiscountController.findAllDiscountAd);
router.get('/Ch/:id', rateDiscountController.findAllDiscountCh);
router.delete('/Ad/:id', rateDiscountController.deleteAd);
router.delete('/Ch/:id', rateDiscountController.deleteCh);
module.exports=router