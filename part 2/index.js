import { readFileSync } from "fs";

async function getLocationData(dataFilePath) {
    return readFileSync(`./${dataFilePath}`);
}

function locate(state_code, location) {
    return location.filter((location) => location.address.state === state_code.toUpperCase())
}

function find_price_hourly_lte(price, location) {
    return location.filter((location) => location.price_hourly <= price)
}

function find_price_hourly_gt(price, location) {
    return location.filter((location) => location.price_hourly > price)
}

function find_price_hourly_between(price_min, price_max, location) {
    return location.filter((location) => location.price_hourly > price_min && location.price_hourly < price_max)
}

const utilities = {
    locate,
    find_price_hourly_lte,
    find_price_hourly_gt,
    find_price_hourly_between
}

async function exec() {
    const [first, second, dataFilePath, ...params] = process.argv;

    const location_data = JSON.parse((await getLocationData(dataFilePath)));
    const commands = params.reduce((soFar, current, index) => {
        if (utilities[current]) {
            soFar.push({
                action: utilities[current],
                params: []
            })
        } else {
            soFar[soFar.length - 1].params.push(current)
        }
        return soFar
    }, [])

    const result = commands.reduce((soFar, command, index) => {
        const locations = soFar.length ? soFar[index - 1] : location_data;
        soFar.push(command.action(...command.params, locations));
        return soFar
    }, [])

    console.log('Result', result[result.length-1].map(location => location.name))
}

exec();