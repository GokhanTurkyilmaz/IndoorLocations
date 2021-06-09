/**
 * Trilateration example using p5js.org
 * Trilateration math by https://gist.github.com/kdzwinel/8235348
 * Example by Djonathan Krause, 2018
 */


let beacons = [];
let b1, b2, b3;
let _r1, _r2, _r3;
var _x=250 ;
var _y=250 ;

/**
 * Setup program
 */


function setup() {
    createCanvas(500, 500)
    textSize(10)
   
    // Create beacons
    b1 = new Beacon('b1', createVector(13, 13), [255, 250, 0])
    b2 = new Beacon('b2', createVector(width - 13, 13), [255, 71, 239])
    b3 = new Beacon('b3', createVector(width - 250, height - 13), [109, 3, 100])
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
    let pos = getTrilateration(b1.pos, b2.pos, b3.pos)

    stroke(1)
    text("Real Pos = " + nfc(mouseX, 1) + ", " + nfc(mouseY, 1), pos.x + 20, pos.y + 15)
    text("Calc Pos = " + nfc(pos.x, 1) + ", " + nfc(pos.y, 1), pos.x + 20, pos.y - 5)
}

/**
 * Do some math stuff to get trilateration.
 * Copied from https://gist.github.com/kdzwinel/8235348
 */

function getTrilateration(position1, position2, position3) {
    
    let p1 = b4.pos
    var xa = position1.x
    var ya = position1.y

    var xb = position2.x
    var yb = position2.y

    var xc = position3.x
    var yc = position3.y


    let ra;
    let rb;
    let rc;

    if (rc<1) {
        ra = calcDist(xa, ya, _x, _y)
        rb = calcDist(xb, yb, _x, _y)
        rc = calcDist(xb, yb, _x, _y)
        console.log("Else çalışıyor")
    }
    else {
         ra = _r2;
         rb = _r3;
         rc = _r1;
    }
    console.log("RC DEGERI:"+rc)
    //var ra = 1
    //var rb = 39
    //var rc = 50

    var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0
    var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0
    var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)))
    var x = ((y * (ya - yb)) - T) / (xb - xa)


    //debugger;
    _x = x;
    _y = y;
    showBeacon1(_x, _y);
    ellipse(_x, _y, 40)
    console.log("X DEGERI:" + _x, "Y DEGERI:" + _y)
   
    for (beacon of beacons) {
        //let p1 = createVector(x, y)
        let p2 = beacon.pos
        push()
        stroke(200)
        line(beacon.pos.x, beacon.pos.y, p1.x, p1.y)
        pop()
        showDist(p1, p2)
        beacon.show()
    }
   
    return createVector(x, y)

}


function getBeacon1RSSI() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Gateway/Gateway1',
        success: function (data) {
            let beacon1 = JSON.parse(data);
            _r1 = Math.abs(distanceCalculation(beacon1.RSSI) * 10)
            // window.alert(_r1)
            // console.log("G-1 e Göre Konum" + getFixedGatewayPositon(gateway1, beacon1.RSSI))
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
            _r2 = Math.abs(distanceCalculation(beacon2.RSSI) * 10);
            //window.alert("R2:"+_r2)
            //console.log("G-2 e Göre Konum" + getFixedGatewayPositon(gateway2, beacon2.RSSI))
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
            _r3 = Math.abs(distanceCalculation(beacon3.RSSI) * 10);
            //window.alert("R3:"+_r3)
            //console.log("G-3 e Göre Konum" + getFixedGatewayPositon(gateway3, beacon3.RSSI))
        },
        error: function (errorThrown) {

        }
    });
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

    var ratio_db = 0 - rssiValue;
    var ratio_linear = Math.pow(10, ratio_db / 10);

    var r = Math.sqrt(ratio_linear);
    return r / 50;

}


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


