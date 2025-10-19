/**
 * فایل اسکریپت اصلی سایت فروشگاه امیری
 * بهینه شده و حذف کدهای غیرضروری
 */

// متغیرهای عمومی
let slideIndex = 0;
let slides, dots, slideInterval;

// متغیرهای مربوط به اسلایدر ویژگی‌ها
let featureSlideIndex = 0;
let featureSlides, featureDots, featureSlideInterval;

// توابع مدیریت مودال‌ها
function toggleModal(modal, isOpen) {
  if (!modal) return;
  
  const backdrop = document.getElementById('modal-backdrop');
  
    if (isOpen) {
        modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.classList.add('modal-open');
    } else {
        modal.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function isElementVisible(element) {
  if (!element) return false;
    return element.classList.contains('active');
}

function closeAllModals() {
  const modals = document.querySelectorAll('.profile-panel, .search-overlay, .mobile-menu');
  modals.forEach(modal => toggleModal(modal, false));
}

// تابع برای فرمت‌بندی قیمت
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// تابع برای نمایش پیام‌ها
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = document.createElement('i');
  
  switch (type) {
    case 'success':
      icon.className = 'ri-check-line';
      break;
    case 'error':
      icon.className = 'ri-error-warning-line';
      break;
    case 'info':
      icon.className = 'ri-information-line';
      break;
    case 'warning':
      icon.className = 'ri-alert-line';
      break;
  }
  
  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  
  toast.appendChild(icon);
  toast.appendChild(messageSpan);
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// تابع برای نمایش اعلان‌ها
function showNotification(message, type = "info") {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icon = document.createElement('i');
  switch (type) {
    case 'success':
      icon.className = 'ri-check-line';
      break;
    case 'error':
      icon.className = 'ri-error-warning-line';
      break;
    case 'info':
      icon.className = 'ri-information-line';
      break;
    case 'warning':
      icon.className = 'ri-alert-line';
                    break;
  }
  
  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'notification-close';
  closeBtn.innerHTML = '<i class="ri-close-line"></i>';
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
  
  notification.appendChild(icon);
  notification.appendChild(messageSpan);
  notification.appendChild(closeBtn);
  
  const container = document.querySelector('.notification-container') || (() => {
    const newContainer = document.createElement('div');
    newContainer.className = 'notification-container';
    document.body.appendChild(newContainer);
    return newContainer;
  })();
  
  container.appendChild(notification);
  
            setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
            setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// توابع مربوط به اسلایدر اصلی
function showSlide(n) {
  if (!slides || slides.length === 0) return;
  
  // بررسی محدوده اسلایدها
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  
  // غیرفعال کردن همه اسلایدها و نقاط
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // فعال کردن اسلاید و نقطه جاری
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function changeSlide(n) {
  clearInterval(slideInterval); // توقف اسلاید خودکار
  slideIndex += n;
  showSlide(slideIndex);
  startSlideInterval(); // شروع مجدد اسلاید خودکار
}

function currentSlide(n) {
  clearInterval(slideInterval); // توقف اسلاید خودکار
  slideIndex = n;
  showSlide(slideIndex);
  startSlideInterval(); // شروع مجدد اسلاید خودکار
}

    function startSlideInterval() {
        slideInterval = setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
        }, 5000); // هر 5 ثانیه
    }

// تابع برای شمارنده معکوس تخفیفات ویژه
function updateCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  // تاریخ پایان تخفیفات (مثلاً 2 روز دیگر)
    const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  endDate.setHours(18);
  endDate.setMinutes(45);
  endDate.setSeconds(33);
  
  // بروزرسانی شمارنده هر ثانیه
  setInterval(() => {
    const now = new Date();
    const diff = endDate - now;
        
        if (diff <= 0) {
      // زمان به پایان رسیده
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
            return;
        }
        
    // محاسبه زمان باقیمانده
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
    // نمایش زمان باقیمانده
    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }, 1000);
}

// توابع مربوط به اسلایدر حرفه‌ای و مدرن
function initMainSlider() {
  const sliderContainer = document.querySelector('.hero-slider .slider-container');
  if (!sliderContainer) return;
  
  slides = document.querySelectorAll('.hero-slider .slider-slide');
  dots = document.querySelectorAll('.hero-slider .indicator');
  const prevBtn = sliderContainer.querySelector('.prev');
  const nextBtn = sliderContainer.querySelector('.next');
  
  if (slides.length === 0) return;
  
  // اضافه کردن رویدادهای کلیک
  if (prevBtn) {
    prevBtn.addEventListener('click', () => changeSlide(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => changeSlide(1));
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index));
  });
  
  // شروع اسلایدر
  showSlide(0);
  startSlideInterval();
  
  // توقف اسلاید خودکار هنگام هاور روی اسلایدر
  sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
  sliderContainer.addEventListener('mouseleave', startSlideInterval);
}

