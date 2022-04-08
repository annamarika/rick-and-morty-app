import "./style.css";

let fetched = false;

const apiURL = "https://rickandmortyapi.com/api/character";
const container = document.querySelector("[data-js=container]");
const button = document.createElement("div");

button.innerHTML = `
  <button class="character__button">Click here</button>
  `;
container.append(button);
button.addEventListener("click", (event) => {
  if (!fetched) {
    fetchCharacters(apiURL);
    fetched = !fetched;
  }
});

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    characterList(data.results);
  } catch (error) {
    console.error(error.message);
  }
}

function characterList(characters) {
  let list = document.createElement("ul");
  list.className = "list";
  button.append(list);

  characters.forEach(({ name, image }) => {
    const item = document.createElement("li");
    item.className = "item";
    item.innerHTML = `
       <img src="${image}"/>
      <p>${name}</p>
    `;

    list.append(item);
  });
}
