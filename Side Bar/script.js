window.onload = function(){
    const sidebar = document.querySelector(".sidebar");
    const CloseBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    CloseBtn.addEventListener("click", function(){
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    searchBtn.addEventListener("click", function(){
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    function menuBtnChange(){
        if(sidebar.classList.contains("open")){
            CloseBtn.classList.replace("bx-menu", "bx-menu-alt-right")
        }else{
            CloseBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }
    }
}