// توابع مربوط به اسلایدر بخش محصولات
function initProductsSlider() {
  const mainSlider = document.getElementById('mainSlider');
  if (!mainSlider) return;
  
  const slides = mainSlider.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let autoSlideInterval;
  
  function showProductSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
            } else {
      currentSlide = index;
    }
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showProductSlide(currentSlide + 1);
    }, 5000);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // اضافه کردن رویدادهای کلیک
  document.querySelector('.prev-arrow')?.addEventListener('click', () => {
    showProductSlide(currentSlide - 1);
    stopAutoSlide();
    startAutoSlide();
  });
  
  document.querySelector('.next-arrow')?.addEventListener('click', () => {
    showProductSlide(currentSlide + 1);
    stopAutoSlide();
    startAutoSlide();
  });
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showProductSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });
  
  // اضافه کردن رویدادهای هاور
  mainSlider.addEventListener('mouseenter', stopAutoSlide);
  mainSlider.addEventListener('mouseleave', startAutoSlide);
  
  // شروع اسلایدر
  showProductSlide(0);
  startAutoSlide();
  
  // تنظیم سوایپ برای موبایل
  setupTouchSwipe(mainSlider, () => {
    showProductSlide(currentSlide - 1);
    stopAutoSlide();
    startAutoSlide();
  }, () => {
    showProductSlide(currentSlide + 1);
    stopAutoSlide();
    startAutoSlide();
  });
}

// تابع برای سوایپ در موبایل
function setupTouchSwipe(element, onSwipeRight, onSwipeLeft) {
  if (!element) return;
  
  let startX, startY, distX, distY;
  const threshold = 50; // حداقل فاصله برای تشخیص سوایپ
  const restraint = 100; // حداکثر انحراف عمودی
  
  element.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
  }, { passive: true });
  
  element.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    distX = touch.pageX - startX;
    distY = Math.abs(touch.pageY - startY);
    
    // اگر حرکت افقی بیشتر از آستانه و انحراف عمودی کمتر از محدودیت باشد
    if (Math.abs(distX) >= threshold && distY <= restraint) {
      if (distX > 0) {
        // سوایپ به راست
        if (onSwipeRight) onSwipeRight();
    } else {
        // سوایپ به چپ
        if (onSwipeLeft) onSwipeLeft();
      }
    }
  }, { passive: true });
}

// تابع برای فیلتر محصولات در بخش محصولات پرفروش
function setupProductFilters() {
  const filterBtns = document.querySelectorAll('.trending-filters .filter-btn');
  const productCards = document.querySelectorAll('.trending-grid .product-card');
  
  if (filterBtns.length === 0 || productCards.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // حذف کلاس active از همه دکمه‌ها
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // اضافه کردن کلاس active به دکمه کلیک شده
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // نمایش یا مخفی کردن محصولات بر اساس فیلتر
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// توابع مربوط به فرم‌های احراز هویت
function setupAuthForms() {
  const profilePanel = document.getElementById('profile-panel');
  if (!profilePanel) return;
  
  const loginForm = profilePanel.querySelector('.login-form');
  const registerForm = profilePanel.querySelector('.register-form');
  const otpForm = profilePanel.querySelector('.otp-form');
  const resetForm = profilePanel.querySelector('.reset-form');
  
  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');
  const otpLoginBtn = document.getElementById('otp-login-btn');
  const backToLogin = document.getElementById('back-to-login');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const backToLoginReset = document.getElementById('back-to-login-reset');
  
  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    });
  }
  
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
  
  if (otpLoginBtn) {
    otpLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      otpForm.classList.add('active');
    });
  }
  
  if (backToLogin) {
    backToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      otpForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
  
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      resetForm.classList.add('active');
    });
  }
  
  if (backToLoginReset) {
    backToLoginReset.addEventListener('click', (e) => {
      e.preventDefault();
      resetForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
  
  // تنظیم رویدادهای فرم‌ها
  setupLoginForm();
  setupRegisterForm();
  setupOtpForm();
  setupResetForm();
  
  // تنظیم رویدادهای مربوط به نمایش/مخفی کردن رمز عبور
  setupPasswordToggle();
}

// تابع برای نمایش/مخفی کردن رمز عبور
function setupPasswordToggle() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      const icon = button.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ri-eye-off-line';
      } else {
        input.type = 'password';
        icon.className = 'ri-eye-line';
      }
    });
  });
}

// توابع کمکی برای فرم‌های احراز هویت
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.querySelector('[name="username"]').value;
    const password = this.querySelector('[name="password"]').value;
    const remember = this.querySelector('[name="remember"]')?.checked;
    
    // بررسی اعتبارسنجی ساده
    if (!username || !password) {
      showNotification('لطفاً تمامی فیلدها را پر کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال فرم به سرور را قرار دهید
    console.log('Login attempt:', { username, password, remember });
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    showNotification('ورود با موفقیت انجام شد.', 'success');
    
    // بستن پنل پروفایل
    setTimeout(() => {
      toggleModal(document.getElementById('profile-panel'), false);
    }, 1000);
  });
}

function setupRegisterForm() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;
  
  registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
    
    const fullname = this.querySelector('[name="fullname"]').value;
    const email = this.querySelector('[name="email"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const password = this.querySelector('[name="password"]').value;
    const terms = this.querySelector('[name="terms"]')?.checked;
    
    // بررسی اعتبارسنجی ساده
    if (!fullname || !email || !phone || !password) {
      showNotification('لطفاً تمامی فیلدها را پر کنید.', 'error');
      return;
    }
    
    // بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    
    // بررسی فرمت شماره موبایل
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showNotification('لطفاً یک شماره موبایل معتبر وارد کنید.', 'error');
      return;
    }
    
    // بررسی طول رمز عبور
    if (password.length < 8) {
      showNotification('رمز عبور باید حداقل 8 کاراکتر باشد.', 'error');
      return;
    }
    
    // بررسی پذیرش قوانین
    if (!terms) {
      showNotification('لطفاً قوانین و مقررات را بپذیرید.', 'error');
                return;
            }
            
    // اینجا می‌توانید کد ارسال فرم به سرور را قرار دهید
    console.log('Register attempt:', { fullname, email, phone, password, terms });
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    showNotification('ثبت‌نام با موفقیت انجام شد.', 'success');
    
    // بستن پنل پروفایل
            setTimeout(() => {
      toggleModal(document.getElementById('profile-panel'), false);
    }, 1000);
  });
}

