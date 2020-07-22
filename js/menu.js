document.addEventListener("DOMContentLoaded", function(){
  let menuItem = document.querySelectorAll('.menu-item');
  let page = document.body.getAttribute('data-page');

  menuItem.forEach((item)=> {
    let href = item.getAttribute('href');
    if (href.includes(page)) {
      item.classList.add('active');
    }
  })


  let burger = document.querySelector('.burger'),
    header = document.querySelector('.header');

  burger.onclick = function() {
    header.classList.toggle('menu-opened');
  }
});

