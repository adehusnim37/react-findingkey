const User = require('./userModel');
const {v4: uuidv4} = require('uuid');

// Get all users
const getAllUsers = async (req, res) => {
    await User.find({})
        .limit(1000)
        .exec()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
};


const findOneUser = async (req, res) => {
    const {name} = req.params;
    try {
        const user = await User.findOne({name: name}); // Update this line
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

// Add a new user

const addUser = async (req, res) => {
    const {name, address, phone} = req.body;
    const serial_number = uuidv4(); // Generate unique serial number
    const validation_key = uuidv4(); // Generate unique validation key
    const buying_date = new Date(); // Current timestamp

    const newUser = new User({
        name, address, phone, serial_number, validation_key, buying_date,
    });

    try {
        await newUser.save();
        res.status(201).send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

const findKey = async (req, res) => {
    const { serial_number, validation_key } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            { serial_number, validation_key },
            { $inc: { Activacted: 1 } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Serial Key dan Validation Key tidak valid' });
        }
        if (user.Activacted > 10) {
            // Delete the validation key
            user.validation_key = 0;
            await user.save();
            return res.status(404).json({ message: 'Hubungi kami lisensi anda telah melebihi aktivasi dari kami' });
        }
        if (user.Activacted > 9) {
            return res.status(403).json({ message: 'Lisensi anda tersisa 1x Aktivasi, hubungi kami sebelum anda terblokir lisensi' });
        }
        res.status(200).json({ message: `Serial Key dan Validation Key valid, Perlu diingat sisa aktivasi anda adalah ${10 - user.Activacted}x`, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server sedang mengalami masalah' });
    }
};

const BuyVkey = async (req,res) =>{
    const { serial_number } = req.params;
    try {
        const buyVkey = await User.findOneAndUpdate(
            { serial_number : serial_number },
            { Activacted: -10 , validation_key: uuidv4() },
            { new: true }
        );
        if (!buyVkey) {
            return res.status(404).json({ message: 'Serial Key tidak valid' });
        }
        await res.status(200).json({ message: 'Validation Key valid telah tergenerate', buyVkey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server sedang mengalami masalah' });
    }
}

const freeVkey = async (req, res) => {
    const { validation_key } = req.params;
    try {
        const free_va_key = await User.findOne({ validation_key: validation_key });
        if (!free_va_key) {
            return res.status(404).json({ message: 'Validasi Key tidak valid' });
        } else if (free_va_key.Activacted === 0) {
            return res.status(200).json({ message: 'Aktivasi anda masih tersisa 10X' });
        } else if (free_va_key.Activacted >= 10) {
            return res.status(404).json({ message: 'Serial Validation Key anda melebihi batas aktivasi' });
        }
        free_va_key.Activacted -= 1;
        await free_va_key.save();
        res.status(200).json({ message: `Aktivasi anda telah berkurang -1, menjadi ${free_va_key.Activacted}X.`, free_va_key });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server sedang mengalami masalah' });
    }
};





module.exports = {
    getAllUsers, findOneUser, addUser, findKey, BuyVkey, freeVkey
}
