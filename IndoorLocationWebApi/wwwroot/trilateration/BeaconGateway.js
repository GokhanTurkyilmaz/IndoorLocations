
dragElement(document.getElementById("gateway1"));
dragElement(document.getElementById("gateway2"));
dragElement(document.getElementById("gateway3"));
//dragElement(document.getElementById("mydiv0"));
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;

    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is releaseViewBagewBag:
        document.onmouseup = null;
        document.onmousemove = null;
    }


}
function createQuadrilateral() {
    var x = document.getElementById("xweight").value
    var y = document.getElementById("yheight").value

    if (x < 24 || y < 24 || null) {
        alert("X ve Y degerleri 24 den kucuk ve null olmamali")
    }
    else {
        var canvas = document.getElementById("mydiv0");
        canvas.width = x;
        canvas.height = y;
    }

}

function getDocumentOffsetPositionX(id) {
    var el = $(id);
    var position = el.position();
    var x;
    x = position.left;
    return x;
}
function getDocumentOffsetPositionY(id) {
    var el = $(id);
    var position = el.position();
    var y;
    y = position.top;
    return y;
}
function getPosition() {
    //canvas of x,y
    getDocumentOffsetPositionX(mydiv0)
    getDocumentOffsetPositionY(mydiv0)
    //position of X
    getDocumentOffsetPositionX(gateway1)
    console.log("G1 X KORDINATE" + (getDocumentOffsetPositionX(gateway1) - getDocumentOffsetPositionX(mydiv0)))
    getDocumentOffsetPositionX(gateway2)
    console.log("G2 X KORDINATE" + (getDocumentOffsetPositionX(gateway2) - getDocumentOffsetPositionX(mydiv0)))
    getDocumentOffsetPositionX(gateway3)
    console.log("G3 X KORDINATE" + (getDocumentOffsetPositionX(gateway3) - getDocumentOffsetPositionX(mydiv0)))
    //position of Y
    getDocumentOffsetPositionY(gateway1)
    console.log("G1 Y KORDINATE" + (getDocumentOffsetPositionY(gateway1) - getDocumentOffsetPositionY(mydiv0)))
    getDocumentOffsetPositionY(gateway2)
    console.log("G2 Y KORDINATE" + (getDocumentOffsetPositionY(gateway2) - getDocumentOffsetPositionY(mydiv0)))
    getDocumentOffsetPositionY(gateway3)
    console.log("G3 Y KORDINATE" + (getDocumentOffsetPositionY(gateway3) - getDocumentOffsetPositionY(mydiv0)))
    distanceOfBetweenGateways();
}
function distanceOfBetweenGateways() {
    var dX10 = (getDocumentOffsetPositionX(gateway2) - getDocumentOffsetPositionX(mydiv0)) - (getDocumentOffsetPositionX(gateway1) - getDocumentOffsetPositionX(mydiv0));
    var dY10 = (getDocumentOffsetPositionY(gateway2) - getDocumentOffsetPositionY(mydiv0)) - (getDocumentOffsetPositionY(gateway1) - getDocumentOffsetPositionY(mydiv0));

    var dX11 = (getDocumentOffsetPositionX(gateway3) - getDocumentOffsetPositionX(mydiv0)) - (getDocumentOffsetPositionX(gateway1) - getDocumentOffsetPositionX(mydiv0));
    var dY11 = (getDocumentOffsetPositionY(gateway3) - getDocumentOffsetPositionY(mydiv0)) - (getDocumentOffsetPositionY(gateway1) - getDocumentOffsetPositionY(mydiv0));

    var dX12 = (getDocumentOffsetPositionX(gateway3) - getDocumentOffsetPositionX(mydiv0)) - (getDocumentOffsetPositionX(gateway2) - getDocumentOffsetPositionX(mydiv0))
    var dY12 = (getDocumentOffsetPositionY(gateway3) - getDocumentOffsetPositionY(mydiv0)) - (getDocumentOffsetPositionY(gateway2) - getDocumentOffsetPositionY(mydiv0));

    var dT10 = dX10 * dX10;
    var dT20 = dY10 * dY10;

    var dT11 = dX11 * dX11;
    var dT21 = dY11 * dY11;

    var dT12 = dX12 * dX12;
    var dT22 = dY12 * dY12;

    var distance1 = Math.sqrt(dT10 + dT20);

    var distance2 = Math.sqrt(dT11 + dT21);

    var distance3 = Math.sqrt(dT12 + dT22);
    //alert("G1-G2 Arasindaki mesafe:" + "X:" + dX + "Y:" + dY);
    $("#mydivheader").offset({ top: getDocumentOffsetPositionY(mydiv0), left: getDocumentOffsetPositionX(mydiv0) })
    alert("G1-G2 Arasindaki mesafe:" + distance1);
    alert("G1-G3 Arasindaki mesafe:" + distance2);
    alert("G2-G3 Arasindaki mesafe:" + distance3);
    //alert(distanceCalculation(-65))
    calculateNewCordinate();
}

function changeElementPosition(rssi) {
    calculateForOneGatewayCordinate(rssi);
    // calculateNewCordinate(rssi);
}

