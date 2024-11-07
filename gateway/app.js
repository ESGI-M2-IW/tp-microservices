const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3300;

app.use(express.json());

// Middleware pour ajouter des headers ou de l'authentification
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/users', async (req, res) => {
    try {
        console.log(process.env.API_KEY_USERS);

        const url = `${process.env.HOST_USERS}/api/users${req.path === "/" ? "" : req.path}`;
        console.log(url);

        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: `Authorization: Api-Key ${process.env.API_KEY_USERS}`
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

app.use('/cuisine', async (req, res) => {
    try {
        const url = `${process.env.HOST_CUISINE}/api${req.path === "/" ? "" : req.path}`;
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: `x-api-key : ${process.env.API_KEY_CUISINE}`
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

app.use('/deliveries', async (req, res) => {
    try {
        const url = `${process.env.HOST_DELIVERIES}/api/deliveries${req.path === "/" ? "" : req.path}`;
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: `x-api-key : ${process.env.API_KEY_DELIVERIES}`
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

app.use('/orders', async (req, res) => {
    try {
        const url = `${process.env.HOST_ORDERS}/api/orders${req.path === "/" ? "" : req.path}`;
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: `x-api-key : ${process.env.API_KEY_ORDERS}`
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

axios.defaults.timeout = 5000; // Timeout de 5 secondes

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});