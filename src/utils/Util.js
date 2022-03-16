export function updateAtribute(squares, index, bool) {
    for (let k = 0; k < squares.length; k++) {
        if (k !== index)
            squares[k].blocked = bool;
    }
}


export function generateInitialBoard(initialBoard) {

    const squares = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let value = initialBoard[i * 9 + j];
            let isInitValue = (value !== '0') ? true : false;
            let square = {
                x: i,
                y: j,
                blocked: isInitValue,
                value: isInitValue ? value : '',
                isInitValue: isInitValue,
                error: false,
            };
            squares.push(square);
        }
    }
    return squares;
}

//Checks if the square value no generate conflict in lines
export function checkConflictsLine(squares, square) {

    //Check if not exists equals numbers in the same line
    let line = square.x;
    for (let i = 0; i < 9; i++) {
        //Checks is not the same square and checks the value
        let objSquare = squares[line * 9 + i];
        if (objSquare.y !== square.y && objSquare.value === square.value) {
            return line * 9 + i;
        }
    }
    return -1;
}

//Checks if the square value no generate conflict in column
export function checkConflictsColumn(squares, square) {

    //Check if not exists equals values in the same column
    for (let i = 0; i < 9; i++) {
        let objSquare = squares[i * 9 + square.y];
        //Checks if is not the same square and checks checks if have any square with same value.
        if (objSquare.x !== square.x && objSquare.value === square.value) {
            return i * 9 + square.y;
        }
    }
    return -1;
}

//Checks if the square value no generate conflict in corresponding block.
export function checkConflictsBlock(squares, square) {
    let lineStartX = 3 * Math.floor(square.x / 3);
    let columnStartY = 3 * Math.floor(square.y / 3);

    for (let i = lineStartX; i < lineStartX + 3; i++) {
        for (let j = columnStartY; j < columnStartY + 3; j++) {
            let objSquare = squares[i * 9 + j];
            //Checks if is not the same square and checks if have any square in corresponding
            // block with same value.
            if (objSquare.x !== square.x && objSquare.y !== square.y && objSquare.value === square.value)
                return i * 9 + j;
        }
    }
    return -1;
}

export const formateTimer = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`

}
