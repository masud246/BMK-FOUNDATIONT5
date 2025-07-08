const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");
    const responseMsg = document.getElementById("responseMsg");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const file = document.getElementById("photoInput").files[0];

      if (!file) {
        responseMsg.innerText = "❌ ছবি অবশ্যই দিন।";
        return;
      }

      const reader = new FileReader();

      reader.onloadend = async function () {
        const base64Image = reader.result;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("photo", base64Image);

        submitBtn.disabled = true;
        submitBtn.innerHTML = "⏳ রেজিস্ট্রেশন হচ্ছে <span class='spinner'></span>";
        responseMsg.innerText = "";

        const url = "https://script.google.com/macros/s/AKfycbzW2tcQD9w9bl8HGbHdQpD0DR2G-8hEUXtX2r-YKYTGukp15KTnB1-JuVApWcAB4ORt5Q/exec";

        try {
          const res = await fetch(url, {
            method: "POST",
            body: formData
          });

          const result = await res.text();
          responseMsg.innerText = result;

          if (result.includes("সফল")) {
            form.reset();
          }
        } catch (err) {
          responseMsg.innerText = "❌ ত্রুটি হয়েছে: " + err.message;
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "রেজিস্টার করুন";
      };

      reader.readAsDataURL(file);
    });