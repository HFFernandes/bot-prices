const axios = require('axios');
const timestamp = require('time-stamp');

const program = require("./utils/arguments")
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

const percent = program.options.interval;
const pairs = program.options.pairs;
const timeout = program.options.interval;

var data = []
pairs.forEach(element => {
    if (element.includes(':')) {
        const rateLimit = element.split(":");
        const ob = { "pair": rateLimit[0], "percent": rateLimit[1] }
        data.push(ob)
    } else {
        const ob = { "pair": element, "percent": percent }
        data.push(ob)
    }
});

async function StartBot() {
    data.forEach(async record => {
        getTicker(record)
    })
    setTimeout(StartBot, timeout);
}
StartBot();

