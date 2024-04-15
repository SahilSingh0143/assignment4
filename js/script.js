const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const searchResult = document.getElementById("search-result");
const audioElement = document.getElementById("sound");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    let inputWord = document.getElementById("input-word").value;
    fetch(`${apiUrl}${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            searchResult.innerHTML = `
            <div class="word">
                    <h3>${inputWord}</h3>
                    <button onclick="playAudio()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            audioElement.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            searchResult.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

function playAudio() {
    audioElement.play();
}
