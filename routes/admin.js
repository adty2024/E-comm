const exValidator = require('express-validator');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
//request travels from left to right
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post('/add-product', 
    [
        exValidator.body('title')
            .isString()
            .isLength({min: 3})
            .trim(),

        exValidator.body('imageUrl'),

        exValidator.body('price')
            .isFloat(),
        
        exValidator.body('description')
            .isLength({min: 5, max: 400})
            .trim()

    ],
    isAuth,
    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', 
[
    exValidator.body('title')
        .isString()
        .isLength({min: 3})
        .trim(),

    exValidator.body('imageUrl'),

    exValidator.body('price')
        .isFloat(),
    
    exValidator.body('description')
        .isLength({min: 5, max: 400})
        .trim()

],
isAuth,
adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