//////////////////////////// MEASUMERNT DISTANCE FOR RSSI ///////////////////////////
function distanceCalculation(rssiValue) {

    var ratio_db = 0 - rssiValue;
    var ratio_linear = Math.pow(10, ratio_db / 10);

    var r = Math.sqrt(ratio_linear);
    return r / 50;

}



function calculateNewCordinate(rssi) {

    var distance = distanceCalculation(rssi);

    var dX10 = (getDocumentOffsetPositionX(gateway2) - getDocumentOffsetPositionX(mydiv0)) - (getDocumentOffsetPositionX(gateway1) - getDocumentOffsetPositionX(mydiv0));
    var dY10 = (getDocumentOffsetPositionY(gateway2) - getDocumentOffsetPositionY(mydiv0)) - (getDocumentOffsetPositionY(gateway1) - getDocumentOffsetPositionY(mydiv0));

    var A1 = {
        x: dX10,
        y: dY10
    };

    var dX11 = (getDocumentOffsetPositionX(gateway3) - getDocumentOffsetPositionX(mydiv0)) - (getDocumentOffsetPositionX(gateway1) - getDocumentOffsetPositionX(mydiv0));
    var dY11 = (getDocumentOffsetPositionY(gateway3) - getDocumentOffsetPositionY(mydiv0)) - (getDocumentOffsetPositionY(gateway1) - getDocumentOffsetPositionY(mydiv0));

    var A2 = {
        x: dX11,
        y: dY11
    };

    // Distance

    var d = distance;

    // Find Slope of the line
    var slope = (A2.y - A1.y) / (A2.x - A1.x);

    // Find angle of line
    var theta = Math.atan(slope);

    // the coordinates of the A3 Point
    var A3x = A2.x + d * Math.cos(theta);
    var A3y = A2.y + d * Math.sin(theta);
    if (A3x < getDocumentOffsetPositionX || A3y < getDocumentOffsetPositionY) {
        $("#mydivheader").offset({ top: (A3y + getDocumentOffsetPositionX(mydiv0)), left: (A3x + getDocumentOffsetPositionY(mydiv0)) })


    }
    else {
        $("#mydivheader").offset({ top: A3y, left: A3x })
    }

    console.log(A3x);
    console.log(A3y);

}



function calculatedCordinatess() {
    //var d = distance;
    // Find Slope of the line
    // var slope = (A2.y - A1.y) / (A2.x - A1.x);
    var slope = (3) / (4);
    // Find angle of line
    var theta = Math.atan(slope);
    console.log(theta)

    x2 = 2 + 5 * Math.cos(0.6435011087932844);
    y2 = 3 + 5 * Math.sin(0.6435011087932844);

    console.log(x2, y2)
}


//This function using th trileteration algorithm


function getTrilateration(position1, position2, position3, _ra, _rb, _rc) {
    var xa = position1.x;
    var ya = position1.y;
    var xb = position2.x;
    var yb = position2.y;
    var xc = position3.x;
    var yc = position3.y;


    //position1.distance = _ra;
    //position2.distance = _rb;
    //position3.distance = _rc;

    //var ra = calcDist(xa, ya, getDocumentOffsetPositionX("#mydivheader"), getDocumentOffsetPositionY("#mydivheader"))
    //var rb = calcDist(xb, yb, getDocumentOffsetPositionX("#mydivheader"), getDocumentOffsetPositionY("#mydivheader"))
    //var rc = calcDist(xc, yc, getDocumentOffsetPositionX("#mydivheader"), getDocumentOffsetPositionY("#mydivheader"))



    //var ra = position1.distance;
    //var rb = position2.distance;
    //var rc = position3.distance;

    let ra = _ra;
    let rb = _rb;
    let rc = _rc;

    var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0
    var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0
    var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)))
    var x = ((y * (ya - yb)) - T) / (xb - xa)

    console.log("X Cordinate:" + x, ",", "Y cordinate" + y)

    return $("#mydivheader").offset({ top: y, left: x })

    //return $("#mydivheader").offset({top: y, left: x });
    //return {

    //    x: x,
    //    y: y
    //};
}

function getFixedGatewayPositon(gtwayno) {
    var gXcordinate = (getDocumentOffsetPositionX(gtwayno) - getDocumentOffsetPositionX(mydiv0));
    var gYcordinate = (getDocumentOffsetPositionY(gtwayno) - getDocumentOffsetPositionY(mydiv0));

    var G1 = {
        x: gXcordinate,
        y: gYcordinate,

    }

    return {
        x: G1.x,
        y: G1.y,
    };
}

function getTrilaterationTest(ra, rb, rc) {
    getTrilateration(getFixedGatewayPositon(gateway1), getFixedGatewayPositon(gateway2), getFixedGatewayPositon(gateway3), ra, rb, rc)

}



function calcDist(x1, y1, x2, y2) {
    let a = (x2 - x1) * (x2 - x1)
    let b = (y2 - y1) * (y2 - y1)
    return Math.sqrt(a + b)
}

