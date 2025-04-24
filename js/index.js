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

    const isMobile = window.innerWidth < 768;

    if (indicators.length && images.length) {
        if (isMobile) {
            // در حالت موبایل: فقط یک تصویر نمایش داده شود
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function () {
                    indicators.forEach(ind => ind.classList.remove('active'));
                    indicator.classList.add('active');
                    images.forEach(img => img.style.display = 'none');
                    images[index].style.display = 'block';
                    currentIndex = index;
                });
            });

            // حالت اولیه
            indicators[0].classList.add('active');
            images.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });

            // اسلاید خودکار
            function autoChangeImage() {
                images[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].style.display = 'block';
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[currentIndex].classList.add('active');
            }

            setInterval(autoChangeImage, 5000);
        } else {
            // در حالت دسکتاپ: همه تصاویر نشان داده شوند
            images.forEach(img => {
                img.style.display = 'block';
            });
        }
    }

    // کلیک روی هر تصویر گالری برای رفتن به صفحه دسته‌بندی
    function goToCategory(categoryName) {
        window.location.href = `Category.html?category=${categoryName}`;
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            goToCategory(category);
        });
    });

    // اسلایدهای کلیک‌پذیر
    let slides = document.querySelectorAll(".clickable-slide");
    slides.forEach((slide) => {
        slide.addEventListener("click", function () {
            let url = this.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });

    // دکمه‌های اسکرول افقی گالری
    const gallery = document.querySelector('.gallery-images');
    const scrollAmount = 500;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn && gallery) {
        prevBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});
