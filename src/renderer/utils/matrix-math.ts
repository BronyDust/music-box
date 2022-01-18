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
