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
    return request('https://storage.googleapis.com/airgarage/paid.json');
}

async function getScannedPlates() {
    return request('https://storage.googleapis.com/airgarage/scans.json');
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
            return !!!found
        })
    
        return res.send(unpaid);
    });
  }
  