    //get html elements
    // const logoutElement = document.querySelectorall('.js-logout');
    const logoutElement = document.querySelectorAll('.js-logout');

    const confElement = document.querySelector('.js-confirmation');
    const yesElement = document.querySelector('.js-yes');
    const noElement = document.querySelector('.js-no');
    
    yesElement.addEventListener('click',() => {
      confElement.style.display = 'none';
      openHtmlFile('/index.html')

      LoginStatus = 0
      localStorage.setItem('loginStatus',JSON.stringify(LoginStatus))
    })
    
    noElement.addEventListener('click',() => {
      confElement.style.display = 'none';
    })
    

   /*  logoutElement.addEventListener('click', () => {
      msgbox('Are you sure you want to logout?','Confirmation');

      confElement.style.display = 'block'
      alert('hello')
    }) */

    logoutElement.forEach((Element)=> {
      Element.addEventListener('click', () => {
        msgbox('Are you sure you want to logout?','Confirmation');

        confElement.style.display = 'block' 
      })
    })
  