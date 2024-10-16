// app/controllers/user.controller.js
const db = require("../models");
const User = db.user;
const Bootcamp = db.bootcamp;

// Crear y guardar un nuevo usuario (usando req y res)
exports.createUser = async (req, res) => {
    try {
        const userResult = await User.create(req.body); // Usa req.body para obtener datos
        res.status(201).send(userResult); // Enviar respuesta al cliente
    } catch (error) {
        console.log("No se pudo crear el usuario", error);
        res.status(400).send({ message: "Error al crear el usuario" });
    }
};

// Obtener todos los usuarios, incluyendo sus Bootcamps
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Bootcamp, as: "bootcamps" }] // Ajuste para incluir Bootcamps
        });
        res.send(users);
    } catch (error) {
        console.log("No se pudieron obtener los usuarios", error);
        res.status(400).send({ message: "Error al obtener usuarios" });
    }
};

// Obtener un usuario por ID, incluyendo sus Bootcamps
exports.findUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Bootcamp, as: "bootcamps" }]
        });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log("No se pudo obtener el usuario", error);
        res.status(400).send({ message: "Error al obtener el usuario" });
    }
};

// Actualizar un usuario por ID
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (user[0] === 1) {
            res.send({ message: "Usuario actualizado exitosamente" });
        } else {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log("Error al actualizar el usuario", error);
        res.status(400).send({ message: "Error al actualizar el usuario" });
    }
};

// Eliminar un usuario por ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.destroy({
            where: { id: req.params.id }
        });
        if (user === 1) {
            res.send({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log("Error al eliminar el usuario", error);
        res.status(400).send({ message: "Error al eliminar el usuario" });
    }
};
