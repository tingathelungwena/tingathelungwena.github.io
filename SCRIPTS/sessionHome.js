{//home sessions code here
  let ssHomeSessionId;
  let numEl;

  const sessionCount = function() {
    const container = TC.SessionHome.ctnSessionListDates
    numEl = container.children.length
  }

  const clearButtons = () => {
    const container = TC.SessionHome.ctnSessionListDates

    if (numEl !== 0) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  }

  function SessionHomeLoad() {
    let total = 0
    let cont =

    sessionCount();

    clearButtons();

    numberOfSessionDB.forEach((element,index) => {

      const btns = TC.SessionHome.ctnSessionListDates.getElementsByTagName('button')

      const button = document.createElement('button');
      button.textContent = element.date;

      if(index === 0) {
        button.style.backgroundColor = 'blue';
        button.style.color = 'white';
        ssHomeSessionId = numberOfSessionDB[index].id
        TC.SessionHome.valIdStore.innerHTML = ssHomeSessionId
      }

      button.style.fontSize = '18px'

      button.addEventListener('click', () => {
        handleClick(index);
        button.style.backgroundColor = 'blue'
        button.style.color = 'white'
        //alert(numberOfSessionDB[index].name)
      });

      TC.SessionHome.ctnSessionListDates.appendChild(button);
      total++
    });

    TC.SessionHome.ctnTotalSessions.innerHTML = `${total} Sessions`

    // TC.SessionHome.valIdStore.style.display = 'none'
  }

  function handleClick(index) {
    const buttons = TC.SessionHome.ctnSessionListDates.getElementsByTagName('button')
    ssHomeSessionId = numberOfSessionDB[index].id

    for (const button of buttons) {
      button.style.backgroundColor = 'white'
      button.style.color = 'black' 
    }

    TC.SessionHome.valIdStore.innerHTML = ssHomeSessionId
    refreshHomePage();
  }

  SessionHomeLoad();

  TC.SessionHome.btnOpenSession.addEventListener('click', () => {

    sessionCount()

    if (numEl === 0) {
      popMessage('You dont have any sessions, click new session to create one.') 
    } else {
      const id = TC.SessionHome.valIdStore.innerHTML

      for (let index = 0; index < numberOfSessionDB.length; index++) {
        const element = numberOfSessionDB[index];
        
        if(element.id === Number(id)) {
          TC.NewSession.valSessionID.innerHTML = element.id;
          TC.NewSession.valTeenClubDate.innerHTML = customDateFormat(element.date);
    
          TC.Pages.Sessions.HomePage.style.display = 'none'
          TC.Pages.Sessions.NewSession.style.display = 'block'
          break;
        }
      }
    
      disableEnableFormInputs('signInForm','disable');
      refreshTable2();
    }

  })

  let sessionNamee;
  let SessionIndexx;


  sessionCount();

    function refreshHomePage () {
        let teenAttended;
        let newlyEnrolled = 0;
        let guardianSession = 0;
        let mocPhone = 0;
        let mocText = 0;
        let mocWhatsapp = 0;
        let mocHome = 0;
        let mocNone = 0;
        let roaSupport = 0;
        let roaClinic = 0;
        let asMale1014 = 0;
        let asFemale1014 = 0;
        let asMale1518 = 0;
        let asFemale1518 = 0;
        let asMale19p = 0;
        let asFemale19p = 0;
    
        getSessionName(TC.SessionHome.valIdStore.innerHTML)

    //if (sessionName) {
      if(sessionName !== undefined){
        ckDB =   signInDatabase[SessionIndex][sessionName]
      } else {
        ckDB =[]
      }
      
      // getting values;
      teenAttended = ckDB.length
      
      ckDB.forEach((value) => {
        // newly enrolled
        if (value.newInTeenClub == 'Yes') {
          newlyEnrolled++
        }

        // Phone
        if (value.sbyPhone == 'Phone') {
          mocPhone++
        }

        // Text
        if (value.sbyText == 'Text') {
          mocText++
        }

        // Whatsapp
        if (value.sbyWhatsapp == 'Whatsapp') {
          mocWhatsapp++
        }

        // Home
        if (value.sbyHome == 'Home') {
          mocHome++
        }

        // None
        if (value.sbyNone == 'None') {
          mocNone++
        }

        // None
        if (value.reasonOfAttendance == 'Support') {
          roaSupport++
        } else {
          roaClinic++
        }

        if(value.age >= 10 && value.age <= 14) {
          for (let index = 0; index < tcDatabase.length; index++) {
            const element = tcDatabase[index];

            if (element.TcNumber === value.tcNumber) {
              if(element.Gender === 'Male') {
                asMale1014++
                break;
              } else if(element.Gender === 'Female') {
                asFemale1014++
                break;
              } 
          }
          }
        }

        if(value.age >= 15 && value.age <= 18) {

          for (let index = 0; index < tcDatabase.length; index++) {
            const element = tcDatabase[index];

            if (element.TcNumber === value.tcNumber) {
              if(element.Gender === 'Male') {
                asMale1518++
                break;
              } else {
                asFemale1518++
                break;
              } 
            }
          }
        }

        if(value.age > 18) {
          for (let index = 0; index < tcDatabase.length; index++) {
            const element = tcDatabase[index];

            if (element.TcNumber === value.tcNumber) {
              if(element.Gender === 'Male') {
                asMale19p++
                break;
              } else {
                asFemale19p++
                break;
              } 
            }
          }
        }
      })

      // Assigning values to innerHTML
      assignValues(TC.SessionHome.valTeensAttended,teenAttended)
      assignValues(TC.SessionHome.valNewlyEnrolled,newlyEnrolled)

      function assignValues(element, value) {
        element.innerHTML = value

        if (value != 0) {
          element.style.color = 'blue'
          element.style.fontWeight = 'bold'
          element.style.cursor = 'pointer'
        } else {
          element.style.color = 'black'
          element.style.fontWeight = ''
          element.style.cursor = ''
        }
      }

      { //values here
        assignValues(TC.SessionHome.ModeOfContact.valPhone,mocPhone)


        assignValues(TC.SessionHome.ModeOfContact.valText,mocText)

        assignValues(TC.SessionHome.ModeOfContact.valWhatsapp, mocWhatsapp)

        assignValues(TC.SessionHome.ModeOfContact.valHome, mocHome)

        assignValues(TC.SessionHome.ModeOfContact.valNone, mocNone)

        assignValues(TC.SessionHome.ReasonOfAtt.valSupport, roaSupport)

        assignValues(TC.SessionHome.ReasonOfAtt.valClinic, roaClinic)

        assignValues(TC.SessionHome.AgeSex.valMale1014, asMale1014)

        assignValues(TC.SessionHome.AgeSex.valFemale1014, asFemale1014)

        assignValues(TC.SessionHome.AgeSex.valMale1518, asMale1518)

        assignValues(TC.SessionHome.AgeSex.valFemale1518, asFemale1518)

        assignValues(TC.SessionHome.AgeSex.valMale19p, asMale19p)

        assignValues(TC.SessionHome.AgeSex.valFemale19p, asFemale19p)

        console.log(asFemale1014);
        console.log(asFemale1518);
        console.log(asFemale19p);
      }
    }

  refreshHomePage();
  //}


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

  const deleteSession = function() {
    getSessionName(TC.SessionHome.valIdStore.innerHTML)

    ckDB =   signInDatabase[SessionIndex]

    signInDatabase.splice(SessionIndex, 1)
    numberOfSessionDB.splice(SessionIndex, 1)

    localStorage.setItem('signInDatabase', JSON.stringify(signInDatabase))
    localStorage.setItem('numberOfSessionDB', JSON.stringify(numberOfSessionDB))

    SessionHomeLoad();

    popMessage('Session has been deleted successfully!')
  }

  TC.SessionHome.btnDeleteSession.addEventListener('click', () => {
    sessionCount();
    if (numEl === 0) {
      popMessage('Sorry, there are no sessions to delete.')
    } else {
      ConfMSG('Are you sure you want to delete the selected session?',deleteSession);
      TC.NewSession.NsTable.Body.innerHTML = '';
    }
  })

}