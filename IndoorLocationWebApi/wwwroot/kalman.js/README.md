# Kalman filter for js

# How to use

```sh
$ npm install --save kalman.js
```

# example

```js
import { expect } from 'chai';

import math from 'mathjs'
import Kalman from './kalman.js';

function norm(){
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

describe('test', () => {
  it('with noize', () => {
    let k = new Kalman(/*x0*/ [10], /* P0 */ [10]); /* E[(x0)(x0^T)] = P0 */
    /** @type {mathjs.Matrix} */
    let r;
    for(let i=0;i<1000;i++) {
      let y = 1 + norm(0.1);
      r = k.observe(
        /* F */ [1], /* G */ [1], /* Q */ [0], /* x'=Fx + Gw, w~N(0,Q) */
        /* H */ [1],              /* R */ [0.1], /* y=Hx + v, v~N(0,R) */
        /*y*/ [y]);
    }
    expect(math.pow(r.get([0]) - 1, 2)).lessThan(0.1);
  });
});
```
