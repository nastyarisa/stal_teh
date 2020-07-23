document.addEventListener("DOMContentLoaded", function(){
  let tabsButtons = document.querySelectorAll('.tabs__button');
  let tabsContent = document.querySelectorAll('.tabs__content-block');

  for (let i = 0; i < tabsButtons.length; i++) {
    let item = tabsButtons[i];
    item.onclick = () => {
      let activeButton = document.querySelector('.tabs__button.active');
      let activeContent = document.querySelector('.tabs__content-block.active');
      activeButton.classList.remove('active');
      activeContent.classList.remove('active');
      item.classList.add('active');
      tabsContent[i].classList.add('active');
    }
  }

  let tabsToggles = document.querySelector('.tabs__toggles');
  tabsToggles.onclick = () => {
    console.log('tabs_toggles onclick')
    tabsToggles.classList.toggle('tabs-open')
  }
});

