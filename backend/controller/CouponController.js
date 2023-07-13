const Coupon = require('./CouponModel')

const createCoupon = async (req, res) => {
    const {code, discountAmount, availability, date_expiry} = req.body;
    const date_create = Date.now();
    const coupon = new Coupon({
        code, discountAmount, availability, date_create, date_expiry,
    });
    try {
        await coupon.save();
        res.status(201).send('Coupon added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add coupon');
    }
};

const validateCoupon = async (req, res) => {
    const { code } = req.params;
    try {
        // Find the coupon in the database
        const coupon = await Coupon.findOneAndUpdate(
            { code: code },
            { $inc: { availability: -1 } },
            { new: true }
        );
        if (!coupon) {
            return res.status(404).json({ message: 'Invalid coupon code' });
        }

        if (coupon.availability <= 0) {
            await Coupon.findOneAndDelete({ code: coupon.code });
            return res.status(404).json({ message: 'Coupon telah mencapai batas penukaran' });
        }

        const currentDate = new Date();
        if (currentDate > coupon.date_expiry) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }

        const { discountAmount } = coupon;
        res.status(200).json({ message: `Kamu mendapatkan diskon sebesar ${discountAmount}%` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {createCoupon, validateCoupon}