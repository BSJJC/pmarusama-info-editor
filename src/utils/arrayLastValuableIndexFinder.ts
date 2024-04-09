/**
 * Get the index of the last valuable column in a 2D array.
 *
 * @param {Array<Array<string>>} array - The 2D array representing rows and columns.
 * @param {number} maxRows - The maximum number of rows in the array.
 * @param {number} maxCols - The maximum number of columns in the array.
 * @returns {number} - The index of the last valuable column.
 */
export function getLastValuableColIndex(
  array: Array<Array<string>>,
  maxRows: number,
  maxCols: number,
): number {
  /**
   *    a b c 👆
   *    d e f  ↑
   *    g h i  ↑
   *   👈← ←
   *
   *    traversal order：
   *    i -> f -> c -> h -> e -> b -> ... -> a
   */
  for (let c = maxCols; c >= 0; c--) {
    for (let r = maxRows; r >= 0; r--) {
      const value = array[r][c].trim();
      if (value.length !== 0) {
        return c;
      }
    }
  }

  /**
   * if traverse to the end normally, you will get -1, but the minimum can only be 0.
   */
  return 0;
}

/**
 * Get the index of the last valuable row in a 2D array.
 *
 * @param {Array<Array<string>>} array - The 2D array representing rows and columns.
 * @param {number} maxRows - The maximum number of rows in the array.
 * @param {number} maxCols - The maximum number of columns in the array.
 * @returns {number} - The index of the last valuable row.
 */
export function getLastValuableRowIndex(
  array: Array<Array<string>>,
  maxRows: number,
  maxCols: number,
): number {
  /**
   *    a b c 👆
   *    d e f  ↑
   *    g h i  ↑
   *   👈← ←
   *
   *    traversal order：
   *    i -> h -> g -> f -> e -> d ->  ... -> a
   */
  for (let r = maxRows; r >= 0; r--) {
    for (let c = maxCols; c >= 0; c--) {
      const value = array[r][c].trim();
      if (value.length !== 0) {
        return r;
      }
    }
  }

  /**
   * if traverse to the end normally, you will get -1, but the minimum can only be 0.
   */
  return 0;
}
