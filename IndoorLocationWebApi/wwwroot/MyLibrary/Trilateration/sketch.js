

let filterR1 = [];
let filterR2 = [];
let filterR3 = [];
let filterRSSI1 = [];
let filterRSSI2 = [];
let filterRSSI3 = [];
let beacons = [];
let b1, b2, b3;
let _r1, _r2, _r3;
let _x;
let _y;

let raArr = [];
let rbArr = [];
let rcArr = [];
/**
 * Setup program
 */


function setup() {
    createCanvas(480, 420)
    textSize(10)

    b1 = new Beacon('b1', createVector(10, 10), [255, 250, 0])
    b2 = new Beacon('b2', createVector(width - 10, 10), [255, 71, 239])
    b3 = new Beacon('b3', createVector(240, height - 10), [109, 3, 100])
    b4 = new Beacon('b4', createVector(_x, _y), [80, 3, 100])

    beacons.push(b1)
    beacons.push(b2)
    beacons.push(b3)

    $("#show").click(function () {
        setInterval(function () { getBeacon1RSSI(), getBeacon2RSSI(), getBeacon3RSSI() }, 1000);
    });


}


function canvasSetting() {
    background(255)
    push()
    strokeWeight(5)
    rect(0, 0, width, height)
    pop()
}

function showBeacon() {
    // Draw mouse position
    push()
    noStroke()
    fill([35, 97, 255])
    ellipse(mouseX, mouseY, 20)
    pop()
}
function showBeacon1(x, y) {
    // Draw mouse position
    push()
    noStroke()
    fill([35, 97, 255])
    ellipse(x, y, 20)
    pop()
}
/**
* This will loop for ever
//*/

function draw() {

    canvasSetting();
    // showBeacon();
    let pos = getTrilateration(b1.pos, b2.pos, b3.pos, _r3, _r2, _r1)

    stroke(1)
    text("Real Pos = " + nfc(mouseX, 1) + ", " + nfc(mouseY, 1), pos.x + 20, pos.y + 15)
    text("Calc Pos = " + nfc(pos.x, 1) + ", " + nfc(pos.y, 1), pos.x + 20, pos.y - 5)
}




function getBeacon1RSSI() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Gateway/Gateway1',
        success: function (data) {
            let beacon1 = JSON.parse(data);
            if (beacon1.RSSI != 0 && beacon1.RSSI > -70) {
                //_r1 = parseInt(Math.abs(distanceCalculation(beacon1.RSSI)), 10);
                if (filterRSSI1.length > 20) {
                    filterRSSI1 = []
                }
                if (filterR1.length > 20) {
                    filterR1 = []
                }
         
                filterRSSI1.push(beacon1.RSSI)
                let rssii1 = (filterRSSI1[filterRSSI1.length - 1] - filterRSSI1[filterRSSI1.length - 2]);
                //debugger;
                if ((Math.abs(rssii1) < 3) && filterRSSI1.length > 4) {
                    //filterRSSI1.push(parseInt(filterRSSI1[filterRSSI1.length - 2], 10));
                    filterRSSI1 = filterRSSI1.slice(0, filterRSSI1.length - 1)
                    //debugger;


                }
                filterR1.push(parseInt(Math.abs(distanceCalculation(controlOfFilterArray(filterRSSI1))), 10));
                _r1 = controlOfFilterArray(filterR1)
                // filterRSSI1.push(beacon1.RSSI)


            }

        },
        error: function (errorThrown) {

        }
    });
}

