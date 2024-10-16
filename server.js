// server.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models"); // Asegúrate de que esta ruta sea correcta
const userRoutes = require("./app/controllers/user.controller");
const bootcampRoutes = require("./app/controllers/bootcamp.controller");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas para usuarios
app.post("/users", userRoutes.createUser);
app.get("/users", userRoutes.findAll);
app.get("/users/:id", userRoutes.findUserById);
app.put("/users/:id", userRoutes.updateUserById);
app.delete("/users/:id", userRoutes.deleteUserById);

// Rutas para bootcamps
app.post("/bootcamps", bootcampRoutes.createBootcamp);
app.get("/bootcamps", bootcampRoutes.findAll);
app.get("/bootcamps/:id", bootcampRoutes.findById);
app.post("/bootcamps/:id/users", bootcampRoutes.addUser);

// Sincronizar modelos con la base de datos y ejecutar el servidor
db.sequelize.sync({ alter: true }) // Cambiar a { alter: true } en producción
    .then(async () => {
        // Mostrar todos los usuarios en la base de datos
        const allUsers = await db.user.findAll();
        console.log("Usuarios en la base de datos:", JSON.stringify(allUsers, null, 4));

        // Mostrar todos los bootcamps en la base de datos
        const allBootcamps = await db.bootcamp.findAll();
        console.log("Bootcamps en la base de datos:", JSON.stringify(allBootcamps, null, 4));

        // Mostrar usuarios con sus bootcamps asociados
        const usersWithBootcamps = await db.user.findAll({
            include: [{ model: db.bootcamp, as: "bootcamps" }]
        });
        console.log("Usuarios con sus bootcamps:", JSON.stringify(usersWithBootcamps, null, 4));

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error al sincronizar la base de datos:", error);
    });
