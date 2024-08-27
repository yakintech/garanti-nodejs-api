const express = require('express');
const cors = require('cors');
const { products } = require('./data/products');
const { connect } = require('./db/connect');
const { userRouter } = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { deviceRouter } = require('./routes/deviceRoutes');

const port = 3000;

connect();


const app = express();
app.use(express.json());
app.use(cors());


const tokenKey = 'secret';

//jwt middleware with Bearer schema
const jwtMiddleware = (req, res, next) => {

    //api/login endpointi için token kontrolü yapılmamalı
    if (req.path === '/api/login') {
        return next();
    }

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

// app.use(jwtMiddleware);



app.use('/api/users', userRouter);
app.use('/api/devices', deviceRouter);


//token vermesi için login endpointi oluşturuldu
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username }, tokenKey);
        return res.json({ token });
    }
    return res.sendStatus(401);
});

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/api/products', upload.single('image'), (req, res) => {
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
            description,
            image: req.file.filename // Save the filename of the uploaded image
        };

        product.id = products.length + 1;
        products.push(product);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
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