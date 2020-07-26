document.addEventListener("DOMContentLoaded", function(){
    let gallery = document.getElementById('lightgallery');
    const imageCount = 28;

    for (let i = 1; i <= imageCount; i++) {
        let src = `img/gallery/i${i}.jpg`
        let bigSrc = `img/gallery/big/i${i}.jpg`
        createGalleryItem(src, bigSrc);
    }

    function createGalleryItem(src, bigSrc) {
        let a = document.createElement('a');
        a.href = bigSrc;
        let img = document.createElement('img');
        img.src = src;
        img.classList.add('gallery__item');
        gallery.appendChild(a)
        a.appendChild(img)
    };

    $("#lightgallery").lightGallery();
});