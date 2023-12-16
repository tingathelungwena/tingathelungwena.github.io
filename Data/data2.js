const TC = {

  SessionHome: {
    btnNewSession: document.querySelector('.new-session-button'),
    btnDeleteSession: document.querySelector('.delete-session-button'),
    btnOpenSession: document.querySelector('.open-session-button'),
    ctnSessionListDates: document.getElementById('sessionDateList'),
    ctnTotalSessions: document.getElementById('totalSessions'),
    valIdStore: document.getElementById('idStoreOnBtnClick'),
    valTeensAttended: document.getElementById('shTeensAttended'),
    valNewlyEnrolled: document.getElementById('shNewlyEnrolled'),
    valGuardianSession: document.getElementById('shGuardianSession'),
    ModeOfContact: {
      valPhone: document.getElementById('mcPhone'),
      valText: document.getElementById('mcText'),
      valWhatsapp: document.getElementById('mcWhatsapp'),
      valHome: document.getElementById('mcHome'),
      valNone: document.getElementById('mcNone')
    },
    ReasonOfAtt: {
      valSupport: document.getElementById('roaSupport'),
      valClinic: document.getElementById('roaClinic')
    },
    AgeSex: {
      valMale1014: document.getElementById('asMale1014'),
      valFemale1014: document.getElementById('asFemale1014'),
      valMale1518: document.getElementById('asMale1518'),
      valFemale1518: document.getElementById('asFemale1518'),
      valMale19p: document.getElementById('asMale19+'),
      valFemale19p: document.getElementById('asFemale19+')
    }
  },
  NewSession: {
    frmSignInForm: {
      FormName: document.getElementById('signInForm'),
      FormFieldNames: {
        Name: 'name',
        Gender: 'gender',
        Locator: 'locator',
        PhoneNumber: 'phone',
        Age: 'age',
        ModeOfSupport: document.getElementById('modeOfSupport'),
        NewTeen: 'newTeen',
        ReasonOfAttendance: 'reason-of-att'
      }
    },
    valSessionID: document.getElementById('sessionIDValue'),
    elNsSearchInput: document.getElementById('ns-SearchInput'),
    valTeenClubDate: document.getElementById('teenClubDate'),
    valTeensToday: document.getElementById('teensToday'),
    cntTcNumber: document.getElementById('nsTeenClubNumber'),
    cntArtNumber: document.getElementById('nsArtNumber'),
    NsTable: {
      Head: document.getElementById('nsThead'),
      Body: document.getElementById('nsTbody')
    }
  },
  Pages: {
    Sessions: {
      HomePage: document.getElementById('sessionHomePage'),
      NewSession: document.getElementById('newSessionContainer')
    }
  },
  Members: {
    
  }
}

const numberLength = function (number) {
  const numberAsString = number.toString();
  return numberAsString.length;
}

const customDateFormat = function (date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const convDate = new Date(date)

  let day = convDate.getDate();

  if (numberLength(day) == 1) {
    day = `0${day}`
  }
  const monthIndex = convDate.getMonth();
  const year = convDate.getFullYear();

  const formattedDate = `${day}/${months[monthIndex]}/${year}`;
  return formattedDate;
}

// functions
const disableEnableFormInputs = function(FormID = '', type = '') {
  const Myform = document.getElementById(FormID);

  const inputElements = Myform.getElementsByTagName('input');

    if (type === 'disable') {
      for (let i = 0; i < inputElements.length; i++) {
          inputElements[i].disabled = true;
      }

    } else if (type === 'enable') {
      for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].disabled = false;
      }

    }
}

const HideEmelent = function(ElementID = '') {
  const element = document.getElementById(ElementID);
  element.style.display = 'none'
}

const ShowEmelent = function(ElementID = '', DisplayStyle = '') {
  const element = document.getElementById(ElementID);
  element.style.display = DisplayStyle
}

const resetForm = function(formID = '') {
    // Get the form element
    const form = document.getElementById(formID);

    // Loop through form elements and reset checkboxes and radio buttons
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        // Skip resetting values for submit and reset inputs
        if (element.type === 'submit' || element.type === 'reset') {
            continue;
        }

        // Reset checkboxes and radio buttons (checked property)
        if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = element.defaultChecked;
        }
        // Reset the value to its default state for other inputs and textareas
        else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = element.defaultValue;
        } else if (element.tagName === 'SELECT') {
            // For select elements, reset the selected index to 0
            element.selectedIndex = 0;
        }
    }
}

const ConfMSG = function(Message = '', dFunction = () => {}) {
  const confirmationContainer = document.querySelectorAll('.confirmation-message-container')
  const clickedYes = document.querySelectorAll('.confirmation-button-yes')
  const clickedNo = document.querySelectorAll('.confirmation-button-no')
  const confMessage = document.querySelectorAll('.confirmation-message')


  confMessage.forEach((element) => {
    element.innerHTML = Message
  })

  confirmationContainer.forEach((element) => {
    element.style.display = 'flex'
  })

  clickedYes.forEach((value) => {
    value.addEventListener('click', () => {
      dFunction();

      confirmationContainer.forEach((value) => {
        value.style.display = 'none'
      })

    })
  })

  clickedNo.forEach((element) => {
    element.addEventListener('click', () => {
      confirmationContainer.forEach((value) => {
        value.style.display = 'none'
      })
    })
  })
}

TC.NewSession.NsTable.Body