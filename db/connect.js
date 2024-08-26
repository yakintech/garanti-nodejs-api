const { default: mongoose } = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://user_turkcell:kVICxra2OoSXm9y5@cluster0.jcus0vv.mongodb.net/garantidb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database');
        console.log(error);
    }
}

module.exports = {
    connect
}