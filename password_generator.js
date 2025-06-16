const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*-+=?";
const result = document.getElementById("result");
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");
const lengthInput = document.getElementById("password-length");
const historyList = document.getElementById("history");
const sound = document.getElementById("sound");

let history = [];

generateButton.addEventListener("click", generate);
copyButton.addEventListener("click", () => {
    result.select();
    document.execCommand("copy");
});

function generate() {
    const length = parseInt(lengthInput.value);
    const mode = document.getElementById("generation-mode").value;

    let password = "";

    switch (mode) {
        case "pronounceable":
            password = generatePronounceable(length);
            break;
        case "passphrase":
            password = generatePassphrase();
            break;
        case "superhero":
            password = generateWithTheme(length, ["IronMan", "Flash", "Thor", "Spidey", "Hulk", "Joker"]);
            break;
        case "anime":
            password = generateWithTheme(length, ["Naruto", "Goku", "Luffy", "Zoro", "Tanjiro"]);
            break;
        default:
            password = generateStandard(length);
    }

    result.value = password;
    playSound();
    updateHistory(password);
}

function generateStandard(length) {
    let characters = "";
    if (document.getElementById("lowercase-option").checked) characters += lowercase;
    if (document.getElementById("uppercase-option").checked) characters += uppercase;
    if (document.getElementById("number-option").checked) characters += numbers;
    if (document.getElementById("special-option").checked) characters += symbols;

    if (characters.length === 0) return "Select at least one option";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function generatePronounceable(length) {
    const consonants = "bcdfghjklmnpqrstvwxyz";
    const vowels = "aeiou";
    let result = "";
    for (let i = 0; i < length / 2; i++) {
        result += consonants[Math.floor(Math.random() * consonants.length)];
        result += vowels[Math.floor(Math.random() * vowels.length)];
    }
    return result.substring(0, length);
}

function generatePassphrase() {
    const words = ["blue", "monkey", "river", "dance", "sky", "fire", "ghost", "ninja", "star", "moon"];
    let phrase = "";
    for (let i = 0; i < 4; i++) {
        phrase += words[Math.floor(Math.random() * words.length)] + "-";
    }
    return phrase.slice(0, -1);
}

function generateWithTheme(length, themeWords) {
    let base = generateStandard(Math.max(length - 6, 4));
    let word = themeWords[Math.floor(Math.random() * themeWords.length)];
    return base + word;
}

function playSound() {
    sound.currentTime = 0;
    sound.play();
}

function updateHistory(pw) {
    history.unshift(pw);
    if (history.length > 5) history.pop();

    historyList.innerHTML = "";
    history.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p;
        historyList.appendChild(li);
    });
}
