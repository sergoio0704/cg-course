export default class MathHelper {
    constructor() {}

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
      
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    rotateMatrix = (matrix) => {
        const N = matrix.length - 1;
        const result = matrix.map((row, i) =>
            row.map((val, j) => matrix[N - j][i])
        );

        return result;
    }
}