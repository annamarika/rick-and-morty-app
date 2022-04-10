import "./style.css";

let fetched = false;
let currentFilter = "all";

const apiURL = "https://rickandmortyapi.com/api/character";
const container = document.querySelector("[data-js=container]");
const containerCharacters = document.querySelector(
  "[data-js=containerCharacters]"
);

container.innerHTML = `
  <button class="character__button" data-js="button">Click here</button>
  <form class= "form" data-js="filter-form" aria-labeledby="form-heading">
  <fieldset class="form__fieldset">
    <legend id="form-heading" class="form__legend">Filter by status:</legend>
    <input
      name="tag-filter"
      value="all"
      class="tag-input"
      id="tag-all"
      type="radio"
      checked
    />
    <label class="tag-label" for="tag-all">all</label>
    <input
      name="tag-filter"
      value="Alive"
      class="tag-input"
      id="tag-alive"
      type="radio"
    />
    <label class="tag-label" for="tag-basic">alive</label>
    <input
      name="tag-filter"
      value="Dead"
      class="tag-input"
      id="tag-dead"
      type="radio"
    />
    <label class="tag-label" for="tag-css">dead</label>
    <input
      name="tag-filter"
      value="unknown"
      class="tag-input"
      id="tag-unknown"
      type="radio"
    />
    <label class="tag-label" for="tag-git">unknown</label>
  </fieldset>
</form>
  `;

const button = document.querySelector("[data-js=button]");

button.addEventListener("click", () => {
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
const filterForm = document.querySelector("[data-js=filter-form]");
function characterList(characters) {
  const list = document.createElement("ul");
  list.className = "list";
  containerCharacters.append(list);

  characters
    .filter(
      (character) =>
        character.status.includes(currentFilter) || currentFilter === "all"
    )
    .forEach((character) => {
      const item = document.createElement("li");
      item.className = "item";
      item.innerHTML = `
       <img src="${character.image}"/>
      <p class="character__name">${character.name}</p>
    `;

      list.append(item);
    });
}
filterForm.addEventListener("change", () => {
  containerCharacters.innerHTML = "";
  currentFilter = filterForm.elements["tag-filter"].value;

  const data = fetchCharacters(apiURL);
  characterList(data);
});
