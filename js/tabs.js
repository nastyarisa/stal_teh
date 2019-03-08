document.addEventListener("DOMContentLoaded", function(){
  let tabsButtons = document.querySelectorAll('.tabs__button');
  let tabsContent = document.querySelectorAll('.tabs__content-block');

  tabsButtons.forEach((item, index)=> {
    item.onclick = () => {
      let activeButton = document.querySelector('.tabs__button.active');
      let activeContent = document.querySelector('.tabs__content-block.active');
      activeButton.classList.remove('active');
      activeContent.classList.remove('active');
      item.classList.add('active');
      tabsContent[index].classList.add('active');
    }
  })
});

