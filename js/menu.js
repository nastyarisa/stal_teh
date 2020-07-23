document.addEventListener("DOMContentLoaded", function(){
  let menuItem = document.querySelectorAll('.menu-item');
  let page = document.body.getAttribute('data-page');

  for (let i = 0; i < menuItem.length; i++) {
    let item = menuItem[i];
    let href = item.getAttribute('href');
    if (href.indexOf(page) >= 0) {
      item.classList.add('active');
    }
  }

  let burger = document.querySelector('.burger'),
    header = document.querySelector('.header');

  burger.onclick = function() {
    header.classList.toggle('menu-opened');
  }
});

