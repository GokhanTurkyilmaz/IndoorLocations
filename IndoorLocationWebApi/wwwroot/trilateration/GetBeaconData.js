////* <reference path="beacongateway.js" />*/


$("#gateway1").offset({ top: 13, left: 13 });
$("#gateway2").offset({ top: 13, left: 477 });
$("#gateway3").offset({ top: 477, left: 250 });



var _r1;
var _r2;
var _r3;
$("#show").on("click", function () {
    setInterval(function () { getBeacon1RSSI(), getBeacon2RSSI(), getBeacon3RSSI(), getTrilaterationTest(_r1, _r2, _r3) }, 1000);

});

function getBeacon1RSSI() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Gateway/Gateway1',
        success: function (data) {
            let beacon1 = JSON.parse(data);
            return _r1 = distanceCalculation(beacon1.RSSI) * 10

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
            return _r2 = distanceCalculation(beacon2.RSSI) * 10;
            //  console.log("G-2 e Göre Konum" + getFixedGatewayPositon(gateway2, beacon2.RSSI))
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
            return _r3 = distanceCalculation(beacon3.RSSI) * 10;
            alert("ddd");
            // console.log("G-3 e Göre Konum" + getFixedGatewayPositon(gateway3, beacon3.RSSI))
        },
        error: function (errorThrown) {

        }
    });
}

$(document).ready(function () {

});