function getBeacon2RSSI() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Gateway/Gateway2',
        success: function (data) {
            let beacon2 = JSON.parse(data);
            if (beacon2.RSSI != 0 && beacon2.RSSI > -70) {
                //_r2 = parseInt(Math.abs(distanceCalculation(beacon2.RSSI)), 10);
                if (filterRSSI2.length > 20) {
                    filterRSSI2 = []
                }
                if (filterR2.length > 20) {
                    filterR2 = []
                }
                //clearArray(filterRSSI2);
                //clearArray(filterR2)
                filterRSSI2.push(beacon2.RSSI)
                let rssii2 = (filterRSSI2[filterRSSI2.length - 1] - filterRSSI2[filterRSSI2.length - 2]);
                //debugger;
                if ((Math.abs(rssii2) < 3) && filterRSSI2.length > 4) {
                    //filterRSSI2.push(parseInt(filterRSSI2[filterRSSI2.length - 2], 10)); 
                    filterRSSI2 = filterRSSI2.slice(0, filterRSSI2.length - 1)
                    // debugger;                

                }
                filterR2.push(parseInt(Math.abs(distanceCalculation(controlOfFilterArray(filterRSSI2))), 10));
                _r2 = controlOfFilterArray(filterR2)
                // filterRSSI2.push(beacon2.RSSI)


            }

        },
        error: function (errorThrown) {

        }
    });
}

function getBeacon3RSSI() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Gateway/Gateway3',
        success: function (data) {
            let beacon3 = JSON.parse(data);

            if (beacon3.RSSI != 0 && beacon3.RSSI > -70) {
                //_r3 = parseInt(Math.abs(distanceCalculation(beacon3.RSSI)), 10);
                if (filterRSSI3.length > 20) {
                    filterRSSI3 = [];
                }
                if (filterR3.length > 20) {
                    filterR3 = []
                }
                //clearArray(filterRSSI3);
                //clearArray(filterR3)
                filterRSSI3.push(beacon3.RSSI)
                let rssii3 = (filterRSSI3[filterRSSI3.length - 1] - filterRSSI3[filterRSSI3.length - 2])
                // debugger;
                if ((Math.abs(rssii3) < 3) && filterRSSI3.length > 4) {
                    //filterRSSI3.push(parseInt(filterRSSI3[filterRSSI3.length - 2], 10));
                    filterRSSI3 = filterRSSI3.slice(0, filterRSSI3.length - 1)
                    //debugger;
                }
                //debugger;

                filterR3.push(parseInt(Math.abs(distanceCalculation(controlOfFilterArray(filterRSSI3))), 10));
                _r3 = controlOfFilterArray(filterR3)

            }


        },
        error: function (errorThrown) {

        }
    });
}


function getFilteredData(filterData) {

    var { KalmanFilter } = kalmanFilter;
    const kFilter = new KalmanFilter();

    const res = kFilter.filterAll(filterData)
    let data = parseInt(res[filterData.length - 1], 10);
    //debugger;
    return data;

}


function controlOfFilterArray(filterArray) {
    let rfilter = getFilteredData(filterArray);
    return rfilter;
}
/**
 * Calculate distance between two points. 
 * Function dist() in p5.js does the same thing.
 * @param x1 - x of point 1
 * @param y1 - y of point 1
 * @param x2 - x of point 2
 * @param y2 - y of point 2
 * @returns Distance between point 1 and 2
 */

function distanceCalculation(rssiValue) {

    var ratio_db = 0 - (rssiValue);
    var ratio_linear = Math.pow(10, ratio_db / 20);

    var r = Math.sqrt(ratio_linear);

    return r;

}

//function distanceCalculation(rssi) {
//    let P = 0; // @TODO This value should come from MQTT message
//    let n = 3;
//    let d = Math.pow(10, ((P - rssi) / (10 * n))); //(n ranges from 2 to 4)
//    debugger;
//    return d ;
//}

//function distanceCalculation(rssi) {

//    if (rssi == 0) {
//        return -1.0; // if we cannot determine distance, return -1.
//    }
//    var ratio = (rssi * 1.0) / -65;
//    if (ratio < 1.0) {
//        var mt = Math.pow(10, ratio);
//        return mt * 66;
//        debugger;
//    }
//    else {
//        var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;

//        return distance;
//        debugger;
//    }

//}

function calcDist(x1, y1, x2, y2) {
    let a = (x2 - x1) * (x2 - x1)
    let b = (y2 - y1) * (y2 - y1)
    return sqrt(a + b)
}

