const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');
const logger = require('./logger');

require('dotenv').config()

const app = express();
const port = process.env.PORT;

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Token untuk otentikasi akses ke REST API
const apiToken = process.env.API_KEY;

// Middleware untuk otentikasi bearer token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === apiToken) {
        next();
    } else {
        res.sendStatus(401);
    }
};

app.use(bodyParser.json());

function transformPhoneNumber(phone_number) {
    if (phone_number.startsWith("08")) {
        phone_number = "62" + phone_number.slice(1);
    }
    phone_number = phone_number.trim().replace(/[^a-zA-Z0-9]/g, '');

    phone_number = phone_number + '@c.us';
    return phone_number; // remove special chars
}

// Endpoint untuk mengakses REST API yang memerlukan otentikasi
app.get('/check', authenticateToken, async (req, res) => {
    let { phone_number } = req.body;
    logger.log(`/check ${phone_number}`);
    try {
        phone_number = transformPhoneNumber(phone_number);
        number_details = await client.isRegisteredUser(phone_number);
        if (number_details) {
            logger.log(`reg ${phone_number}`);
            res.status(200).json({ status: 1 });
        } else {
            logger.log(`unreg ${phone_number}`);
            res.status(200).json({ status: 0 });
        }
    } catch (error) {
        logger.error(error);
        logger.log(`/check ${phone_number}`);
        res.status(400).json({ status: 0 });
    }
});

// Endpoint untuk mengakses REST API yang memerlukan otentikasi
app.post('/message-media', authenticateToken, async (req, res) => {
    let { phone_number, url, message } = req.body;
    logger.log(`/message-media ${phone_number} ${url} ${message}`);
    try {
        phone_number = transformPhoneNumber(phone_number);
        const media = await MessageMedia.fromUrl(url);
        client.sendMessage(phone_number, media, { caption: message })

        res.status(200).json({ status: 1 });
    } catch (error) {
        logger.error(error);
        logger.log(`error /message-media ${phone_number} ${url}`);
        res.status(400).json({ status: 0 });
    }
});

// Endpoint untuk mengakses REST API yang memerlukan otentikasi
app.post('/message', authenticateToken, (req, res) => {
    let { phone_number, message } = req.body;
    logger.log(`/message ${phone_number} ${message}`);
    try {
        phone_number = transformPhoneNumber(phone_number);
        client.sendMessage(phone_number, message)
        res.status(200).json({ status: 1 });
    } catch (error) {
        logger.error(error);
        logger.log(`error /message ${phone_number}`);
        res.status(400).json({ status: 0 });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
