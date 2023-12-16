// variables for searching

const nsSearchBtn = document.getElementById('ns-SearchBtn');
let nsSearchInput = document.getElementById('ns-SearchInput');

const nsTcNumber = document.getElementById('nsTeenClubNumber')
const nsArtNumber = document.getElementById('nsArtNumber')

function searchTeen(byWhat = '') {
  for (let index = 0; index < tcDatabase.length; index++) {
    const element = tcDatabase[index];

    if(element[byWhat] === nsSearchInput.value) {
      nsTcNumber.innerText = `TC-${element.TcNumber}`;
      nsArtNumber.innerText = `ARV-${element.ArtNumber}`;
      localStorage.setItem('SearchedTCNum',JSON.stringify(element.TcNumber));
      signInForm['name'].value = element.Name
      signInForm['gender'].value = element.Gender
      signInForm['locator'].value = element.Village

      if (element.PhoneNumer === undefined) {
        signInForm['phone'].value = 'None'
      } else{
        signInForm['phone'].value = element.PhoneNumer
      }

      nsSearchInput.value = '';

      break
    }
  }
}

nsSearchInput.addEventListener('keyup',(event) => {
  event.preventDefault();

  nsSearchInput = document.getElementById('ns-SearchInput');
  const nsSearchBy = document.getElementById('ns-searchBy');

  if(nsSearchInput.value == '' && event.keyCode === 13) {
    alert('Search Value is required.')
    return 0;
  }

  if(event.keyCode === 13 && nsSearchBy.value === 'TC Number' ) {
    resetForm('signInForm')
    searchTeen('TcNumber')
    disableEnableFormInputs('signInForm', 'enable')
    HideEmelent('enableFormMessage');
  }else if(event.keyCode === 13 && nsSearchBy.value === 'ART Number') {
    resetForm('signInForm')
    searchTeen('ArtNumber')
    disableEnableFormInputs('signInForm', 'enable')
    HideEmelent('enableFormMessage');
  }

})

const signInForm = document.getElementById('signInForm');
const fullName = signInForm['name'].value
const gender = signInForm['gender'].value
//const locator = 




