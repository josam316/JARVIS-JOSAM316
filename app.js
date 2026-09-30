const chatForm = document.querySelector("#chatForm");
const commandInput = document.querySelector("#commandInput");
const chatWindow = document.querySelector("#chatWindow");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function addMessage(text, who = "assistant") {
  const wrap = document.createElement("div");
  wrap.className = `message ${who === "user" ? "user-message" : "assistant-message"}`;
  const avatar = document.createElement("span");
  avatar.className = "message-avatar";
  avatar.textContent = who === "user" ? "Y" : "J";
  const body = document.createElement("div");
  const label = document.createElement("small");
  label.textContent = who === "user" ? "YOU" : "JARVIS · DEMO";
  const p = document.createElement("p");
  // Use textContent so user-entered text is never interpreted as HTML.
  p.textContent = text;
  body.append(label, p);
  wrap.append(avatar, body);
  chatWindow.append(wrap);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function demoReply(command) {
  const c = command.toLowerCase();
  if (c.includes("status")) return "Dashboard status: online. Phone: not paired. AI backend: not connected. This is demo data, not live device telemetry.";
  if (c.includes("pair") || c.includes("phone")) return "Phone pairing will use the JARVIS Android companion, a short-lived one-time code, authenticated sessions and encrypted HTTPS/WSS. Pairing is not implemented in this first milestone.";
  if (c.includes("developer") || c.includes("code")) return "Developer tools are planned for a later phase. Next: connect a server-side AI API, then add authenticated tools with explicit permission checks.";
  if (c.includes("hello") || c.includes("hi jarvis")) return "Hello, Josam. The interface is ready. My live AI connection is not configured yet.";
  return "I received your message. This dashboard currently uses demo replies. In the next phase, we will connect a real AI model through the Python backend without exposing API keys in the browser.";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = commandInput.value.trim();
  if (!command) return;
  addMessage(command, "user");
  commandInput.value = "";
  window.setTimeout(() => addMessage(demoReply(command)), 280);
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    commandInput.value = button.dataset.command;
    commandInput.focus();
  });
});

document.querySelector("#pairButton").addEventListener("click", () => {
  showToast("Phone pairing will be added in Phase 3. No phone access is active.");
  addMessage("Phone connection setup was requested. This prototype does not yet pair devices or access phone data.");
  const activity = document.querySelector("#activityList");
  const row = document.createElement("div");
  row.className = "activity-row";
  const dot = document.createElement("span");
  dot.className = "activity-dot dim";
  const content = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = "Pairing setup requested";
  const detail = document.createElement("small");
  detail.textContent = "Preview only · no device connected";
  content.append(title, detail);
  const time = document.createElement("time");
  time.textContent = "NOW";
  row.append(dot, content, time);
  activity.prepend(row);
});

document.querySelector("#themePulse").addEventListener("click", () => {
  document.body.classList.toggle("glow-boost");
  showToast("Interface glow updated.");
});

async function loadStatus() {
  try {
    const response = await fetch("/api/status", { headers: { "Accept": "application/json" } });
    if (!response.ok) throw new Error("Status unavailable");
    const status = await response.json();
    document.querySelector("#assistantStatus").textContent = status.assistant.toUpperCase();
    document.querySelector("#phoneStatus").textContent = status.phone === "not_paired" ? "NOT PAIRED" : status.phone.toUpperCase();
    document.querySelector("#systemState").textContent = status.assistant === "online" ? "SYSTEM ONLINE" : "SYSTEM CHECK";
  } catch {
    document.querySelector("#systemState").textContent = "STATUS UNAVAILABLE";
  }
}
loadStatus();
