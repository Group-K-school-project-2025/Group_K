document.addEventListener("DOMContentLoaded", function () {
    // باز و بسته کردن گالری
    const openGalleryBtn = document.getElementById("openGallery");
    const galleryBox = document.getElementById("galleryBox");

    if (openGalleryBtn && galleryBox) {
        // نمایش گالری به‌صورت پیش‌فرض هنگام بارگذاری صفحه
        galleryBox.classList.add("show");

        // باز و بسته کردن گالری با کلیک روی دکمه
        openGalleryBtn.addEventListener("click", function () {
            galleryBox.classList.toggle("show");
        });
    }

    // برای تنظیم تصاویر و ایندیکاتورها
    const indicators = document.querySelectorAll('.indicator');
    const images = document.querySelectorAll('.gallery-images img');
    let currentIndex = 0;

    if (indicators.length && images.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function () {
                indicators.forEach(ind => ind.classList.remove('active'));
                indicator.classList.add('active');
                images.forEach(img => img.style.display = 'none');
                images[index].style.display = 'block';
                currentIndex = index;
            });
        });

        // تنظیم اولیه ایندیکاتورها و تصاویر
        indicators[0].classList.add('active');
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });

        // تغییر خودکار تصویر هر 5 ثانیه
        function autoChangeImage() {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';

            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[currentIndex].classList.add('active');
        }

        setInterval(autoChangeImage, 5000);
    }

    // تعریف تابع goToCategory
    function goToCategory(categoryName) {
        window.location.href = `Category.html?category=${categoryName}`;
    }

    // تنظیم تصاویر قابل کلیک در گالری
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1]; // گرفتن نام دسته‌بندی از onclick
            goToCategory(category); // انتقال به صفحه دسته‌بندی
        });
    });

    // slider horizontal clickable items
    let slides = document.querySelectorAll(".clickable-slide");
    slides.forEach((slide) => {
        slide.addEventListener("click", function () {
            let url = this.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });
});
