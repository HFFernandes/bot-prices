const axios = require('axios');
const timestamp = require('time-stamp');

//Services
const oscillationService = require('./services/oscillationService.js');
const program = require("./utils/arguments")

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
                oscillationService.processRequest(oldRate, newRate);
                mapping.set(pair, newRate);
            } else {
                mapping.set(pair, data);
            }
        })
        .catch((error) => console.error(error));
};

const data = program.data;
const interval = program.interval;

async function StartBot() {
    data.forEach(async record => {
        getTicker(record)
    })
    setTimeout(StartBot, interval);
}
StartBot();
