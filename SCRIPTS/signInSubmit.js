const Myform = TC.NewSession.frmSignInForm.FormName

const signInArray = ['tcNumber','age', 'sbyPhone', 'sbyText', 'sbyWhatsapp','sbyHome', 'sbyNone', 'newInTeenClub', 'reasonOfAttendance','refreshButton', 'regUpdate']



let sessionName;
let SessionIndex;
let row;

const getSessionName = function(getId) {
  //const getId = TC.NewSession.valSessionID.innerHTML
 // const getId = TC.SessionHome.valSessionID.innerHTML


  for (let index = 0; index < numberOfSessionDB.length; index++) {
    const value = numberOfSessionDB[index];
    if (getId == value.id) {
      sessionName = value.name
    } 


  }

  let Checking;

  for (let index = 0; index < signInDatabase.length; index++) {
    const value = signInDatabase[index];
    Checking = (value[sessionName])

    if (Checking) {
      SessionIndex = index
      break;
    }
  }
}




Myform.addEventListener('submit', (element) => {

  element.preventDefault();

  getSessionName(TC.SessionHome.valIdStore.innerHTML || TC.NewSession.valSessionID.innerHTML);

  const name = TC.NewSession.frmSignInForm.FormFieldNames.Name
  const age = TC.NewSession.frmSignInForm.FormFieldNames.Age
  const gender = TC.NewSession.frmSignInForm.FormFieldNames.Gender
  const locator = TC.NewSession.frmSignInForm.FormFieldNames.Locator
  const phone = TC.NewSession.frmSignInForm.FormFieldNames.PhoneNumber
  const ModeOfSupport = TC.NewSession.frmSignInForm.FormFieldNames.ModeOfSupport
  const NewTeen = TC.NewSession.frmSignInForm.FormFieldNames.NewTeen
  const reasonOfAttendance = TC.NewSession.frmSignInForm.FormFieldNames.ReasonOfAttendance
  const refreshButton = 'Not Recieved'
  const regUpdate = 'Not Updated'


  const tcNum = JSON.parse(localStorage.getItem('SearchedTCNum'))


  const checkboxes = ModeOfSupport.querySelectorAll('input[type="checkbox"')

  let checkedCount = 0;

  checkboxes.forEach(checkbox => {
    if(checkbox.checked) {
      checkedCount++;
    }
  });

  if(checkedCount === 0) {
    popMessage('Please select at least one mode of support')
    return;
  }

  const signInValues = [];
  const signInFieldObject = {};

  const ckDB =   signInDatabase[SessionIndex][sessionName]


  let checks;


  if(ckDB.length > 0) {
    for (let index = 0; index < ckDB.length; index++) {
      const value = ckDB[index];
      if (value.tcNumber == tcNum) {
        checks = 125;
        break;
      }
    }
  }

  if (!checks) {
      

    signInValues.push(tcNum);
    signInValues.push(Myform[age].value)

    checkboxes.forEach(checkbox => {
      if(checkbox.checked) {
        signInValues.push(checkbox.value)
      }else {
        signInValues.push('')
      } 
    });

    signInValues.push(Myform[NewTeen].value);
    signInValues.push(Myform[reasonOfAttendance].value);
    signInValues.push(refreshButton)
    signInValues.push(regUpdate)

    let i = -1;
    // function submitFormData () {
      signInArray.forEach((value) => {
        i++
        signInFieldObject[value] = signInValues[i]
      })

      let tcDB;

      for (let index = 0; index < tcDatabase.length; index++) {
        const value = tcDatabase[index];
        if (value.TcNumber == tcNum) {
          tcDB = value
          break;
        }
      }

      tcDB.Gender = Myform[gender].value;
      tcDB.Village = Myform[locator].value;
      tcDB.PhoneNumber = Myform[phone].value;

      localStorage.setItem('teenDatabase',JSON.stringify(tcDatabase));

      signInDatabase[SessionIndex][sessionName].push(signInFieldObject);

      localStorage.setItem('signInDatabase',JSON.stringify(signInDatabase))

      resetForm('signInForm');

      document.getElementById('name').focus();

      disableEnableFormInputs('signInForm','disable');

      ShowEmelent('enableFormMessage','flex')

      HideEmelent('nsArtNumber');
      HideEmelent('nsTeenClubNumber');
      refreshTable();
      TC.NewSession.elNsSearchInput.focus();
      popMessage('Teen has been submitted successfully.')

      console.log(signInDatabase)
    // }
  } else {
    popMessage('The Data has already been entered');
  }

})


