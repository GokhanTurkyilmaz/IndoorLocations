import math from 'mathjs'
export default class Kalman {
  /**
   * 
   * @param {number[]} x0 
   * @param {number[]} p0 
   */
  constructor(x0, p0) {
    /** @type {mathjs.Matrix} */
    this.x = math.matrix(x0);
    /** @type {mathjs.Matrix} */
    this.P = math.matrix(p0);
  }
  /**
   * @param {number[][]} f
   * @param {number[][]} g
   * @param {number[][]} q
   * 
   * @param {number[][]} h
   * @param {number[][]} r
   * 
   * @param {number[]} y_
   * 
   * @return {mathjs.Matrix}
   */
  observe(f, g, q, h, r, y_) {
    let F = math.matrix(f);
    let G = math.matrix(g);
    let Q = math.matrix(q);

    let H = math.matrix(h);
    let R = math.matrix(r);

    let y = math.matrix(y_);

    let add = math.add;
    let sub = math.subtract;
    let mul = math.multiply;
    let trans = math.transpose;
    let inv = math.inv;

    let x1pre = mul(F, this.x);
    let Ppre = add(mul(mul(F, this.P), trans(F)), mul(mul(G, Q), trans(G)));
    let K = mul(mul(Ppre, trans(H)), inv(add(mul(mul(H, Ppre), trans(H)), R)));
    let P = sub(Ppre, mul(mul(K,H), Ppre));
    let x1 = add(x1pre, mul(K, math.subtract(y, mul(H, x1pre))));

    // update model
    this.x = x1;
    this.P = P;

    return x1;
  }
}