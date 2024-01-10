export function splitStringByNumberDot(inputString:string) {
    // Use regular expression to split the string
    const resultArray = inputString.split(/\d+\./);
    
    // Remove empty strings from the result array
    const filteredResult = resultArray.filter(str => str.trim() !== '');

    return filteredResult;
}

export function csvToObjectArray(csvString:string) {
    // Split the CSV string into an array of lines
    const lines = csvString.split('\n');
  
    // Initialize an empty array to store the result objects
    const resultArray = [];
  
    // Iterate over the lines starting from index 1 (skipping the header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].split(',');
  
      // Create an object with word and definition keys using the header indices
      const obj = {
        'word': line[0].trim(),
        'definition': line[1].trim(),
      };
  
      // Push the object to the result array
      resultArray.push(obj);
    }
  
    return resultArray;
  }