function setupOtpForm() {
  const otpRequestForm = document.getElementById('otp-request-form');
  const otpVerifyForm = document.getElementById('otp-verify-form');
  if (!otpRequestForm || !otpVerifyForm) return;
  
  otpRequestForm.addEventListener('submit', function(e) {
                e.preventDefault();
    
    const phone = this.querySelector('[name="phone"]').value;
    
    // بررسی فرمت شماره موبایل
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showNotification('لطفاً یک شماره موبایل معتبر وارد کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال درخواست OTP به سرور را قرار دهید
    console.log('OTP request for:', phone);
    
    // نمایش فرم تأیید OTP (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    otpRequestForm.style.display = 'none';
    otpVerifyForm.style.display = 'block';
    
    // شروع تایمر OTP
    startOtpTimer();
    
    // نمایش پیام
    showNotification('کد تأیید به شماره موبایل شما ارسال شد.', 'success');
  });
  
  // تنظیم ورودی‌های OTP
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      if (this.value.length === 1) {
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      }
      
      updateCompleteOtp();
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !this.value && index > 0) {
        otpInputs[index - 1].focus();
      }
                });
            });
  
  function updateCompleteOtp() {
    const completeOtp = Array.from(otpInputs).map(input => input.value).join('');
    document.getElementById('otp-code-complete').value = completeOtp;
  }
  
  otpVerifyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const otp = document.getElementById('otp-code-complete').value;
    
    // بررسی طول OTP
    if (otp.length !== 5) {
      showNotification('لطفاً کد 5 رقمی را کامل وارد کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال تأیید OTP به سرور را قرار دهید
    console.log('OTP verification:', otp);
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    showNotification('ورود با موفقیت انجام شد.', 'success');
    
    // بستن پنل پروفایل
    setTimeout(() => {
      toggleModal(document.getElementById('profile-panel'), false);
    }, 1000);
  });
  
  // تنظیم دکمه ارسال مجدد
  const resendOtp = document.getElementById('resend-otp');
  if (resendOtp) {
    resendOtp.addEventListener('click', function() {
      if (this.disabled) return;
      
      const phone = otpRequestForm.querySelector('[name="phone"]').value;
      
      // اینجا می‌توانید کد ارسال مجدد OTP به سرور را قرار دهید
      console.log('Resend OTP for:', phone);
      
      // شروع مجدد تایمر
      startOtpTimer();
      
      // نمایش پیام
      showNotification('کد تأیید مجدداً ارسال شد.', 'info');
    });
  }
}

function startOtpTimer() {
  const timerElement = document.getElementById('otp-timer-count');
  const resendButton = document.getElementById('resend-otp');
  if (!timerElement || !resendButton) return;
  
  let timeLeft = 120; // 2 دقیقه
  resendButton.disabled = true;
  
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      resendButton.disabled = false;
    } else {
      timeLeft--;
    }
  }, 1000);
}

function setupResetForm() {
  const resetForm = document.getElementById('reset-request-form');
  if (!resetForm) return;
  
  resetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('[name="email"]').value;
    
    // بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال درخواست بازیابی رمز عبور به سرور را قرار دهید
    console.log('Password reset request for:', email);
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    const resetMessage = document.getElementById('reset-message');
    if (resetMessage) {
      resetMessage.innerHTML = 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد.';
      resetMessage.classList.add('success');
    }
    
    showNotification('لینک بازیابی رمز عبور به ایمیل شما ارسال شد.', 'success');
  });
}

// تابع برای نمایش لودر صفحه
function showPageLoadingAnimation() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-spinner">
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  // حذف لودر پس از بارگذاری کامل صفحه
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
      setTimeout(() => {
        document.body.removeChild(loader);
      }, 500);
    }, 500);
  });
}

