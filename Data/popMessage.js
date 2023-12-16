
function popMessage(Message = '') {
  let popContainer = document.querySelectorAll('.popup-message')
  const popMsg = document.querySelectorAll('#popMsg');
  let timeId;

  popMsg.forEach((value)=> {
    value.innerHTML = Message;
    console.log(value)
  })


  
/*   var audio = new Audio('/Sounds/user_account_control.mp3');

  audio.play(); */

  popContainer.forEach((value) => {
    value.style.display = 'flex'
    console.log(value)
  })

  

  timeId = setTimeout(() => {
    popContainer.forEach((value) => {
      value.style.display = 'none'
    }) 
  }, 2500);

  const popBtn = document.querySelectorAll('#popBtn');
  popBtn.forEach((value)=> {
    value.addEventListener('click', () => {
      popContainer.forEach((value) => {
        value.style.display = 'none'
      }) 
    })
  })
}


