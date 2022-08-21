const quote = document.querySelector(".js-quote"),
  authorName = document.querySelector(".author .name"),
  spinner = document.querySelector("#js-spinner"),
  copyBtn = document.querySelector(".js-copy"),
  volumeBtn = document.querySelector(".js-volume"),
  generateBtn = document.querySelector("button"),
  randomQuoteAPI = "https://api.quotable.io/random";

generateBtn.addEventListener("click", fetchRandomQuote);

async function fetchRandomQuote() {
  spinner.classList.remove("hidden");
  generateBtn.classList.add("loading");

  try {
    const response = await fetch(randomQuoteAPI);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const result = await response.json();
    quote.textContent = result.content;
    authorName.textContent = result.author;
  } catch {
    alert("Failed! Please open data connection.");
  } finally {
    spinner.classList.add("hidden");
    generateBtn.classList.remove("loading");
  }
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quote.textContent);
});

volumeBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quote.textContent} by ${authorName.textContent}`
  );

  speechSynthesis.speak(utterance);
});

fetchRandomQuote();
