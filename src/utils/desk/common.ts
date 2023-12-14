export function splitStringByNumberDot(inputString:string) {
    // Use regular expression to split the string
    const resultArray = inputString.split(/\d+\./);
    
    // Remove empty strings from the result array
    const filteredResult = resultArray.filter(str => str.trim() !== '');

    return filteredResult;
}