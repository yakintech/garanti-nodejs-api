const { User } = require("../models/User");
const { createUserSchema } = require("../validations/userValidations");




const userController = {
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const total = await User.countDocuments();
            const users = await User.find().skip(startIndex).limit(limit);

            const pagination = {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            };

            if (endIndex < total) {
                pagination.nextPage = page + 1;
            }

            if (startIndex > 0) {
                pagination.previousPage = page - 1;
            }

            return res.json({ users, pagination });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async getOne(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (user) {
                return res.json(user);
            }
            return res.status(404).json({ message: 'User not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async create(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;
            const { error } = createUserSchema.validate({ email, password, firstName, lastName });
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const user = new User({
                email,
                password,
                firstName,
                lastName
            });
            await user.save();
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const { email, password, firstName, lastName } = req.body;
            const user = await User.findById(id);
            if (user) {
                user.email = email;
                user.password = password;
                user.firstName = firstName;
                user.lastName = lastName;
                await user.save();
                return res.json(user);
            }
            return res.status(404).json({ message: 'User not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (user) {
                await user.remove();
                return res.json({ message: 'User deleted' });
            }
            return res.status(404).json({ message: 'User not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = {
    userController
}