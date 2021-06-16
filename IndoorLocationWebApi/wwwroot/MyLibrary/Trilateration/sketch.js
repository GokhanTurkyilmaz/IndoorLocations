

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


/**
 * Setup program
 */


function setup() {
    createCanvas(500, 500)
    textSize(10)

    // Create beacons
    //b2 = new Beacon('b2', createVector(13, 487), [255, 250, 0])
    //b1 = new Beacon('b1', createVector(width - 13, 487), [255, 71, 239])
    //b3 = new Beacon('b3', createVector(width - 250, 13), [109, 3, 100])
    b1 = new Beacon('b1', createVector(13, 13), [255, 250, 0])
    b2 = new Beacon('b2', createVector(width - 13, 13), [255, 71, 239])
    b3 = new Beacon('b3', createVector(width - 250, height - 13), [109, 3, 100])
    b4 = new Beacon('b4', createVector(_x, _y), [80, 3, 100])

    beacons.push(b1)
    beacons.push(b2)
    beacons.push(b3)
    //getFilteredData(_filterData);
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
    let pos = getTrilateration(b2.pos, b1.pos, b3.pos, _r3, _r2, _r1)

    stroke(1)
    text("Real Pos = " + nfc(mouseX, 1) + ", " + nfc(mouseY, 1), pos.x + 20, pos.y + 15)
    text("Calc Pos = " + nfc(pos.x, 1) + ", " + nfc(pos.y, 1), pos.x + 20, pos.y - 5)
}


