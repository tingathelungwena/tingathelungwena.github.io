const input = document.getElementById('csvFile');
const fileName = document.querySelector('.file-name');
const importData = document.getElementById('importButton')

let File
input.addEventListener('change', (event) => {
  file = event.target.files[0];
  if (file) {
    fileName.textContent = file.name;
    fileName.style.opacity = 1;
  } else {
    fileName.style.opacity = 0;
  }
});

{// Your input element for file selection

    importData.addEventListener('click', () => {
    //const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
    const csvContent = e.target.result;
    // Call the function to process CSV content
    processCSV(csvContent);
    };

      reader.readAsText(file);
    });

    

    function processCSV(csvContent) {
      const mbMaineContainer = document.getElementById('mbImportContainer')
      const lines = csvContent.split('\n');
      const header = lines[0].split(','); // Assuming the first line is the header

      const dataArray = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const dataObject = {};

        for (let j = 0; j < header.length; j++) {
          dataObject[header[j]] = values[j];
        }

        dataArray.push(dataObject);
      }

      localStorage.setItem('teenDatabase',JSON.stringify(dataArray))
      popMessage('Database imported successfully');
      mbMaineContainer.style.display = 'none';

      console.log(dataArray); // Array of objects

      setTimeout(() => {
        openHtmlFile('/HTML/members.html')   
      }, 1000);
      
    }
}

  { //Code for showing import database and add new teen container
    const Cancel = document.getElementById('mbMainCancel')
    const mbMaineContainer = document.getElementById('mbImportContainer')
    const mbImportButton = document.getElementById('mbImportBtn')
    const importDatabaseContainer = document.getElementById('anImportDatabase')
    const addNewTeenContainer = document.getElementById('anAddNewTeen')
    const addNewTeenBtn = document.getElementById('mbAddNewTeenBtn')

    Cancel.addEventListener('click', () => {
      mbMaineContainer.style.display = 'none'
    })

    mbImportButton.addEventListener('click', () => {
      mbMaineContainer.style.display = 'flex'
      addNewTeenContainer.style.display = 'none'
      importDatabaseContainer.style.display = 'inline'
    })

    addNewTeenBtn.addEventListener('click', () => {
      mbMaineContainer.style.display = 'flex'
      addNewTeenContainer.style.display = 'inline'
      importDatabaseContainer.style.display = 'none'
    })

    mbMaineContainer.style.display = 'none'
  }

// Members page teen Members population
  let mbTotalTeens = 0
  let mbMale = 0
  let mbFemale = 0
  let mbAlive = 0

  const tableContainer = document.getElementById('amMembersTable');

  const mbTotalTeensC = document.getElementById('mbTotalTeens');
  const mbMaleC = document.getElementById('mbMale');
  const mbFemaleC = document.getElementById('mbFemale');
  const mbAliveC = document.getElementById('mbAlive');

  tableContainer.innerHTML = ''


  tcDatabase.forEach((value, index) => {
    if(value.TcNumber !== '') {

      // Information content
        mbTotalTeens++

        if(value.Gender == 'Male') {
          mbMale++
        } else {
          mbFemale++
        }

        if(value.Outcome == 'On antiretrovirals') {
          mbAlive++
        }

      // ===========================

      const row = document.createElement('tr');

      const tcNum = document.createElement('td');
      const ArtNum = document.createElement('td')
      const fullName = document.createElement('td');
      const age = document.createElement('td');
      const sex = document.createElement('td');
      const outcome = document.createElement('td');
      const action = document.createElement('td');

      tcNum.textContent = value.TcNumber
      ArtNum.textContent = value.ArtNumber
      fullName.textContent = value.Name
      sex.textContent = value.Gender
      age.textContent = calculateAge(value.DOB);
      outcome.textContent = value.Outcome

      //button creation
      const btn = document.createElement('button')
      btn.textContent = 'View'

      btn.addEventListener('click', () => {
        alert(index)
      })

      action.appendChild(btn)

      row.appendChild(tcNum)
      row.appendChild(ArtNum)
      row.appendChild(fullName)
      row.appendChild(sex)
      row.appendChild(age)
      row.appendChild(outcome)
      row.appendChild(action)

      tableContainer.appendChild(row)
    }   
  })

  mbTotalTeensC.textContent = mbTotalTeens;
  mbMaleC.textContent = mbMale
  mbFemaleC.textContent =mbFemale
  mbAliveC.textContent = mbAlive

  const addTeenContainer = document.getElementById("anAddNewForm")

  addTeenContainer.addEventListener('submit', (event)=> {
      event.preventDefault();

      const aTcNumber = addTeenContainer.elements.anTcNumber.value
      const aArtNumber = addTeenContainer.elements.anArtNumber.value
      const aEnDate = addTeenContainer.elements.anEnrollmentDate.value
      const aName = addTeenContainer.elements.anName.value
      const aDob = addTeenContainer.elements.anDob.value
      const aGender = addTeenContainer.elements.anGender.value
      const aVillage = addTeenContainer.elements.anVillage.value
      const aPhoneNumber = addTeenContainer.elements.anPhoneNumber.value
      

      const Db = JSON.parse(localStorage.getItem('teenDatabase'))

      const str = {
        TcNumber: aTcNumber,
        ArtNumber: aArtNumber,
        EnrollmentDate: aEnDate,
        Name: aName,
        DOB: aDob,
        Gender: aGender,
        Village: aVillage,
        PhoneNumber: aPhoneNumber
      }

      Db.push(str);

      localStorage.setItem('teenDatabase', JSON.stringify(Db))

      resetForm('anAddNewForm');

      const addNewTeenContainer = document.getElementById('mbImportContainer')

      addNewTeenContainer.style.display = 'none'

      window.location.reload();
  })