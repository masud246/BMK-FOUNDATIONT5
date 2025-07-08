// ফাংশন: ভাষা সেট করে
  function setLanguage(lang) {
    document.querySelectorAll('.lang').forEach(function(el) {
      el.classList.remove('active');
    });

    document.querySelectorAll('.lang.' + lang).forEach(function(el) {
      el.classList.add('active');
    });

    // পছন্দ মনে রাখার জন্য
    localStorage.setItem('selectedLanguage', lang);
  }

  // যখন পেজ লোড হবে
  window.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('selectedLanguage') || 'bn';
    document.getElementById('languageSelect').value = savedLang;
    setLanguage(savedLang);
  });

  // সিলেক্ট চেঞ্জ হলে
  document.getElementById('languageSelect').addEventListener('change', function () {
    setLanguage(this.value);
  });