// تابع برای افکت‌های ظاهری
function setupVisualEffects() {
    // افکت ریپل برای دکمه‌ها
    enableRippleEffect();
    
    // افکت پارالاکس برای تصاویر
    setupParallaxEffect();
    
    // انیمیشن اسکرول
    setupScrollAnimations();
    
    // افکت هاور برای محصولات
    setupProductHoverEffects();
  }
  
  // افکت ریپل برای دکمه‌ها
    function enableRippleEffect() {
    const buttons = document.querySelectorAll('.view-product-btn, .view-more-btn, .auth-btn, .slider-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
  // افکت پارالاکس برای تصاویر
  function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.bento-card-large .bento-image-bg');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + scrollY;
        const elementBottom = elementTop + element.offsetHeight;
        
        if (scrollY + window.innerHeight > elementTop && scrollY < elementBottom) {
          const speed = 0.1;
          const yPos = (scrollY - elementTop) * speed;
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    });
  }
  
  // انیمیشن اسکرول
  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .product-item, .special-offer-card, .blog-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // افکت هاور برای محصولات
  function setupProductHoverEffects() {
    const productItems = document.querySelectorAll('.product-item, .product-card');
    
    productItems.forEach(item => {
      const image = item.querySelector('img');
      if (!image) return;
      
      item.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
      });
      
      item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
      });
    });
  }
  
  // تابع برای بارگذاری تنبل تصاویر
  function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // استفاده از ویژگی loading="lazy" مرورگر
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // پیاده‌سازی بارگذاری تنبل با Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
                    }
                });
            });
      
      lazyImages.forEach(image => {
        imageObserver.observe(image);
      });
    }
  }
  
  // تابع برای مدیریت جستجو
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchResults = document.getElementById('search-results');
    const voiceSearchBtn = document.getElementById('voice-search');
    
    if (!searchInput) return;
    
    // جستجوی متنی
    searchInput.addEventListener('input', debounce(function() {
      const query = this.value.trim();
      
      if (query.length < 2) {
        searchSuggestions.style.display = 'block';
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
                    return;
                }
                
      // در حالت واقعی، اینجا باید درخواست به سرور ارسال شود
      // برای نمونه، نتایج ساختگی نمایش داده می‌شود
      searchSuggestions.style.display = 'none';
      searchResults.style.display = 'block';
                
                // نمایش لودر
      searchResults.innerHTML = '<div class="search-loading"><i class="ri-loader-4-line"></i></div>';
                
      // شبیه‌سازی تأخیر شبکه
                setTimeout(() => {
        // نتایج ساختگی
        const mockResults = [
          { id: 1, name: 'کفش نایک ایرمکس 2025', price: '2,380,000', image: 'images/products/shoe1.webp', category: 'ورزشی' },
          { id: 2, name: 'کفش آدیداس اولترابوست 24', price: '3,850,000', image: 'images/products/shoe2.webp', category: 'ورزشی' },
          { id: 3, name: 'کفش پوما متریکس', price: '2,790,000', image: 'images/products/shoe3.webp', category: 'روزمره' }
        ];
        
        if (mockResults.length > 0) {
          let resultsHTML = '<div class="search-results-header"><h3>نتایج جستجو</h3></div><div class="search-results-grid">';
          
          mockResults.forEach(product => {
            resultsHTML += `
              <div class="search-result-item">
                <a href="product-detail.html?id=${product.id}">
                  <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                    </div>
                  <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <div class="search-result-meta">
                      <span class="search-result-category">${product.category}</span>
                      <span class="search-result-price">${product.price} تومان</span>
                    </div>
                </div>
                </a>
            </div>
        `;
          });
          
          resultsHTML += '</div>';
          searchResults.innerHTML = resultsHTML;
        } else {
          searchResults.innerHTML = '<div class="search-no-results">نتیجه‌ای یافت نشد.</div>';
        }
      }, 500);
    }, 300));
    
    // جستجوی صوتی
    if (voiceSearchBtn && 'webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'fa-IR';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      voiceSearchBtn.addEventListener('click', () => {
        recognition.start();
        voiceSearchBtn.innerHTML = '<i class="ri-mic-fill"></i>';
        voiceSearchBtn.classList.add('listening');
      });
      
      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        searchInput.dispatchEvent(new Event('input'));
      };
      
      recognition.onend = function() {
        voiceSearchBtn.innerHTML = '<i class="ri-mic-line"></i>';
        voiceSearchBtn.classList.remove('listening');
      };
      
      recognition.onerror = function() {
        voiceSearchBtn.innerHTML = '<i class="ri-mic-line"></i>';
        voiceSearchBtn.classList.remove('listening');
        showNotification('خطا در تشخیص صدا. لطفاً دوباره تلاش کنید.', 'error');
      };
    } else if (voiceSearchBtn) {
      voiceSearchBtn.style.display = 'none';
    }
  }
  
  // تابع debounce برای بهینه‌سازی جستجو
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // تابع برای بررسی وضعیت اینترنت
  function setupOfflineDetection() {
    window.addEventListener('online', () => {
      showNotification('اتصال به اینترنت برقرار شد.', 'success');
    });
    
    window.addEventListener('offline', () => {
      showNotification('اتصال به اینترنت قطع شد. برخی از ویژگی‌ها ممکن است در دسترس نباشند.', 'warning');
    });
  }
  
  // راه‌اندازی در زمان بارگذاری صفحه
  document.addEventListener('DOMContentLoaded', () => {
    // نمایش لودر صفحه
    showPageLoadingAnimation();
    
    // راه‌اندازی اسلایدر اصلی
    initMainSlider();
    
    // راه‌اندازی اسلایدر محصولات
    initProductsSlider();
    
    // راه‌اندازی فیلتر محصولات
    setupProductFilters();
    
    // راه‌اندازی شمارنده معکوس
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
      updateCountdown();
    }
    
    // راه‌اندازی فرم‌های احراز هویت
    setupAuthForms();
    
    // راه‌اندازی افکت‌های ظاهری
    setupVisualEffects();
    
    // راه‌اندازی بارگذاری تنبل تصاویر
    setupLazyLoading();
    
    // راه‌اندازی جستجو
    setupSearch();
    
    // بررسی وضعیت اینترنت
    setupOfflineDetection();
    
    // راه‌اندازی رویدادهای مودال‌ها
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    const searchToggle = document.getElementById('search-toggle');
    const closeSearch = document.getElementById('close-search');
    const searchOverlay = document.getElementById('search-overlay');
    
    const profileToggle = document.getElementById('profile-toggle');
    const closeProfile = document.getElementById('close-profile');
    const profilePanel = document.getElementById('profile-panel');
    
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => toggleModal(mobileMenu, true));
    }
    
    if (closeMenu && mobileMenu) {
      closeMenu.addEventListener('click', () => toggleModal(mobileMenu, false));
    }
    
    if (searchToggle && searchOverlay) {
      searchToggle.addEventListener('click', () => toggleModal(searchOverlay, true));
    }
    
    if (closeSearch && searchOverlay) {
      closeSearch.addEventListener('click', () => toggleModal(searchOverlay, false));
    }
    
    if (profileToggle && profilePanel) {
      profileToggle.addEventListener('click', () => toggleModal(profilePanel, true));
    }
    
    if (closeProfile && profilePanel) {
      closeProfile.addEventListener('click', () => toggleModal(profilePanel, false));
    }
    
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeAllModals);
    }
    
    // راه‌اندازی دکمه بازگشت به بالا
    setupBackToTop();
  });
  
  // تابع برای دکمه بازگشت به بالا
  function setupBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
                } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
