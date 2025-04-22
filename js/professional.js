document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // جلوگیری از ارسال فرم به صورت معمولی

    const formData = new FormData(this);
    console.log("Form data prepared:", formData); // بررسی داده‌های فرم

    fetch("http://localhost:3001/submit-form", {
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log("Response Status:", response.status); // بررسی وضعیت پاسخ
        return response.json();  // فرض می‌کنیم که سرور جواب را به صورت JSON ارسال می‌کند
    })
    .then(data => {
        console.log("Form submitted successfully:", data);
        // نمایش پیامی مبنی بر موفقیت یا انجام سایر کارها
    })
    .catch(error => {
        console.error("Error submitting form:", error);
        // نمایش پیامی مبنی بر خطا
    });
});
