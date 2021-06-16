import { expect } from 'chai';

import math from 'mathjs'
import Kalman from './kalman.js';

function norm(){
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

describe('test', () => {
  it('simple', () => {
  });
  it('with noize', () => {
    let k = new Kalman([10], [10]);
    /** @type {mathjs.Matrix} */
    let r;
    for(let i=0;i<1000;i++) {
      let y = 1 + norm(0.1);
      r = k.observe(
        /* F */ [1], /* G */ [1], /* Q */ [0],
        /* H */ [1],              /* R */ [0.1],
        /*y*/ [y]);
    }
    expect(math.pow(r.get([0]) - 1, 2)).lessThan(0.1);
  });
  it('multiple dimension', () => {
    let I = [[1,0,0], [0,1,0], [0,0,1]];
    let Z = [[0,0,0], [0,0,0], [0,0,0]];
    let R = [[10,0,0], [0,10,0], [0,0,10]];
    let k = new Kalman(/*x0*/ [1,2,3], /* P0 */ I);
    /** @type {mathjs.Matrix} */
    let r;
    for(let i=0;i<1000;i++) {
      let y = [1 + norm(1), 1+norm(1), 1+norm(1)];
      r = k.observe(
        /* F */ I, /* G */ I,   /* Q */ Z,
        /* H */ I,              /* R */ R,
        /*y*/ y);
    }
    expect(math.pow(r.get([0]) - 1, 2)).lessThan(0.1);
    expect(math.pow(r.get([1]) - 1, 2)).lessThan(0.1);
    expect(math.pow(r.get([2]) - 1, 2)).lessThan(0.1);
  });
});