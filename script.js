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

async function compare(string) {
  try {
    const outputt = await replicate.run(
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
  } catch (error) {
    console.error('Error fetching response from API:', error);
    const item = alternative[Math.floor(Math.random() * alternative.length)];
    addChat(string, item);
  }
}

async function output(input) {
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  await compare(text);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  if (input != "") {
    output(input);
  }
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      if (input != "") {
        output(input);
      }
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