function getTrilateration(position1, position2, position3, r3, r2, r1) {

    //let p1 = b4.pos
    var xa = position1.x
    var ya = position1.y

    var xb = position2.x
    var yb = position2.y

    var xc = position3.x
    var yc = position3.y


    //let ra = r2;
    //let rb = r3;
    //let rc = r1;
    let ra = getFilteredData(filterR2);
    let rb = getFilteredData(filterR3);
    let rc = getFilteredData(filterR1);



    if (ra != null || rb != null || rc != null) {

        if (ra < rb && ra < rc) {
            //ra = r2;
            //rb = r3;
            //rc = r1;
            //this.rb = calcDist(xb, yb, _x, _y)
            //this.rc = calcDist(xc, yc, _x, _y)
            var S = ((Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0)
            var T = ((Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0)
            var y = (((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa))))
            var x = ((((y * (ya - yb)) - T) / (xb - xa)))
            debugger;
            _x = x - (rb * 10) + (ra * 10);
            _y = y + (ra * 10);
        }
        if (rb < ra && rb < rc) {

            //rb = r3;
            //ra = r2;
            //rc = r1;
            //this.ra = calcDist(xa, ya, _x, _y)
            //this.rc = calcDist(xc, yc, _x, _y)
            var S = ((Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0)
            var T = ((Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0)
            var y = (((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa))))
            var x = ((((y * (ya - yb)) - T) / (xb - xa)))
            debugger;
            _x = x + (ra * 10) - (rb * 10);
            _y = y  + (rb * 10);
        }
        if (rc < ra && rc < rb) {
            //rc = r1;
            //this.ra = calcDist(xa, ya, _x, _y)
            //this.rb = calcDist(xb, yb, _x, _y)
            var S = ((Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0)
            var T = ((Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0)
            var y = (((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa))))
            var x = ((((y * (ya - yb)) - T) / (xb - xa)))
            debugger;
            if (ra>rb) {
                _x = x + (rc * 10) - (rb * 10);
                _y = y - (rc * 10) + (ra * 10)
            }
            if (rb>ra) {
                _x = x + (rc * 10) - (ra * 10);
                _y = y - (rc * 10) + (rb * 10)
            }
           
        }

    }




    // showBeacon1(_x, _y);

    //console.log("X DEGERI:" + _x, "Y DEGERI:" + _y)

    for (beacon of beacons) {
        let p1 = createVector(_x, _y)
        let p2 = beacon.pos
        push()
        stroke(200)
        line(beacon.pos.x, beacon.pos.y, p1.x, p1.y)
        pop()
        showDist(p1, p2)
        beacon.show()
        ellipse(_x, _y, 40)
    }

    //debugger;
    return createVector(_x, _y)

}


function getBeacon1RSSI() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Gateway/Gateway1',
        success: function (data) {
            let beacon1 = JSON.parse(data);
            if (beacon1.RSSI != 0) {
                //_r1 = parseInt(Math.abs(distanceCalculation(beacon1.RSSI)), 10);
                if (filterRSSI1.length > 15) {
                    filterRSSI1 = []
                }
                if (filterR1.length > 15) {
                    filterR1 = []
                }
                filterRSSI1.push(beacon1.RSSI)
                filterR1.push(parseInt(Math.abs(distanceCalculation(controlOfFilterArray(filterRSSI1))), 10));
                _r1 = controlOfFilterArray(filterR1)
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
            if (beacon2.RSSI != 0) {
                //_r2 = parseInt(Math.abs(distanceCalculation(beacon2.RSSI)), 10);
                if (filterRSSI2.length > 15) {
                    filterRSSI2 = []
                }
                if (filterR2.length > 15) {
                    filterR2 = []
                }
                filterRSSI2.push(beacon2.RSSI)
                let rssii = controlOfFilterArray(filterRSSI2);
                filterR2.push(parseInt(Math.abs(distanceCalculation(rssii)), 10));
                _r2 = controlOfFilterArray(filterR2)
                // debugger;
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

            if (beacon3.RSSI != 0) {
                //_r3 = parseInt(Math.abs(distanceCalculation(beacon3.RSSI)), 10);
                if (filterRSSI3.length > 15) {
                    filterRSSI3 = [];
                }
                if (filterR3.length > 15) {
                    filterR3 = []
                }
                filterRSSI3.push(beacon3.RSSI)
                filterR3.push(parseInt(Math.abs(distanceCalculation(controlOfFilterArray(filterRSSI3))), 10));
                _r3 = controlOfFilterArray(filterR3)
            }


        },
        error: function (errorThrown) {

        }
    });
}

var _filterData = [-18, -45, -59, 0, -28, -57, -59, 0, -59, -55, -48, 0];
function getFilteredData(filterData) {

    var { KalmanFilter } = kalmanFilter;
    const kFilter = new KalmanFilter();

    const res = kFilter.filterAll(filterData)
    let data =parseInt(res[filterData.length - 1], 10);;
    
    return data;

}


function controlOfFilterArray(filterArray) {
    let rfilter = getFilteredData(filterArray);
    debugger;
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
    //debugger
    return r;

}
//function distanceCalculation(rssi) {

//    if (rssi == 0) {
//        return -1.0; // if we cannot determine distance, return -1.
//    }
//    var ratio = (rssi * 1.0) / -65;
//    if (ratio < 1.0) {
//        var mt = Math.pow(10, ratio);
//        return mt * 66;
//    }
//    else {
//        var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;

//        return distance;
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

function myAlgorithm(r11, r22, r33) {
    let x;
    let y;
    x = (((r11 * r11) - (r22 * r22)) + (477 * 477)) / (2 * (477));

    y = (((r11 * r11) - (r33 * r33)) + ((250 * 250) + (477 * 477)) - (2 * (250 * x))) / (2 * 477);

    console.log("X DEGERI:" + x, "Y DEGERI:" + y);

}

function myAlgorithm2(da, db, dc) {
    let vb;
    let va;
    let ycor;
    let xcor;
    va = (((db * db) - (dc * dc)) - ((487 * 487) - (250 * 250)) - ((13 * 13) - (487 * 487))) / 2

    vb = (((db * db) - (da * da)) - ((487 * 487) - (13 * 13)) - ((13 * 13) - (13 * 13))) / 2

    ycor = ((vb * (250 - 487))) - (va * (13 - 487)) / ((13 - 13) * (250 - 487) - (487 - 13) * (13 - 477));

    xcor = (va - (ycor * (487 - 13))) / (250 - 487)

    console.log("X DEGERI:" + xcor, "Y DEGERI:" + ycor);

}
function trilate() {

}