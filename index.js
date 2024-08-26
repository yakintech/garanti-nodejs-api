const express = require('express');
const cors = require('cors');
const { products } = require('./data/products');
const { connect } = require('./db/connect');
const { userRouter } = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');


connect();


const app = express();
app.use(express.json());
app.use(cors());


const tokenKey = 'secret';

//jwt middleware with Bearer schema
const jwtMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, tokenKey, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
       return res.sendStatus(500);
    }
}

app.use(jwtMiddleware);



app.use('/api/users', userRouter);

const port = 3000;



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











app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});