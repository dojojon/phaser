const fs = require('fs');
const path = require('path');

console.log('**********************************');
console.log('*                                *');
console.log('*  Map Wall To                   *');
console.log('*                                *');
console.log('**********************************');
console.log('');

let mapFilePath = '../full/assets/game_map.json';

if (process.argv[2]) {
    mapFilePath = process.argv[2];
}

console.log('Processing Map:', mapFilePath);
console.log('');


function readMapFile(mapFilePath) {
    return new Promise((resolve, reject) => {

        fs.readFile(mapFilePath, (err, data) => {

            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }

        });

    });
}

function writeMap(mapObjecy, sourceFilePath) {

    const dumpFilePath = path.join(path.dirname(sourceFilePath), 'processed_' + path.basename(sourceFilePath));
    return new Promise((resolve, reject) => {

        fs.writeFile(dumpFilePath, JSON.stringify(mapObjecy), (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Saved', dumpFilePath);
                resolve();
            }
        });

    });
}

function processMapWalls(mapObject) {
    console.log('Processing map');
    return new Promise((resolve, reject) => {

        const mineLayer = mapObject.layers.find((l) => l.name === 'Mine');
        if (!mineLayer) {
            reject('Could not find mine layer');




        } else {

            const width = mineLayer.width;
            const height = mineLayer.height;

            for (let r = 0; r < height - 1; r++) {
                console.log('Row', r);
                const rowIndexStart = r * width;

                // console.log(mineLayer.data.slice(rowIndexStart, rowIndexStart+ width).join(':'));

                for (let c = 1; c < width; c++) {
                    const currentCellIndex = rowIndexStart + c;
                    const currentCell = mineLayer.data[currentCellIndex];

                    /** top wall */
                    if (currentCell === 0 && mineLayer.data[currentCellIndex + width] === 15) {
                        mineLayer.data[currentCellIndex] = 1;
                    }
                    /** bottom wall */
                    if (currentCell === 15 && mineLayer.data[currentCellIndex + width] === 0) {
                        mineLayer.data[currentCellIndex + width] = 1;
                    }
                    /** left wall */
                    if (currentCell === 0 && mineLayer.data[currentCellIndex + 1] === 15) {
                        mineLayer.data[currentCellIndex] = 2;
                    }
                    /** right wall */
                    if (currentCell === 0 && mineLayer.data[currentCellIndex - 1] === 15) {
                        mineLayer.data[currentCellIndex] = 2;
                    }
                }

            }

            for (let r = 1; r < height - 1; r++) {
                console.log('Row', r);
                const rowIndexStart = r * width;


                for (let c = 1; c < width; c++) {

                    const currentCellIndex = rowIndexStart + c;
                    const currentCell = mineLayer.data[currentCellIndex];

                    if (currentCell === 0 && mineLayer.data[currentCellIndex + width] === 2) {
                        console.log('top corner');
                        mineLayer.data[currentCellIndex] = 4;

                    }

                    if (currentCell === 0 && mineLayer.data[currentCellIndex - width] === 2) {
                        console.log('bottom corner');
                        mineLayer.data[currentCellIndex] = 3;
                    }

                    if (currentCell === 2 
                        && mineLayer.data[currentCellIndex - width] === 2
                        && mineLayer.data[currentCellIndex + width] === 15) {
                        mineLayer.data[currentCellIndex] = 3;
                    }

                    if (currentCell === 1 
                        && mineLayer.data[currentCellIndex + width] === 2) {
                        mineLayer.data[currentCellIndex] = 4;
                    }

                    
                }
            }

            resolve(mapObject);
        }

    });
}



readMapFile(mapFilePath)
    .then((d) => processMapWalls(d))
    .then((d) => writeMap(d, mapFilePath))
    .catch((e) => console.error('Error:', e));