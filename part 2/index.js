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
    // load location data from file 
    const location_data = JSON.parse((await getLocationData(dataFilePath)));
    // build array of functions to execute
    // [
    //     { action: [Function: locate], params: [ 'az' ] },
    //     { action: [Function: find_price_hourly_gt], params: [ '200' ] }
    // ]
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

    // build array of results from commands
    const results = commands.reduce((soFar, command, index) => {
        const locations = soFar.length ? soFar[index - 1] : location_data;
        soFar.push(command.action(...command.params, locations));
        return soFar
    }, [])

    // output last result in array
    console.log('Result', results[results.length-1].map(location => location.name))
}

exec();