function rotateArray(arr, steps) {
    if (!Array.isArray(arr)) {
        return "Первый аргумент должен быть массивом";
    }
    steps = Number(steps);

    if (!Number.isInteger(steps)) {
        return "Второй аргумент должен быть числом"
    }

    let n = arr.length;
    let res = [];
    
    for (let i = 0; i < n; i++) {
        res[(i + steps) % n] = arr[i];
    }
    
    return res;
}

console.log(rotateArray([1,2,3,4,5,6], "5")); 
console.log(rotateArray([1,2,3,4,5,6], 2)); 
console.log(rotateArray("", "5")); 
console.log(rotateArray([1,2,3,4,5,6], "aa")); 