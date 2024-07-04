require('dotenv').config();
const axios = require('axios');

const sendNotification = async (playerId, title, message) => {
    try {
        const response = await axios.post('https://onesignal.com/api/v1/notifications', {
            app_id: process.env.ONESIGNAL_APP_ID,
            include_player_ids: [playerId],
            headings: { en: title },
            contents: { en: message }
        }, {
            headers: {
                'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`
            }
        });

        console.log('Notification sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};

module.exports = { sendNotification };
