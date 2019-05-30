document.addEventListener("DOMContentLoaded", function(){
    let gallery = document.getElementById('gallery');
    const imageCount = 28;

    for (let i = 1; i <= imageCount; i++) {
        let src = `img/gallery/i${i}.jpg`
        createImg(src);
    }

    function createImg(href) {
        let img = document.createElement('img');
        img.src = href;
        img.classList.add('gallery__item');
        gallery.appendChild(img)
    };

})