// شمارنده معکوس تخفیفات ویژه با حفظ وضعیت بین رفرش‌ها
function initCountdown() {
  const STORAGE_KEY = 'specialOffersCountdown';
  const DEFAULT_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 روز به میلی‌ثانیه
        
        // بازیابی یا ایجاد زمان پایان
        function getOrCreateEndTime() {
            try {
                const savedData = localStorage.getItem(STORAGE_KEY);
                
                if (savedData) {
                    const data = JSON.parse(savedData);
                    // بررسی معتبر بودن داده و منقضی نشدن زمان
                    if (data && data.endTime && new Date(data.endTime).getTime() > Date.now()) {
                        return data.endTime;
                    }
                }
            } catch (error) {
      console.warn('خطا در بازیابی زمان شمارنده:', error);
            }
            
            // ایجاد زمان پایان جدید
            const endTime = Date.now() + DEFAULT_DURATION;
            
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    endTime: endTime,
                    createdAt: Date.now()
                }));
            } catch (error) {
      console.warn('خطا در ذخیره‌سازی زمان شمارنده:', error);
            }
            
            return endTime;
        }
        
  // دریافت زمان پایان
  const endTime = getOrCreateEndTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = Math.max(0, endTime - now);
    
    // محاسبه زمان باقیمانده
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // بروزرسانی المان‌های HTML
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    // بررسی وجود المان‌ها قبل از بروزرسانی
    if (daysElement) daysElement.innerHTML = days < 10 ? `0${days}` : days;
    if (hoursElement) hoursElement.innerHTML = hours < 10 ? `0${hours}` : hours;
    if (minutesElement) minutesElement.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsElement) secondsElement.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    
    // اگر شمارنده به پایان رسید
    if (distance <= 0) {
      clearInterval(countdownTimer);
      
      // نمایش صفر در تمام بخش‌ها
      if (daysElement) daysElement.innerHTML = "00";
      if (hoursElement) hoursElement.innerHTML = "00";
      if (minutesElement) minutesElement.innerHTML = "00";
      if (secondsElement) secondsElement.innerHTML = "00";
      
      // اضافه کردن کلاس expired به کانتینر
      const countdownWrapper = document.querySelector('.countdown-wrapper');
      if (countdownWrapper) {
        countdownWrapper.classList.add('expired');
        
        // نمایش پیام اتمام تخفیف
        const countdownHeader = document.querySelector('.countdown-header');
        if (countdownHeader) {
          countdownHeader.innerHTML = `
            <span class="flash-icon"><i class="ri-time-line"></i></span>
            <h3>تخفیف به پایان رسیده است!</h3>
          `;
        }
      }
      
      // پاک کردن داده‌های ذخیره شده
      try {
        localStorage.removeItem(STORAGE_KEY);
            } catch (error) {
        console.warn('خطا در پاک کردن داده‌های تایمر:', error);
      }
    }
    
    // افزودن افکت پالس به ثانیه‌ها
    if (secondsElement) {
      secondsElement.classList.remove('pulse');
      setTimeout(() => {
        secondsElement.classList.add('pulse');
      }, 10);
    }
  }
  
  // بروزرسانی هر ثانیه
  updateCountdown();
  const countdownTimer = setInterval(updateCountdown, 1000);
  
  // برای مدیران: کلید میانبر برای ریست کردن تایمر (Ctrl+Alt+R)
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'r') {
      // پاک کردن داده‌های ذخیره شده
      try {
        localStorage.removeItem(STORAGE_KEY);
        
        // ایجاد زمان پایان جدید
        const newEndTime = Date.now() + DEFAULT_DURATION;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          endTime: newEndTime,
          createdAt: Date.now()
        }));
        
        // بارگذاری مجدد صفحه
        window.location.reload();
      } catch (error) {
        console.warn('خطا در ریست کردن تایمر:', error);
      }
    }
  });
}