/**
 * Print distance between two points
 */
function showDist(p1, p2) {
    let d = calcDist(p1.x, p1.y, p2.x, p2.y)
    push()
    stroke(1)
    translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
    text(nfc(d, 1), 0, -5)
    pop()
}


function clearArray(clrArray) {
    if (clrArray.length > 20) {
        clrArray = [];
        this.clrArray = clrArray
        //window.alert("Temizlenen Array:" + this.clrArray)
    }
}

function getAverage(averageArr) {
    let calculateAverage = 0;
    if (averageArr != null) {
        if (averageArr.length <= 5) {
            for (var i = 0; i < averageArr.length; i++) {
                calculateAverage = calculateAverage + averageArr[i];
            }
            return calculateAverage / averageArr.length

        }
    }


}

function trilaterationValue(xa, xb, xc, ya, yb, yc, ra, rb, rc) {
    var S = ((Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0)
    var T = ((Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0)
    var y = (((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa))))
    var x = ((((y * (ya - yb)) - T) / (xb - xa)))

    var cordinates = {
        xaxix: x,
        yaxix: y
    }

    return cordinates;
}

function getTrilateration(position1, position2, position3, r3, r2, r1) {


    var xa = position1.x
    var ya = position1.y

    var xb = position2.x
    var yb = position2.y

    var xc = position3.x
    var yc = position3.y
    let ra;
    let rb;
    let rc;

    if (filterR1 != null && filterR2 != null && filterR3 != null) {
        ra = getFilteredData(filterR3);
        rb = getFilteredData(filterR2);
        rc = getFilteredData(filterR1);

    }

    let res1 = 0;
    let res2 = 0;
    let res3 = 0;
    res1 = ra - rb;
    res2 = ra - rc;
    res3 = rb - rc;
    if (ra != null || rb != null || rc != null) {
        let axixs = trilaterationValue(xa, xb, xc, ya, yb, yc, ra, rb, rc);
        //if (ra == rc || Math.abs(res2) <= 2 ) {
        //    _x = axixs.xaxix ;
        //    _y = axixs.yaxix ;
        //}
        if (Math.abs(res1) >= 1.5 && Math.abs(res2) >= 1.5 && Math.abs(res3) >= 1.5) {
            debugger
            if (ra < rb && ra < rc) {
                _x = axixs.xaxix - (rb * 10)+(ra*10);
                _y = axixs.yaxix - (rc * 10)+(ra*10);
                //debugger;
            }
            if (rb < ra && rb < rc) {
                 _x = axixs.xaxix + (ra * 10)-(rb*10);
                 _y = axixs.yaxix - (rc * 10)+(rb*10);
              
                //debugger;
            }
            if (rc < ra && rc < rb) {

                if (ra > rb) {
                    _x = axixs.xaxix +(ra*10)-(rc*10);
                    _y = axixs.yaxix + (ra * 10)

                }
                if (rb > ra) {
                    _x = axixs.xaxix - (rb * 10)+(rc*10);
                    _y = axixs.yaxix + (rb * 10);

                }
            
                //debugger;
            }

        } else {

            console.log("Bekliyor...")
            // debugger;
        }

    }

    for (beacon of beacons) {
        let p1 = createVector(_x, _y)
        let p2 = beacon.pos
        push()
        stroke(200)
        line(beacon.pos.x, beacon.pos.y, p1.x, p1.y)
        pop()
        showDist(p1, p2)
        beacon.show()
        ellipse(_x, _y, 10)
    }

    //debugger;
    return createVector(_x, _y)
}
    



//function splicem() {
//    //let ars = [1, 2, 3, 4, 5, 8, 9, 78, 54, 55]
//    //ars.slice(0, ars.length - 1)
//    window.alert(distanceCalculation(-30))
//}
//splicem()


function controlOfSomeValue(d1, d2, d3) {
    if (d1.length > 2 && d2.length > 2 && d3.length > 2) {
        if (d1[d1.length] == d1[d1.length - 1]) {
            //let index=
        }
    }
}