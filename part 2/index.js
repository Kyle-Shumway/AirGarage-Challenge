import { readFileSync } from "fs";

async function getLocationData(dataFilePath) {
    return readFileSync(`./${dataFilePath}`);
}

function locate(state_code, location) {
    return location.filter((location) => location.address.state === state_code.toUpperCase()).map(location => location.name)
}

function find_price_hourly_lte(price, location) {
    return location.filter((location) => location.price_hourly <= price).map(location => location.name)
}

function find_price_hourly_gt(price, location) {
    return location.filter((location) => location.price_hourly > price).map(location => location.name)
}

function find_price_hourly_between(price_min, price_max, location) {
    return location.filter((location) => location.price_hourly > price_min && location.price_hourly < price_max).map(location => location.name)
}

async function exec() {
    const [first, second, dataFilePath, action, ...params] = process.argv;

    const location_data = JSON.parse((await getLocationData(dataFilePath)));
    console.log('params', params)
    switch (action) {
        case 'locate':
            console.log(locate(params[0], location_data));
            break;
        case 'find_price_hourly_lte':
            console.log(find_price_hourly_lte(parseInt(params[0]), location_data));
            break;
        case 'find_price_hourly_gt':
            console.log(find_price_hourly_gt(parseInt(params[0]), location_data));
            break;
        case 'find_price_hourly_between':
            console.log(find_price_hourly_between(parseInt(params[0]), parseInt(params[1]), location_data));
            break;
        default:
            console.log('available commands are: locate, find_price_hourly_lte, find_price_hourly_gt, find_price_hourly_between')
    }
}

exec();