// افزودن به علاقه‌مندی‌ها با حفظ وضعیت
function initWishlistButtons() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  const WISHLIST_KEY = 'userWishlist';
  
  // بازیابی وضعیت علاقه‌مندی‌ها
  let wishlist = [];
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_KEY);
    if (savedWishlist) {
      wishlist = JSON.parse(savedWishlist);
    }
  } catch (error) {
    console.warn('خطا در بازیابی علاقه‌مندی‌ها:', error);
  }
  
  // اعمال وضعیت ذخیره شده روی دکمه‌ها
  wishlistButtons.forEach(button => {
    const productId = button.closest('.offer-card').dataset.productId || 
                     button.closest('.offer-card').querySelector('.offer-title').textContent;
    
    if (wishlist.includes(productId)) {
      const icon = button.querySelector('i');
      icon.classList.remove('ri-heart-line');
      icon.classList.add('ri-heart-fill');
      button.style.color = '#f44336';
      button.style.borderColor = '#f44336';
    }
    
    button.addEventListener('click', function() {
      // تغییر آیکون و استایل
      const icon = this.querySelector('i');
      const productId = this.closest('.offer-card').dataset.productId || 
                       this.closest('.offer-card').querySelector('.offer-title').textContent;
      
      if (icon.classList.contains('ri-heart-line')) {
        icon.classList.remove('ri-heart-line');
        icon.classList.add('ri-heart-fill');
        this.style.color = '#f44336';
        this.style.borderColor = '#f44336';
        
        // افزودن به لیست علاقه‌مندی‌ها
        if (!wishlist.includes(productId)) {
          wishlist.push(productId);
        }
        
        // نمایش پیام
        showToast('محصول به علاقه‌مندی‌ها اضافه شد');
      } else {
        icon.classList.remove('ri-heart-fill');
        icon.classList.add('ri-heart-line');
        this.style.color = '#666';
        this.style.borderColor = '#eee';
        
        // حذف از لیست علاقه‌مندی‌ها
        wishlist = wishlist.filter(id => id !== productId);
        
        // نمایش پیام
        showToast('محصول از علاقه‌مندی‌ها حذف شد');
      }
      
      // ذخیره در localStorage
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
            } catch (error) {
        console.warn('خطا در ذخیره‌سازی علاقه‌مندی‌ها:', error);
      }
    });
  });
}

// نمایش پیام toast
function showToast(message) {
  // ایجاد المان toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // اضافه کردن استایل به toast اگر در CSS تعریف نشده است
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  toast.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
  toast.style.fontSize = '14px';
  toast.style.textAlign = 'center';
  
  // افزودن به body
  document.body.appendChild(toast);
  
  // نمایش toast
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 100);
  
  // حذف toast پس از چند ثانیه
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// انیمیشن پیشرفت تخفیفات
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  // استفاده از Intersection Observer برای شروع انیمیشن هنگام مشاهده
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
          }, 100);
          
          // توقف نظارت پس از اجرای انیمیشن
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  } else {
    // پشتیبانی از مرورگرهای قدیمی
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.transition = 'width 1.5s ease-in-out';
        bar.style.width = width;
      }, 500);
    });
  }
}

// افزودن شناسه محصول به کارت‌های تخفیف
function addProductIds() {
  const offerCards = document.querySelectorAll('.offer-card');
  
  offerCards.forEach((card, index) => {
    // استخراج شناسه از URL محصول یا استفاده از عنوان محصول
    const productLink = card.querySelector('a.btn-primary');
    let productId;
    
    if (productLink && productLink.href) {
      const url = new URL(productLink.href, window.location.origin);
      productId = url.searchParams.get('id');
    }
    
    if (!productId) {
      const title = card.querySelector('.offer-title');
      productId = title ? title.textContent : `offer-${index + 1}`;
    }
    
    // افزودن شناسه به کارت
    card.dataset.productId = productId;
  });
}

// راه‌اندازی همه قابلیت‌های بخش تخفیفات ویژه
function initSpecialOffers() {
  // افزودن شناسه محصول به کارت‌ها
  addProductIds();
  
  // راه‌اندازی شمارنده معکوس
  initCountdown();
  
  // راه‌اندازی دکمه‌های علاقه‌مندی
  initWishlistButtons();
  
  // راه‌اندازی نوارهای پیشرفت
  initProgressBars();
}

// اجرای تابع راه‌اندازی در هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', initSpecialOffers);

// توابع مربوط به اسلایدر ویژگی‌ها
function showFeatureSlide(n) {
  if (!featureSlides || featureSlides.length === 0) return;
  
  // بررسی محدوده اسلایدها
  if (n >= featureSlides.length) featureSlideIndex = 0;
  if (n < 0) featureSlideIndex = featureSlides.length - 1;
  
  // غیرفعال کردن همه اسلایدها و نقاط
  featureSlides.forEach(slide => slide.classList.remove('active'));
  featureDots.forEach(dot => dot.classList.remove('active'));
  
  // فعال کردن اسلاید و نقطه جاری
  featureSlides[featureSlideIndex].classList.add('active');
  featureDots[featureSlideIndex].classList.add('active');
}

function changeFeatureSlide(n) {
  clearInterval(featureSlideInterval); // توقف اسلاید خودکار
  featureSlideIndex += n;
  showFeatureSlide(featureSlideIndex);
  startFeatureSlideInterval(); // شروع مجدد اسلاید خودکار
}

function currentFeatureSlide(n) {
  clearInterval(featureSlideInterval); // توقف اسلاید خودکار
  featureSlideIndex = n;
  showFeatureSlide(featureSlideIndex);
  startFeatureSlideInterval(); // شروع مجدد اسلاید خودکار
}

