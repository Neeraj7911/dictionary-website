async function getWordMeaning() {
  const word = document.getElementById("wordInput").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  if (word.trim() === "") {
    alert("Please enter a word");
    return;
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();

    const wordData = data[0];
    const meaning = wordData.meanings[0];
    const definition = meaning.definitions[0];

    let html = `<h2>${wordData.word}</h2>`;
    html += `<p><strong>Phonetic:</strong> ${wordData.phonetic}</p>`;
    html += `<p class="definition"><strong>Definition:</strong> ${definition.definition}</p>`;
    if (definition.example) {
      html += `<button onclick="showExample()">See Example</button>`;
      html += `<p class="example"><strong>Example:</strong> ${definition.example}</p>`;
    }

    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
}

function showExample() {
  const example = document.querySelector(".example");
  example.style.display = "block";
}
