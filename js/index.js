document.getElementById("openGallery").addEventListener("click", function() {
    let gallery = document.getElementById("galleryBox");

    // بررسی می‌کنیم که گالری باز است یا نه
    if (gallery.classList.contains("show")) {
        gallery.classList.remove("show"); // اگر باز بود، ببند
    } else {
        gallery.classList.add("show"); // اگر بسته بود، باز کن
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const indicators = document.querySelectorAll('.indicator');
    const images = document.querySelectorAll('.gallery-images img');

    // وقتی روی دایره کلیک می‌شود
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // تمام دایره‌ها را از حالت فعال خارج کن
            indicators.forEach(ind => ind.classList.remove('active'));
            // دایره کلیک شده را فعال کن
            indicator.classList.add('active');
            
            // همه تصاویر را مخفی کن
            images.forEach(img => img.style.display = 'none');
            // تصویر مربوط به این دایره را نشان بده
            images[index].style.display = 'block';
        });
    });
    
    // به طور پیش‌فرض اولین دایره فعال است
    indicators[0].classList.add('active');
    images.forEach((img, index) => {
        img.style.display = index === 0 ? 'block' : 'none';
    });
});







///slider horizontal
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".clickable-slide");

    slides.forEach((slide) => {
        slide.addEventListener("click", function () {
            let url = this.getAttribute("data-url"); // لینک مخصوص هر عکس را دریافت کن
            if (url) {
                window.location.href = url; // تغییر صفحه هنگام کلیک
            }
        });
    });
});
