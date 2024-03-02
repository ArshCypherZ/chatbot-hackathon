function compare(string) {
  fetch('https://chatgpt.apinepdev.workers.dev/?question=' + encodeURIComponent(string))
    .then(response => response.json())
    .then(data => {
      const response = data.response;
      addChat(string, response);
    })
    .catch(error => {
      console.error('Error fetching response from API:', error);
      const item = alternative[Math.floor(Math.random() * alternative.length)];
      addChat(string, item);
    });
}

function output(input) {
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  compare(text);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
}
