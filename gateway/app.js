const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware pour ajouter des headers ou de l'authentification si besoin
app.use((req, res, next) => {
    // Par exemple, pour les CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/users', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:8000${req.path}`, // Remplace `port` par celui de srv_users
            data: req.body,
            headers: "Authorization: ospe2aPr.tp6ykrCek0TX6269tDP6AdSQjAowxohP" // Ajoute l'authentification si besoin
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

app.use('/cuisine', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:3100${req.path}`, // Remplace `port` par celui de srv_cuisine
            data: req.body
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});

app.use('/deliveries', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:3000${req.path}`, // Remplace `port` par celui de srv_cuisine
            data: req.body,
            headers: "x-api-key : m7Bb6lmhcsbwAQPLoSXyfNyYUslQMlMuAq2Vh3eNidpfuqaBhVRFTlLeDBJ86nbQzQ5EpTdudaOkIbjMx3jwytCwcgnwPaYyypiYx1BhsO37s0yoKNuen2Hz1jcuPiz5ZApQHSVPFwEbv9DeWDB2AbjwfOP7EI3k7tXDv9GUweK7NKONL1o12sF0lWTN6Pj4PVsf6tU5g8K5h6Tu1WUQUTpQr5nDe8AStEar53zWPXUxsYF5WTT8q4sgKS5NFhVm"
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
});