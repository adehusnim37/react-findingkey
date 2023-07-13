const products = require('./ProductModel')

const getAllProducts = async (req, res) => {
    const product = await products.find({})
    try {
        if (!product) {
            return res.status(404).json({message: 'Kosong deh db nya'})
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Koneksi database tidak bisa di sambungkan');
    }
};

const addProducts = async (req, res) => {
    const {nameProduct, description, price} = req.body;
    const dateCreate = new Date(); // Current timestamp

    const newProduct = new products({
        nameProduct, description, price, dateCreate
    });

    try {
        await newProduct.save();
        res.status(201).send('Product added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Koneksi database tidak bisa di sambungkan');
    }
};

module.exports = {addProducts, getAllProducts}