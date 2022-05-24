
async function processRequest(current, next) {

    const changes = await getPercentChange(current.data.bid, next.data.bid)

    const percent = (current.percent / 100)
    const direction = await getPriceDirection(changes, percent)
    var re = {
        "current": current,
        "next": next,
        "oscillation": changes,
        "alert": percent,
        "direction": direction,
    }
    console.log(re);
}

async function getPercentChange(originValue, newValue) {
    const current = parseFloat(originValue)
    const next = parseFloat(newValue)
    return ((next - current) / current)
}

async function getPriceDirection(changes, limit) {
    const negative = changes < 0;
    let direction = "NaN"
    if (Math.abs(changes) > limit) {
        if (negative) {
            direction = "down";
        } else {
            direction = "up";
        }
    }
    return direction
}

module.exports = {
    processRequest,
    getPercentChange,
    getPriceDirection,
};