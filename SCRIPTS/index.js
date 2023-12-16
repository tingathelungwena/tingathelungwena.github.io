
//loging into into the the system code

//getting html elements
const loginForm = document.getElementById('loginForm');
const validation = document.querySelector('.js-validation');

let checkUser = false;

function checkCredentials() {
  for (let index = 0; index < usersDatabase.length; index++) {
    const value = usersDatabase[index];

    const username = loginForm['username'].value;
    const password = loginForm['password'].value;

    if(value.Username === username && value.Password === password) {
      checkUser = true
      break
    }
  }
}


loginForm.addEventListener('submit', Element => {
  Element.preventDefault();

  checkCredentials();

  if(checkUser) {
    openHtmlFile('/HTML/homePage.html');
    LoginStatus = 1
    localStorage.setItem('loginStatus', JSON.stringify(LoginStatus));

  } else {
    validation.style.display = 'block';
  }

  setTimeout(() => {
    validation.style.display = 'none';
  }, 2000);
})




