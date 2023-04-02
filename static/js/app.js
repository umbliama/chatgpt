const horoscope = () => {
  var zodiacSelect = document.getElementById("zodiac");
  var zodiacHidden = document.getElementById("zodiac-hidden");
  zodiacHidden.value = zodiacSelect.value;
};

apikey =
  "trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2";

const form = document.querySelector("#horoscope-js");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  const zodiac = document.querySelector("#zodiac-hidden");
  const response = document.querySelector(".response");
  formData.append("zodiac_sign", zodiac.value);

  fetch("/submit_form", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      const transSelect = document.querySelector("#translate_to");
      if (transSelect.value !== "nothing") {
        checkTranslation(data).then((res) => (response.innerText = res));
      } else {
        response.innerText = data;
      }
    });
});

const translateText = async (source_lang, target_lang, text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", source_lang);
  encodedParams.append("target_language", target_lang);
  encodedParams.append("text", text);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "9c471f26d6msh5e5341c1fcdde90p14fd1bjsn609d8ee0cfab",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: encodedParams,
  };

  const response = await fetch(
    "https://text-translator2.p.rapidapi.com/translate",
    options
  );
  const data = await response.json();
  return data.data.translatedText;
};

const checkTranslation = (text) => {
  const transSelect = document.querySelector("#translate_to");
  switch (transSelect.value) {
    case "nothing":
      return text;
    case "ru":
      return translateText("en", "ru", text).then(
        (translatedText) => translatedText
      );
  }
};

const translateCheckbox = document.querySelector("#translate_checkbox");
translateCheckbox.checked = false;
translateCheckbox.addEventListener("change", () => {
  const response = document.querySelector(".response");
  const horoscopeText = response.innerText;
  if (translateCheckbox.checked) {
    document.querySelector(".translate_field").style.display = "block";
  } else {
    document.querySelector(".translate_field").style.display = "none";
  }
});
