const { Device } = require("../models/Device");


const deviceController = {
    getAll: async (req, res) => {
        try {
            const devices = await Device.find();
            return res.json(devices);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const device = await Device.findById(id);
            if (device) {
                return res.json(device);
            }
            return res.status(404).json({ message: 'Device not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    create: async (req, res) => {
        try {
            const { name, type, status } = req.body;
            const device = new Device({
                name,
                type,
                status
            });
            await device.save();
            return res.json(device);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, type, status } = req.body;
            const device = await Device.findById(id);
            if (device) {
                device.name = name;
                device.type = type;
                device.status = status;
                await device.save();
                return res.json(device);
            }
            return res.status(404).json({ message: 'Device not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const device = await Device.findById(id);
            if (device) {
                await device.remove();
                return res.json({ message: 'Device deleted' });
            }
            return res.status(404).json({ message: 'Device not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = {
    deviceController
}
