// app/controllers/bootcamp.controller.js
const db = require("../models");
const Bootcamp = db.bootcamp;
const User = db.user;

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).send(bootcamp);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener todos los bootcamps, incluyendo sus usuarios
exports.findAll = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User,
                as: "users"
            }
        });
        res.send(bootcamps);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Obtener un bootcamp por ID, incluyendo sus usuarios
exports.findById = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByPk(req.params.id, {
            include: {
                model: User,
                as: "users"
            }
        });
        if (bootcamp) {
            res.send(bootcamp);
        } else {
            res.status(404).send({ message: "Bootcamp no encontrado" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Agregar un usuario a un bootcamp
exports.addUser = async (req, res) => {
    try {
        const { userId, bootcampId } = req.body;
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        const user = await User.findByPk(userId);
        if (!bootcamp || !user) {
            return res.status(404).send({ message: "Bootcamp o Usuario no encontrado" });
        }
        await bootcamp.addUser(user);
        res.send({ message: "Usuario agregado al Bootcamp exitosamente" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
