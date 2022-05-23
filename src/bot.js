const axios = require('axios');
const timestamp = require('time-stamp');

const processRequest = require('./services/oscillationService.js');

const mapping = new Map();

async function getTicker(pair) {
    axios
        .get(`https://api.uphold.com/v0/ticker/${pair}`)
        .then((response) => {
            const data = { "pair": pair, "data": response.data, "timestamp": timestamp.utc('YYYYMMDDmmssms') };
            if (mapping.has(pair)) {
                let oldRate = mapping.get(pair);
                let newRate = data;
                processRequest(oldRate, newRate);
            } else {
                mapping.set(pair, data);
            }
        })
        .catch((error) => console.error(error));
};

const url = "BTC-USD"
async function StartBot() {
    getTicker(url)
    setTimeout(StartBot, 5000);
}
StartBot();

