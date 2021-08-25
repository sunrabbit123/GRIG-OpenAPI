const validTime = document.querySelector(".valid-time");
const validBtn = document.querySelector(".valid-btn");
const sendMessage = document.querySelector(".send");
const faildSendMessage = document.querySelector(".faild-send");
const codeInput = document.querySelector(".code");
const emailInput = document.querySelector(".form-input");

let disabled = true;
let timer;
let loop;

function Timer() {
  validTime.innerText = `${Math.floor(timer / 60)}분 ${timer % 60}초`;
  timer -= 1;
  if (timer < 0) {
    validTime.style.display = "none";
    sendMessage.style.display = "none";
    clearInterval(loop);
  }
}

function isGSMEmail() {
  return !(
    emailInput.value.slice(-10) !== "@gsm.hs.kr" ||
    !emailInput.value.startsWith("s")
  );
}
function submitAndStartTimer() {
  faildSendMessage.style.display = "none";
  sendMessage.style.display = "none";
  faildSendMessage.style.display = "none";

  if (!isGSMEmail()) {
    faildSendMessage.style.display = "block";
    return false;
  }
  validTime.style.display = "block";
  sendMessage.style.display = "block";

  timer = 60 * 5;
  if (loop) clearInterval(loop);

  Timer();
  loop = setInterval(Timer, 1000);
  return false;
}

const code = new URLSearchParams(window.location.search)
  .get("code")
  .replace("<", "&lt;")
  .replace(">", "&gt;")
  .replace('"', "&quot;");
codeInput.value = code;
