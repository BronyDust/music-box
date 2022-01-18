export type Matrix3x3 = [
  number, number, number,
  number, number, number,
  number, number, number
]

export function multiply(multiplier: Matrix3x3, multiplicand: Matrix3x3): Matrix3x3 {
  const a00 = multiplier[0];
  const a01 = multiplier[1];
  const a02 = multiplier[2];
  const a10 = multiplier[3];
  const a11 = multiplier[4];
  const a12 = multiplier[5];
  const a20 = multiplier[6];
  const a21 = multiplier[7];
  const a22 = multiplier[8];
  const b00 = multiplicand[0];
  const b01 = multiplicand[1];
  const b02 = multiplicand[2];
  const b10 = multiplicand[3];
  const b11 = multiplicand[4];
  const b12 = multiplicand[5];
  const b20 = multiplicand[6];
  const b21 = multiplicand[7];
  const b22 = multiplicand[8];

  return [
    b00 * a00 + b01 * a10 + b02 * a20,
    b00 * a01 + b01 * a11 + b02 * a21,
    b00 * a02 + b01 * a12 + b02 * a22,
    b10 * a00 + b11 * a10 + b12 * a20,
    b10 * a01 + b11 * a11 + b12 * a21,
    b10 * a02 + b11 * a12 + b12 * a22,
    b20 * a00 + b21 * a10 + b22 * a20,
    b20 * a01 + b21 * a11 + b22 * a21,
    b20 * a02 + b21 * a12 + b22 * a22,
  ]
}

export function addition(firstAddend: Matrix3x3, secondAddend: Matrix3x3): Matrix3x3 {
  const a00 = firstAddend[0];
  const a01 = firstAddend[1];
  const a02 = firstAddend[2];
  const a10 = firstAddend[3];
  const a11 = firstAddend[4];
  const a12 = firstAddend[5];
  const a20 = firstAddend[6];
  const a21 = firstAddend[7];
  const a22 = firstAddend[8];
  const b00 = secondAddend[0];
  const b01 = secondAddend[1];
  const b02 = secondAddend[2];
  const b10 = secondAddend[3];
  const b11 = secondAddend[4];
  const b12 = secondAddend[5];
  const b20 = secondAddend[6];
  const b21 = secondAddend[7];
  const b22 = secondAddend[8];

  return [
    a00 + b00, a01 + b01, a02 + b02,
    a10 + b10, a11 + b11, a12 + b12,
    a20 + b20, a21 + b21, a22 + b22,
  ]
}

/**
 * Make a projection by width/height
 *
 * Note: This matrix flips the Y axis so that 0 is at the top.
 */
export function project(width: number, height: number): Matrix3x3 {
  return [
    2 / width, 0, 0,
    0, -2 / height, 0,
    -1, 1, 1
  ]
}

export function getTranslationMatrix(tx: number, ty: number): Matrix3x3 {
  return [
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1
  ]
}

export function getScaleMatrix(sx: number, sy: number): Matrix3x3 {
  return [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1
  ]
}

export function getFullMatrix(tx: number, ty: number, sx: number, sy: number): Matrix3x3 {
  return [
    sx, 0, 0,
    0, sy, 0,
    tx, ty, 1
  ]
}
