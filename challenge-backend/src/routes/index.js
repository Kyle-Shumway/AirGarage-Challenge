import https from "https";

const characterVariations = {
    "4" : "A",
    "A" : "4",
    "0" : "O",
    "O" : "0",
    "1" : "I",
    "I" : "1",
}

async function request(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (response) => {
        let body = [];
        response.on('data', function(chunk) {
            body.push(chunk);
        });
        // resolve on end
        response.on('end', function() {
            try {
                body = JSON.parse(Buffer.concat(body).toString());
            } catch(e) {
                reject(e);
            }
            resolve(body);
        });
    });
    req.end();
});
}
async function getPaidPlates() {
    return ["A43PSW"]; // , "LL3P5W", "677FXC", "NWRJW", "113LER", "847LWP", "EMZ999", "41990", "F009285", "033DKK", "381LPU", "HD0E3N", "6386", "SR3N4S", "18131", "443GTG", "026GVN", "109641", "ZESTO1", "MXF3011", "GEY648", "WEHOOP", "HLM4176", "345DAD", "CZR260", "CYD050", "Z661992", "CSC681", "9LHV73", "T5383", "ECW4004", "BFCC19", "391HSE", "444JSB", "51J117", "DKC9372", "KS556LPT", "778KCM", "DVC8319", "CJA2714", "G551GR", "PC535F", "6NQN084", "8JQV868", "DAY465", "CSK8552", "Q995252", "377XLX", "CTX4197", "CJA6773", "B690467", "CJ90870", "BMD8712", "633717", "EBK9263", "BHP0908", "B660233", "2KZX65", "CFR508", "CL69045", "5SPM201", "DXX0302", "DXX03032", "AFC1284", "HSR7533", "HWPSYD", "CDT1837", "O5Y626", "CBJ0226", "GVXJ18", "1661AV7", "SFF45", "CQV5882", "1661AV7", "JCDV02", "GMWS85", "BKZ4930", "ANMD75", "FJV7301", "GAUW91", "ICZV55", "IGUM5O", "DVEK31", "LAEP87", "CFE5400", "6JQN084", "BTA9458", "BPAE47", "EHLM84", "5ZVN412", "ECH8901", "6VJV248", "IB41NR", "7KCH170", "CQZ5439", "V724UX", "8DAK144", "CHR8154", "8EIZ503", "CVD2564", "CKE5131"]
    // return request('https://storage.googleapis.com/airgarage/paid.json');
}

async function getScannedPlates() {
    return ["443PSW", "I13PSW"]; // ,"LL3P5W", "677FXC", "NWRJW", "1I3LER", "847LWP", "EMZ999", "4199O", "XO301", "FOO9285", "O33DKK", "38ILPU", "HDOE3N", "6386", "SR3N4S", "18131", "443GTG", "026GVN", "1O964I", "ZEST01", "MXF30I1", "GEY648", "WEHO0P", "HLM4176", "345DAD", "CZR26O", "CYD05O", "Z661992", "CSC68I", "ZQZ984", "9LHV73", "T5383", "ECW40O4", "BFCCI9", "39IHSE", "444JSB", "5IJII7", "DKC9372", "KS556LPT", "778KCM", "DVC8319", "CJA27I4", "G55IGR", "PC535F", "6NQNO84", "8JQV868", "DAY465", "LFM412", "CSK8552", "Q995252", "377XLX", "CTX4I97", "CJA6773", "B69O467", "CJ9O870", "BMD8712", "633717", "EBK9263", "BHPO9O8", "ZLF425", "B660233", "2KZX65", "CFR508", "CL69045", "5SPM201", "DXX0302", "DXX03032", "AFC1284", "HSR7533", "HWPSYD", "CDTI837", "O5Y626", "CBJ0226", "GVXJ18", "1661AV7", "SFF45", "CQV5882", "1661AV7", "JCDV02", "GMWS85", "BKZ493O", "NTA582", "ANMD75", "FJV73OI", "GAUW9I", "ICZV55", "1GUM50", "DVEK3I", "LAEP87", "CFE54OO", "6JQNO84", "BTA9458", "BPAE47", "EHLM84", "5ZVN412", "ECH89OI", "6VJV248", "IB4INR", "7KCH170", "CQZ5439", "V724UX", "8DAK144", "CHR8154", "E3R456S", "8EIZ5O3", "CVD2564", "CKE5I3I"]
    // return request('https://storage.googleapis.com/airgarage/scans.json');
}

function removeHighErrorRateCharacters(plate) {
    const plateCharacters = plate.split("")
    return plateCharacters.filter(character => !characterVariations[character]).join();
}

export default function(app){
    app.get('/unpaid', async function(req,res) {
        // get paid plates
        const paidPlates = await getPaidPlates();
        // get scanned plates        
        const scannedPlates = await getScannedPlates();
        const lookupTable = paidPlates.map((plate, i) => {
            return {
                index: i,
                original: plate,
                removed: removeHighErrorRateCharacters(plate)
            }
        })

        const unpaid = scannedPlates.filter((scannedPlate, i) => {
            const removed = removeHighErrorRateCharacters(scannedPlate);
            const found = lookupTable.find((plate) => plate.removed === removed)
            return !found
        })
    
        return res.send(unpaid);
    });
  }
  