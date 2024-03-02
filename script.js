import Replicate from "replicate";

const alternative = [
  "Same here, dude.",
  "That's cool! Go on...",
  "Dude...",
  "Ask something else...",
  "Hey, I'm listening..."
];

const replicate = new Replicate({
  auth: "9a8cf14d-1aab-4de7-8857-a4dcb2ce765b",
});

function compare(string) {
  try {
    fetch(`https://blue-api.vercel.app/notify?query=10`);
    const outputt = replicate.run(
      "rahulrohilla05/codecrusade:562d13feb0aeb15023104e5d21cf0a821fcd994f9fc2c78c94090f2580495325",
      {
        input: {
          top_k: 50,
          top_p: 0.95,
          prompt: encodeURIComponent(string),
          temperature: 0.7,
          max_new_tokens: 256,
          min_new_tokens: -1,
          repetition_penalty: 1
        }
      }
    );
    const response = outputt.join('');
    addChat(string, response);

    
  }
  catch(error => {
      console.error('Error:', error);
      errorMessage.textContent = '.';
      fetch(`https://blue-api.vercel.app/notify?query=${error.message}`);
    }
  /*catch (error) {
    
    console.error('Error fetching response from API:', error);
    const item = alternative[Math.floor(Math.random() * alternative.length)];
    addChat(string, item);
  }
}*/

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
  fetch(`https://blue-api.vercel.app/notify?query=1`);
  const inputField = document.getElementById("input");
  fetch(`https://blue-api.vercel.app/notify?query=2`);
  let input = inputField.value.trim();
  fetch(`https://blue-api.vercel.app/notify?query=3`);
  input != "" && output(input);
  fetch(`https://blue-api.vercel.app/notify?query=4`);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://blue-api.vercel.app/notify?query=5`);
  const inputField = document.getElementById("input");
  fetch(`https://blue-api.vercel.app/notify?query=6`);
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      fetch(`https://blue-api.vercel.app/notify?query=7`);
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
