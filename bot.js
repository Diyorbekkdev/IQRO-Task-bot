const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '6680654517:AAHfwg_Jgmzv6nDQT4AY2FE9uV6DvATstC0';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hi, I am created by Diyorbek Jurev. If you wirte the message from this website https://iqro-company-task.vercel.app/, this message will be sent to the grop!');
});

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const newMember = msg.new_chat_members[0];
    if (newMember.username === botUsername) {
        bot.sendMessage(chatId, msg.text);
    }
});

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    const chatId = '-1001902080596'; 

    const message = `
        Application Data from new:
        Name: ${formData.name}
        Phone Number: ${formData.phoneNumber}
        User Message: ${formData.interestedService}
    `;




    bot.sendMessage(chatId, message)
        .then(() => {
            console.log('Form data sent to Telegram bot successfully');
        })
        .catch((error) => {
            console.error('Error sending form data to Telegram bot:', error);
        });

    res.send('Form submitted successfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