const refreshTable = function () {
  const getId = TC.NewSession.valSessionID.innerHTML
  for (let index = 0; index < numberOfSessionDB.length; index++) {
    const value = numberOfSessionDB[index];
    if (getId == value.id) {
      sessionName = value.name
    } 
  }



  let Checking;

  for (let index = 0; index < signInDatabase.length; index++) {
    const value = signInDatabase[index];
    Checking = (value[sessionName])

    if (Checking) {
      SessionIndex = index
      break;
    }
  }
  const ckDB =   signInDatabase[SessionIndex][sessionName]

  let tableData;
  let rowNumber = 0;
  let age;
  let roa;
  let name;
  let sex;
  let tcNumber;

  
  ckDB.forEach((value, index) => {

    rowNumber++;
    tcNumber = value.tcNumber;
    age = value.age;
    roa = value.reasonOfAttendance;

    for (let index = 0; index < tcDatabase.length; index++) {
      const element = tcDatabase[index];
      
      if(element.TcNumber == tcNumber) {
        name = element.Name;
        sex = element.Gender;
        break;
      }
    }

    // Creating a table
    row = document.createElement('tr')

    const CrowNumber = document.createElement('td')
    CrowNumber.textContent = rowNumber

    const CtcNumber = document.createElement('td')
    CtcNumber.textContent = tcNumber

    const Cname = document.createElement('td')
    Cname.textContent = name

    const Cage = document.createElement('td');
    Cage.textContent = age

    const Csex = document.createElement('td');
    Csex.textContent = sex

    const Croa = document.createElement('td');
    Croa.textContent = roa

    const action = document.createElement('td')
    const bt = document.createElement('button')
    bt.textContent = 'Delete'
    bt.style.cursor = 'pointer'
    bt.style.padding = '3px'

    action.appendChild(bt)

    row.appendChild(CrowNumber)
    row.appendChild(CtcNumber)
    row.appendChild(Cname)
    row.appendChild(Cage)
    row.appendChild(Csex)
    row.appendChild(Croa)
    row.appendChild(action)

    bt.addEventListener('click', () => {
      ConfMSG("Are you sure you want to delete the record?", () => {
        ckDB.splice(index,1)
        refreshTable2()
        localStorage.setItem('signInDatabase',JSON.stringify(signInDatabase))
      })
    })
    
  })

  TC.NewSession.NsTable.Body.appendChild(row)
  TC.NewSession.valTeensToday.innerHTML = rowNumber
}

const refreshTable2 = function () {
  const getId = TC.NewSession.valSessionID.innerHTML
  for (let index = 0; index < numberOfSessionDB.length; index++) {
    const value = numberOfSessionDB[index];
    if (getId == value.id) {
      sessionName = value.name
    } 
  }

  TC.NewSession.NsTable.Body.innerHTML = ''

  let Checking;

  for (let index = 0; index < signInDatabase.length; index++) {
    const value = signInDatabase[index];
    Checking = (value[sessionName])

    if (Checking) {
      SessionIndex = index
      break;
    }
  }
  const ckDB =   signInDatabase[SessionIndex][sessionName]

  let tableData;
  let rowNumber = 0;
  let age;
  let roa;
  let name;
  let sex;
  let tcNumber;

  
  ckDB.forEach((value, index) => {

    rowNumber++;
    tcNumber = value.tcNumber;
    age = value.age;
    roa = value.reasonOfAttendance;

    for (let index = 0; index < tcDatabase.length; index++) {
      const element = tcDatabase[index];
      
      if(element.TcNumber == tcNumber) {
        name = element.Name;
        sex = element.Gender;
        break;
      }
    }

    // Creating a table
    row = document.createElement('tr')

    const CrowNumber = document.createElement('td')
    CrowNumber.textContent = rowNumber

    const CtcNumber = document.createElement('td')
    CtcNumber.textContent = tcNumber

    const Cname = document.createElement('td')
    Cname.textContent = name

    const Cage = document.createElement('td');
    Cage.textContent = age

    const Csex = document.createElement('td');
    Csex.textContent = sex

    const Croa = document.createElement('td');
    Croa.textContent = roa

    const action = document.createElement('td')
    const bt = document.createElement('button')
    bt.textContent = 'Delete'
    bt.style.cursor = 'pointer'
    bt.style.padding = '3px'

    action.appendChild(bt)

    row.appendChild(CrowNumber)
    row.appendChild(CtcNumber)
    row.appendChild(Cname)
    row.appendChild(Cage)
    row.appendChild(Csex)
    row.appendChild(Croa)
    row.appendChild(action)

    bt.addEventListener('click', () => {
      ConfMSG("Are you sure you want to delete the record?", () => {
        ckDB.splice(index,1)
        refreshTable2()
        localStorage.setItem('signInDatabase',JSON.stringify(signInDatabase))
      })
    })

    TC.NewSession.NsTable.Body.appendChild(row)
  })


  TC.NewSession.valTeensToday.innerHTML = rowNumber
}




