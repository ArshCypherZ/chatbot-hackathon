function compare(triggerArray, replyArray, string) {
  // Make an API call here to fetch the appropriate response based on the user input
  // For example, using fetch API
  fetch('https://your-api-endpoint.com/response?query=' + encodeURIComponent(string))
    .then(response => response.json())
    .then(data => {
      // Assuming the API returns a single response
      const response = data.response;
      addChat(string, response);
    })
    .catch(error => {
      console.error('Error fetching response from API:', error);
      // If there's an error fetching from API, fall back to the alternative responses
      const item = alternative[Math.floor(Math.random() * alternative.length)];
      addChat(string, item);
    });
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  if (input !== "") {
    output(input);
    inputField.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", sendMessage);
  
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      sendMessage();
    }
  });
});

// Function to add the fetched chat to the UI
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
