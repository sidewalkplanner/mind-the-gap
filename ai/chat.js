const WORKER_URL = "https://ai-proxy.robertsells32.workers.dev";

const conversation = document.getElementById("conversation");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

const messages = []; // conversation history

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  messages.push({ role: "user", content: userText });
  appendMessage("user", userText);
  input.value = "";
  sendBtn.disabled = true;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    
    if (data.error) {
      appendMessage("assistant", "Error: " + (data.error.message || data.error));
    } else {
      const reply = data.content[0].text;
      messages.push({ role: "assistant", content: reply });
      appendMessage("assistant", reply);
    }
  } catch (err) {
    appendMessage("assistant", "Network error: " + err.message);
  } finally {
    sendBtn.disabled = false;
  }
}

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.className = role;
  div.textContent = (role === "user" ? "You: " : "Assistant: ") + text;
  conversation.appendChild(div);
  conversation.scrollTop = conversation.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});