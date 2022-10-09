export function dereferenceArray(arr) {
    let result = ""
    for (let i = 0; i < arr.length - 1;i++) {
        result += arr[i] + ", " 
    }
    return result + arr[arr.length - 1]
}