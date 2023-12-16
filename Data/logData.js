const openHtmlFile = function(filepath) {
  window.location.href = filepath;
}

const gotValue = localStorage.getItem('loginStatus');

let LoginStatus = JSON.parse(gotValue) || 0;