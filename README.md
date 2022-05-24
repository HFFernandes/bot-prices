# bot-prices
A bot to alert you about price oscillations on a given currency pair

## Clone repository

In order to start the project use:

```bash
$ git clone https://github.com/HFFernandes/bot-prices.git
$ cd bot-prices-main
```


## Install dependencies

You'll need to download some node modules defined into `package.json` file.

```
npm install
```

## Run the bot

```
node .\src\bot.js -h

Usage: bot [OPTIONS]...

Options:
  -v, --version           output the version number
  -p, --pairs <value...>  currency pairs
  -o, --percent <value>   oscillation percentage (default: 0)
  -i, --interval <value>  fetch interval (default: 5000)
  -h, --help              display help for command

```
```
node .\src\bot.js -i 5000 -p BTC-USD -o 0.001

Request  : [ { pair: 'BTC-USD', percent: '0.001' } ]
Interval : 5000
```

```
node .\src\bot.js -i 5000 -p BTC-USD:0.02, USD-EUR:0.005 -o 0.001

Request  : [
  { pair: 'BTC-USD', percent: '0.02' },
  { pair: 'USD-EUR', percent: '0.005' }
]
Interval : 5000
```

```
node .\src\bot.js -i 5000 -p BTC-USD:0.02, USD-EUR -o 0.001

Request  : [
  { pair: 'BTC-USD', percent: '0.02' },
  { pair: 'USD-EUR', percent: '0.001' }
]
Interval : 5000
```
