document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic form validation
        if (!name || !phone || !email || !message) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }

        // Phone validation (Vietnamese phone number format)
        const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (!phoneRegex.test(phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ.');
            return;
        }

        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!');
        contactForm.reset();
    });

    // Real-time phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        if (value.length >= 4 && value.length <= 6) {
            value = value.slice(0, 3) + '.' + value.slice(3);
        } else if (value.length >= 7) {
            value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6);
        }
        e.target.value = value;
    });
}); 