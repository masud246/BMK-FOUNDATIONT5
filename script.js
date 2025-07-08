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
// ========== ভাষা পরিবর্তন সিস্টেম ==========
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");
  const allLangElements = document.querySelectorAll(".lang");

  const hadithDiv = document.getElementById("hadithText");
  const wrapper = document.querySelector(".hadith-wrapper");

  // ✅ হাদিস ডেটা
  const hadiths_bn = [
    "❝ যে ব্যক্তি দান করে, আল্লাহ তা’আলা তাকে আরও বেশি দেন। (সহীহ মুসলিম) ❞",
    "❝ দান করার মাধ্যমে সম্পদ কখনোই কমে না। বরং দান করলে আল্লাহ তা বাড়িয়ে দেন। (সহীহ মুসলিম) ❞",
    "❝ তিনটি জিনিস মৃত্যুর পরেও সওয়াব পৌঁছায়: সদকায়ে জারিয়া, উপকারী জ্ঞান, এবং নেক সন্তান। (সহীহ মুসলিম) ❞",
    "❝ আগুন থেকে বাঁচো—even যদি তা হয় একটি খেজুর দান করার মাধ্যমেও। (সহীহ বুখারী) ❞",
    "❝ দান করো, তা বিপদ-আপদ দূর করে। (তাবরানী) ❞"
  ];

  const hadiths_en = [
    "❝ Whoever gives charity, Allah increases it for him. (Sahih Muslim) ❞",
    "❝ Charity never decreases wealth. Rather, Allah multiplies it. (Sahih Muslim) ❞",
    "❝ Three deeds continue after death: Sadaqah Jariyah, beneficial knowledge, and a righteous child. (Sahih Muslim) ❞",
    "❝ Save yourself from Hellfire, even with half a date. (Sahih Bukhari) ❞",
    "❝ Give charity; it repels calamities. (Tabarani) ❞"
  ];

  let currentList = hadiths_bn;
  let currentIndex = 0;
  let scrollTimeout = null;

  function scrollHadith() {
    if (!hadithDiv || !wrapper) return;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    hadithDiv.style.transition = "none";
    hadithDiv.style.left = wrapper.offsetWidth + "px";
    hadithDiv.innerText = currentList[currentIndex];

    requestAnimationFrame(() => {
      const textWidth = hadithDiv.offsetWidth;
      const distance = wrapper.offsetWidth + textWidth;
      const speed = 100;
      const duration = distance / speed;

      hadithDiv.style.transition = `left ${duration}s linear`;
      hadithDiv.style.left = `-${textWidth}px`;

      scrollTimeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentList.length;
        scrollHadith();
      }, duration * 1000);
    });
  }

  function applyLanguage(lang) {
    allLangElements.forEach(el => el.classList.remove("active"));
    document.querySelectorAll(`.lang.${lang}`).forEach(el => el.classList.add("active"));

    currentList = lang === "en" ? hadiths_en : hadiths_bn;
    currentIndex = 0;
    scrollHadith();
  }

  const savedLang = localStorage.getItem("language") || "bn";
  applyLanguage(savedLang);

  if (languageSelect) {
    languageSelect.value = savedLang;

    languageSelect.addEventListener("change", function () {
      const selectedLang = this.value;
      localStorage.setItem("language", selectedLang);
      applyLanguage(selectedLang);
    });
  }

  // ========== স্লাইডার ==========
  const slider = document.getElementById("slider");
  const dotsContainer = document.getElementById("dots");

  if (slider && dotsContainer) {
    const slides = slider.children;
    const totalSlides = slides.length;
    let slideIndex = 0;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function showSlide(index) {
      if (index >= totalSlides) slideIndex = 0;
      else if (index < 0) slideIndex = totalSlides - 1;
      else slideIndex = index;

      slider.style.transform = `translateX(-${slideIndex * 100}%)`;

      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
      }
      dots[slideIndex].classList.add('active');
    }

    setInterval(() => {
      showSlide(slideIndex + 1);
    }, 3000);

    showSlide(slideIndex);
  }
});
//পাঁচ ওয়াক্ত নামাজের সময়সূচী
const prayerNames = {
    Fajr: 'ফজর',
    Dhuhr: 'যুহর',
    Asr: 'আসর',
    Maghrib: 'মাগরিব',
    Isha: 'ইশা'
  };

  const prayerIcons = {
    Fajr: 'fa-moon',
    Dhuhr: 'fa-sun',
    Asr: 'fa-cloud-sun',
    Maghrib: 'fa-cloud-moon',
    Isha: 'fa-star-and-crescent'
  };

  function convertTo12Hour(time24) {
    let [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  }

  function getCurrent12HourTime() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h.toString().padStart(2, '0')}:${m}:${s} ${ampm}`;
  }

  function updateLiveClockOnly() {
    document.getElementById("live-clock").innerText = getCurrent12HourTime();
  }

  setInterval(updateLiveClockOnly, 1000);
  updateLiveClockOnly();

  function fetchPrayerTimesByLocation(lat, lon) {
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1&school=1`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const times = data.data.timings;
        displayPrayerTimes(times);
      })
      .catch(() => {
        document.getElementById("prayer-times").innerHTML = `<p>টাইম আনতে সমস্যা হয়েছে</p>`;
      });
  }

  function displayPrayerTimes(times) {
    const container = document.getElementById("prayer-times");
    container.innerHTML = "";

    const prayerList = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let currentPrayer = null;
    const now = new Date();

    prayerList.forEach((name, i) => {
      const startStr = times[name];
      let endStr;

      if (name === "Fajr") {
        endStr = times.Sunrise;
      } else if (i < prayerList.length - 1) {
        endStr = times[prayerList[i + 1]];
      } else {
        endStr = "23:59";
      }

      const [startH, startM] = startStr.split(":").map(Number);
      const [endH, endM] = endStr.split(":").map(Number);
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startH, startM);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endH, endM);

      const block = document.createElement("div");
      block.className = "prayer-time";

      if (now >= endTime) {
        block.classList.add("past");
      } else if (now >= startTime && now < endTime) {
        block.classList.add("active");
        currentPrayer = { name: prayerNames[name], endTime: endTime };
      }

      block.innerHTML = `
        <i class="fas ${prayerIcons[name]}"></i>
        <div class="prayer-name">${prayerNames[name]}</div>
        <div><span class="time-label">শুরু:</span> ${convertTo12Hour(startStr)}</div>
        <div><span class="time-label">শেষ:</span> ${convertTo12Hour(endStr)}</div>
      `;

      container.appendChild(block);
    });

    if (currentPrayer) {
      updateCountdown(currentPrayer.name, currentPrayer.endTime);
      clearInterval(window.countdownInterval);
      window.countdownInterval = setInterval(() => updateCountdown(currentPrayer.name, currentPrayer.endTime), 1000);
    } else {
      updateNoPrayerMessage();
      clearInterval(window.countdownInterval);
    }
  }

  function updateCountdown(prayerName, endTime) {
    const now = new Date();
    const diff = Math.max(0, Math.floor((endTime - now) / 1000));

    const h = String(Math.floor(diff / 3600)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const s = String(diff % 60).padStart(2, '0');

    document.getElementById("live-clock").innerText = getCurrent12HourTime();
    document.getElementById("countdown-message").innerText =
      `${prayerName} শেষ হতে বাকি: ${h} ঘন্টা ${m} মিনিট ${s} সেকেন্ড`;
  }

  function updateNoPrayerMessage() {
    document.getElementById("live-clock").innerText = getCurrent12HourTime();
    document.getElementById("countdown-message").innerText = `বর্তমানে কোনো নামাজের ওয়াক্ত চলছে না`;
  }

  function detectLocationAndFetchTimes() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchPrayerTimesByLocation(lat, lon);
        },
        () => {
          document.getElementById("location-name").innerText = "লোকেশন অনুমতি পাওয়া যায়নি";
        }
      );
    } else {
      document.getElementById("location-name").innerText = "আপনার ব্রাউজারে লোকেশন নেই";
    }
  }

  detectLocationAndFetchTimes();
  