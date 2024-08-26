const express = require('express');
const cors = require('cors');
const { products } = require('./data/products');
const { User } = require('./models/User');
const { connect } = require('./db/connect');

connect();


const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/products', (req, res) => {
   return res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id == id);
    if (product) {
        return res.json(product);
    }
    return res.status(404).json({ message: 'Product not found' });
}
)

app.post('/api/products', (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        if (typeof price !== 'number') {
            return res.status(400).json({ message: 'Price must be a number' });
        }

        if (name.length < 3) {
            return res.status(400).json({ message: 'Name must be at least 3 characters' });
        }

        const product = {
            name,
            price,
            description
        };

        product.id = products.length + 1;
        products.push(product);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
)

app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, description } = req.body;
    const product = products.find(product => product.id == id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        return res.json(product);
    }
    return res.status(404).json({ message: 'Product not found' });
}
)

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const index = products.findIndex(product => product.id == id);
    if (index !== -1) {
        products.splice(index, 1);
        return res.json({ message: 'Product deleted' });
    }
    return res.status(404).json({ message: 'Product not found' });
}
)



// User routes with try catch - GET, POST, PUT, DELETE
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/api/users', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Password policy
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit' });
        }

        const user = new User({ email, password });
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { email, password } = req.body;
        const user = await User.findById(id);
        if (user) {
            user.email = email;
            user.password = password;
            await user.save();
            return res.json(user);
        }
        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
)

app.delete('/api/users/:id', async (req, res) => {
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
)






app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});