function downloadCSVFromArrayObject(arrayOfObjects, filename) {
  // Extract headers from the first object in the array
  const headers = Object.keys(arrayOfObjects[0]);

  // Create a CSV string with headers as the first row
  let csv = headers.join(',') + '\n';

  // Iterate over the array of objects and convert each object to a CSV row
  arrayOfObjects.forEach(obj => {
      const values = headers.map(header => obj[header]);
      csv += values.join(',') + '\n';
  });

  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: 'text/csv' });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Trigger a click event on the link element
  a.click();

  // Release the URL object
  URL.revokeObjectURL(url);
}

// Example usage with an array of objects:
const data = [
  { Name: 'Alice', Age: 30, Country: 'USA' },
  { Name: 'Bob', Age: 25, Country: 'Canada' },
  { Name: 'Charlie', Age: 35, Country: 'UK' },
];

const da = JSON.parse(localStorage.getItem('signInDatabase'))

const rr = document.getElementById('download')

rr.addEventListener('click', () => {
  downloadCSVFromArrayObject(da[0].Session8, 'example.csv');
  //downloadCSVFromArrayObject(da, 'example.csv');
  const id = document.getElementById('idStoreOnBtnClick')

  const ss = JSON.parse(localStorage.getItem('sessionID'))
})