function startFeatureSlideInterval() {
  featureSlideInterval = setInterval(() => {
    featureSlideIndex++;
    showFeatureSlide(featureSlideIndex);
  }, 5000); // هر 5 ثانیه
}

// راه‌اندازی اسلایدر ویژگی‌ها
function initFeatureSlider() {
  const sliderContainer = document.getElementById('mainSlider');
  if (!sliderContainer) return;
  
  featureSlides = document.querySelectorAll('.feature-slide');
  featureDots = document.querySelectorAll('.feature-dot');
  
  if (featureSlides.length === 0) return;
  
  // شروع اسلایدر
  showFeatureSlide(0);
  startFeatureSlideInterval();
  
  // توقف اسلاید خودکار هنگام هاور روی اسلایدر
  sliderContainer.addEventListener('mouseenter', () => clearInterval(featureSlideInterval));
  sliderContainer.addEventListener('mouseleave', startFeatureSlideInterval);
}

// اضافه کردن به رویدادهای DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // سایر کدهای موجود...
  
  // راه‌اندازی اسلایدر ویژگی‌ها
  initFeatureSlider();
});
document.addEventListener('DOMContentLoaded', function() {
  const brandsTracks = document.querySelectorAll('.brands-track');
  
  if (brandsTracks.length > 0) {
      brandsTracks.forEach(track => {
          // توقف انیمیشن هنگام هاور
          track.addEventListener('mouseenter', function() {
              this.querySelector('.brands-slide').style.animationPlayState = 'paused';
          });
          
          // ادامه انیمیشن پس از خروج ماوس
          track.addEventListener('mouseleave', function() {
              this.querySelector('.brands-slide').style.animationPlayState = 'running';
          });
      });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const tickerContent = document.querySelector('.news-ticker-content');
  
  // محاسبه عرض محتوا و تنظیم انیمیشن
  function adjustAnimation() {
    const containerWidth = document.querySelector('.news-ticker').offsetWidth;
    const contentWidth = tickerContent.offsetWidth;
    
    // تنظیم سرعت انیمیشن بر اساس عرض محتوا
    const duration = contentWidth / 50; // تنظیم سرعت
    tickerContent.style.animationDuration = `${duration}s`;
  }
  
  // اجرای تابع تنظیم در بارگذاری و تغییر سایز پنجره
  adjustAnimation();
  window.addEventListener('resize', adjustAnimation);
  
  // توقف انیمیشن با هاور موس
  tickerContent.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });
  
  tickerContent.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
});
// main.js — سبد خرید دائمی + مدیریت UI

// === بارگذاری سبد خرید از localStorage ===
function loadCart() {
    const cart = localStorage.getItem('amiriCart');
    return cart ? JSON.parse(cart) : [];
}

// === ذخیره سبد خرید در localStorage ===
function saveCart(cart) {
    localStorage.setItem('amiriCart', JSON.stringify(cart));
}

