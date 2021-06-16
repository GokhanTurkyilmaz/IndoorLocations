//import KalmanFilter from '/Users/Gökhan/source/repos/IndoorLocation/IndoorLocationWebApi/wwwroot/kalman-filter/lib/kalman-filter.js'
//import KalmanFilter from '../wwwroot/kalman-filter/docs/dist/kalman-filter'
//const { KalmanFilter } = require('../wwwroot/kalman-filter/lib/kalman-filter');


//var { KalmanFilter } = kalmanFilter;
//const observations = [[0, 1], [0.1, 0.5], [0.2, 3], [4, 2], [1, 2]];
//const observations = [0, -15, -45, 0, -40, -59, -58, 0, -15, 0, -58, -59];
//const kFilter = new KalmanFilter();

//const kFilter = new KalmanFilter({
//    observation: 2,
//    dynamic: 'constant-speed'
//});
// equivalent to
// new KalmanFilter({
// 	observation: {
// 		name: 'sensor',
// 		sensorDimension: 2
// 	},
// 	dynamic: {
// 		name: 'constant-speed'
// 	},
// });
//const res = kFilter.filterAll(observations)
//console.log(res);