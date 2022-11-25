const express=require('express')
const {getProducts, getProduct, addproduct, updateProduct, deleteProduct }= require('../controllers/productcotrollers')

const router=express.Router()


router.get('/', getProducts)
router.get('/:id_product', getProduct)
router.post('', addproduct)
router.get('/:id_product', updateProduct)
router.get('/:id_product', deleteProduct)





module.exports={
    router
}