// === به‌روزرسانی نمایش سبد خرید ===
function updateCartUI() {
    const cart = loadCart();
    const cartItemsEl = document.getElementById('cart-items');
    const cartEmptyEl = document.getElementById('cart-empty');
    const cartCounterEl = document.getElementById('cart-counter');
    const cartTotalEl = document.getElementById('cart-total');

    // شمارش تعداد کل آیتم‌ها
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounterEl.textContent = totalCount || '0';

    // محاسبه جمع کل (به تومان)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = total.toLocaleString('fa-IR') + ' تومان';

    // نمایش/مخفی‌کردن پیام خالی بودن
    if (cart.length === 0) {
        cartEmptyEl.style.display = 'block';
        cartItemsEl.innerHTML = '';
    } else {
        cartEmptyEl.style.display = 'none';
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="60" height="60">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString('fa-IR')} تومان</p>
                    <div class="cart-item-controls">
                        <button class="btn-quantity" data-id="${item.id}" data-action="decrease">−</button>
                        <span>${item.quantity}</span>
                        <button class="btn-quantity" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <button class="btn-remove" data-id="${item.id}" aria-label="حذف">✕</button>
            </div>
        `).join('');
    }
}

// === افزودن محصول به سبد ===
function addToCart(product) {
    let cart = loadCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartUI();
    showNotification('✅ محصول به سبد خرید اضافه شد!');
}

// === حذف یا تغییر تعداد ===
document.addEventListener('click', (e) => {
    const cart = loadCart();

    // حذف محصول
    if (e.target.classList.contains('btn-remove')) {
        const id = parseInt(e.target.dataset.id);
        const newCart = cart.filter(item => item.id !== id);
        saveCart(newCart);
        updateCartUI();
        return;
    }

    // تغییر تعداد
    if (e.target.classList.contains('btn-quantity')) {
        const id = parseInt(e.target.dataset.id);
        const action = e.target.dataset.action;
        const item = cart.find(i => i.id === id);

        if (item) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            } else if (action === 'decrease' && item.quantity === 1) {
                // حذف اگر تعداد 1 بود و کاهش داد
                const newCart = cart.filter(i => i.id !== id);
                saveCart(newCart);
                updateCartUI();
                return;
            }
            saveCart(cart);
            updateCartUI();
        }
    }

    // باز کردن سبد خرید
    if (e.target.id === 'cart-toggle' || e.target.closest('#cart-toggle')) {
        document.getElementById('cart-sidebar').classList.add('open');
    }

    // بستن سبد خرید
    if (e.target.id === 'close-cart' || e.target.closest('#close-cart') || e.target.id === 'cart-overlay') {
        document.getElementById('cart-sidebar').classList.remove('open');
    }

    // ادامه فرآیند خرید (موقتاً هدایت به صفحه سفارش)
    if (e.target.id === 'checkout-btn') {
        if (cart.length === 0) {
            showNotification('سبد خرید شما خالی است!');
            return;
        }
        alert('در مرحله بعد، صفحه سفارش ساخته خواهد شد.');
        // بعداً: window.location.href = 'checkout.html';
    }
});

// === اتصال دکمه‌های "مشاهده محصول" به سبد خرید ===
// فرض می‌کنیم هر دکمه "مشاهده محصول" در صفحه اصلی یک دیتای مخفی داره
// ولی الان ما مستقیماً از محصولات صفحه اصلی استفاده می‌کنیم
// === نمایش اعلان کوچک ===
function showNotification(message) {
    let notif = document.getElementById('amiri-notification');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'amiri-notification';
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4721ff;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-family: Vazirmatn, sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notif);
    }
    notif.textContent = message;
    notif.style.opacity = '1';
    notif.style.transform = 'translateX(0)';

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(100%)';
    }, 2500);
}

// === راه‌اندازی اولیه ===
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initProductButtons();

    // بستن منوی موبایل با کلیک روی آیتم
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('open');
        });
    });

    // منوی موبایل
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('open');
    });
    document.getElementById('close-menu')?.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('open');
    });
});
// 🛒 سبد خرید دائمی — فروشگاه کفش امیری
(function () {
    // === بارگذاری و ذخیره سبد خرید ===
    const loadCart = () => JSON.parse(localStorage.getItem('amiriCart') || '[]');
    const saveCart = (cart) => localStorage.setItem('amiriCart', JSON.stringify(cart));

    // === به‌روزرسانی UI سبد خرید ===
    const updateCartUI = () => {
        const cart = loadCart();
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartTotal = document.getElementById('cart-total');
        const cartCounter = document.getElementById('cart-counter');

        // شمارنده سبد خرید در هدر
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCounter) cartCounter.textContent = totalCount || '0';

        // محاسبه جمع کل
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString('fa-IR') + ' تومان';

        // نمایش محتوا
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartItems.innerHTML = '';
        } else {
            cartEmpty.style.display = 'none';
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price.toLocaleString('fa-IR')} تومان</p>
                        <div class="cart-item-controls">
                            <button class="btn-quantity" data-id="${item.id}" data-action="decrease">−</button>
                            <span>${item.quantity}</span>
                            <button class="btn-quantity" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                    </div>
                    <button class="btn-remove" data-id="${item.id}" aria-label="حذف">×</button>
                </div>
            `).join('');
        }
    };

    // === افزودن محصول به سبد ===
    window.addToCart = (product) => {
        if (!product.id || !product.name || !product.price || !product.image) {
            console.error('اطلاعات محصول ناقص است:', product);
            return;
        }
        let cart = loadCart();
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart(cart);
        updateCartUI();
        showNotification('✅ محصول به سبد خرید اضافه شد!');
    };

    // === رویدادهای کلیک ===
    document.addEventListener('click', (e) => {
        const cart = loadCart();

        // حذف محصول
        if (e.target.classList.contains('btn-remove')) {
            const id = parseInt(e.target.dataset.id);
            saveCart(cart.filter(item => item.id !== id));
            updateCartUI();
            return;
        }

        // تغییر تعداد
        if (e.target.classList.contains('btn-quantity')) {
            const id = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            const item = cart.find(i => i.id === id);

            if (item) {
                if (action === 'increase') {
                    item.quantity += 1;
                } else if (action === 'decrease') {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        saveCart(cart.filter(i => i.id !== id));
                        updateCartUI();
                        return;
                    }
                }
                saveCart(cart);
                updateCartUI();
            }
        }

        // باز/بسته کردن سبد
        if (e.target.id === 'cart-toggle' || e.target.closest('#cart-toggle')) {
            document.getElementById('cart-sidebar').classList.add('open');
        }
        if (e.target.id === 'close-cart' || e.target.closest('#close-cart') || e.target.id === 'cart-overlay') {
            document.getElementById('cart-sidebar').classList.remove('open');
        }

        // دکمه ادامه خرید
        if (e.target.id === 'checkout-btn') {
            if (cart.length === 0) {
                showNotification('سبد خرید شما خالی است!');
            } else {
                alert('در مرحله بعد، صفحه سفارش ساخته خواهد شد.');
                // بعداً: window.location.href = 'checkout.html';
            }
        }
    });

 

    // === نمایش اعلان کوچک ===
    const showNotification = (message) => {
        let notif = document.getElementById('amiri-notification');
        if (!notif) {
            notif = document.createElement('div');
            notif.id = 'amiri-notification';
            document.body.appendChild(notif);
        }
        notif.textContent = message;
        notif.style.opacity = '1';
        notif.style.transform = 'translateX(0)';

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(100%)';
        }, 2500);
    };

    // === راه‌اندازی اولیه ===
    document.addEventListener('DOMContentLoaded', () => {
        updateCartUI();
        initAddToCartButtons();
    });
})();