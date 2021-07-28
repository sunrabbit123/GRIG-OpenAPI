const validTime = document.querySelector('.valid-time');
const validBtn = document.querySelector('.valid-btn');
const formInput = document.querySelector('.form-input')

let disabled = true
let timer;

function Timer() {
    validTime.innerText = `${Math.floor(timer / 60)}분 ${timer % 60}초`;
    timer -= 1;
    if (timer <= 0) {
        validTime.style.display = "none"
        clearInterval(loop);
        validBtn.disabled = !disabled;
        formInput.disabled = !disabled;
        validBtn.style.cursor = "pointer"
    }
}

validBtn.addEventListener("click", e => {
    e.preventDefault();
    
    validBtn.disabled = disabled;
    formInput.disabled = disabled;

    validTime.style.display = "block"
    validBtn.style.cursor = "auto"

    timer = 60 * 5;

    Timer();
    loop = setInterval(Timer, 1000);
});