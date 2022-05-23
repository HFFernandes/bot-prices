const axios = require('axios');
const timestamp = require('time-stamp');

const processRequest = require('./services/oscillationService.js');

const mapping = new Map();

async function getTicker(data) {
    const percent = data.percent;
    const pair = data.pair;
    axios
        .get(`https://api.uphold.com/v0/ticker/${pair}`)
        .then((response) => {
            const data = { "pair": pair, "percent": percent, "data": response.data, "timestamp": timestamp.utc('YYYYMMDDmmssms') };
            if (mapping.has(pair)) {
                let oldRate = mapping.get(pair);
                let newRate = data;
                processRequest(oldRate, newRate);
                mapping.set(pair, newRate);
            } else {
                mapping.set(pair, data);
            }
        })
        .catch((error) => console.error(error));
};

const timeout = 5000;

const data = [
    { "pair": "BTC-USD", "percent": 0.0001 },
    //{ "pair": "EUR-USD", "percent": 0.0001 },
]

async function StartBot() {
    data.forEach(async record => {
        getTicker(record)
    })
    setTimeout(StartBot, timeout);
}
StartBot();

