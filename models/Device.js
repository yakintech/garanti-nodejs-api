const { default: mongoose } = require("mongoose");


const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true
    });

const Device = mongoose.model('Device', DeviceSchema);

module.exports = {
    Device
}