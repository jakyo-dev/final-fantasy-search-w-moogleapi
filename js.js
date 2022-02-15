// assigning API urls
const charactersAPI = "https://www.moogleapi.com/api/v1/characters";
const monstersAPI = "https://www.moogleapi.com/api/v1/monsters";
const gamesAPI = "https://www.moogleapi.com/api/v1/games";
const randomAPI = "https://www.moogleapi.com/api/v1/characters/random";

// This container will contain the search output.
const container = document.getElementById("container");

// display number of entries
const entriesEl = document.getElementById("entries"); // ????
const charEntEl = document.getElementById("charentries");
const monsEntEl = document.getElementById("monsentries");
const gamesEntEl = document.getElementById("gameentries");

// will contain filtered data to output later
let dataToSearchThrough = [];

// Data variables, to globally store data later after the fetches
let characterData;
let monsterData;
let gameData;

const typeCharacter = "Character";
const typeMonster = "Monster";
const typeGame = "Game";

// checkboxes
const characterCh = document.querySelector("input[name=characters]");
const monsterCh = document.querySelector("input[name=monsters]");
const gameCh = document.querySelector("input[name=games]");

// assign search elements and perform function to keep search term updated and output.
const search = document.getElementById("searchInp");
let searchTerm = "";
search.oninput = updateSearch;
function updateSearch() {
  searchTerm = search.value.toLowerCase();
  console.log(
    `The search field's value is "${searchTerm}" and ${searchTerm.length} character(s) long.`
  );
  performSearchOutput();
}

// class for the different arrays that contain search data (characters, monsters, games)
class Data {
  constructor(type, arr) {
    this.type = type;
    this.arr = arr;
  }
  add() {
    if (this.arr == null)
      return console.log("addToOutput(arr): arr is undefined");
    dataToSearchThrough = dataToSearchThrough.concat(this.arr);
    performSearchOutput();
    console.log(`${this.arr[0].typeTag}s succesfully added!`);
  }
  remove() {
    if (this.type == null)
      return console.log("removeFromOutput(type): type is undefined");
    dataToSearchThrough = dataToSearchThrough.filter(
      (x) => x.typeTag !== this.type
    );
    performSearchOutput();
    console.log(`${this.type} succesfully removed!`);
  }
}

/*-----------------------------------
-- add, load and assign their classes ALL data from Moogle API
------------------------------------*/
const getCharacterData = async () => {
  const response = await fetch(charactersAPI);
  const data = await response.json();
  for (let character of data) {
    character.typeTag = typeCharacter;
    if (character.pictures.length != 0)
      character.pic = character.pictures["0"].url;
    charEntEl.innerHTML = "⤷ Characters: " + data.length + " entries";
  }
  return data;
};
const getMonsterData = async () => {
  const response = await fetch(monstersAPI);
  const data = await response.json();
  for (let monster of data) {
    monster.typeTag = typeMonster;
    monster.pic = monster.picture;
  }
  monsEntEl.innerHTML = "⤷ Monsters: " + data.length + " entries";
  return data;
};
const getGameData = async () => {
  const response = await fetch(gamesAPI);
  const data = await response.json();
  for (let game of data) {
    game.name = game.title;
    game.typeTag = typeGame;
  }
  gamesEntEl.innerHTML = "⤷ Games: " + data.length + " entries";
  return data;
};

Promise.all([getCharacterData(), getMonsterData(), getGameData()]).then(
  (values) => {
    values.forEach((x) => {
      if (x[0].typeTag === typeCharacter) {
        characterData = new Data(typeCharacter, x);
        characterData.add();
      }
      if (x[0].typeTag === typeMonster) {
        monsterData = new Data(typeMonster, x);
        monsterData.add();
      }
      if (x[0].typeTag === typeGame) {
        gameData = new Data(typeGame, x);
        gameData.add();
      }
    });

    console.log("characterData: ", characterData);
    console.log("monsterData: ", monsterData);
    console.log("gameData: ", gameData);

    // initial checkbox check to remove data
    if (!characterCh.checked) characterData.remove();
    if (!monsterCh.checked) monsterData.remove();
    if (!gameCh.checked) gameData.remove();

    console.log("dataToSearchThrough: ", dataToSearchThrough);

    // update search term
    updateSearch();

    performSearchOutput();

    // This can be used later to perform an initial filtering based on checkboxes
    // console.log("ALL DATA LOADED", dataToSearchThrough);
    // if (!characterCh.checked) removeFromOutput(characterData)
    // if (!monsterCh.checked) removeFromOutput(monsterData)
    // if (!gameCh.checked) removeFromOutput(gameData)
    // console.log("ALL DATA FILTERED BASED ON CHECKBOXES", dataToSearchThrough);
  }
);

/*-----------------------------------
-- add or remove data based on checkboxes after page has loaded
------------------------------------*/
characterCh.addEventListener("change", function () {
  if (this.checked) characterData.add();
  if (!this.checked) characterData.remove();
});
monsterCh.addEventListener("change", function () {
  if (this.checked) monsterData.add();
  if (!this.checked) monsterData.remove();
});
gameCh.addEventListener("change", function () {
  if (this.checked) gameData.add();
  if (!this.checked) gameData.remove();
});

/*-----------------------------------
-- CREATE RANDOM CHARACTER
-- Still based on the old function createBox, which is shit but works for now.
------------------------------------*/
const randomCharacterBtn = document.getElementById("randomChar");
randomCharacterBtn.addEventListener("click", () => {
  fetch(randomAPI)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      if (data.pictures.length != 0) {
        data.pic = data.pictures["0"].url;
      }
      let { name, pic, japaneseName, origin, description, typeTag } = data;
      return createBox(name, pic, japaneseName, origin, description, typeTag);
    });
});

/*-----------------------------------
-- CREATE ENTRIES
------------------------------------*/
function createEntry(el) {
  if (el.typeTag === typeCharacter) {
    // console.log(el);

    const box = document.createElement("div");
    // box.setAttribute("id", `${id}`);
    box.classList.add("output-box", typeCharacter);

    if (el.pic) {
      const img = document.createElement("img");
      img.classList.add("imagebox");
      img.src = `${el.pic}`;
      box.appendChild(img);
    }

    const type = document.createElement("p");
    type.classList.add("typecharacter");
    type.innerHTML = el.typeTag;
    box.appendChild(type);

    const cName = document.createElement("p");
    cName.innerHTML = `Name: ${el.name}`;
    box.appendChild(cName);

    if (el.japaneseName) {
      const jName = document.createElement("p");
      jName.innerHTML = `Japanese: ${el.japaneseName}`;
      box.appendChild(jName);
    }

    const cOrigin = document.createElement("p");
    cOrigin.innerHTML = `First appeared in: ${el.origin}`;
    box.appendChild(cOrigin);

    if (el.description) {
      const cDescription = document.createElement("p");
      cDescription.innerHTML = `${el.description}`;
      box.appendChild(cDescription);
    }

    container.appendChild(box);
    // console.log(box);
  }

  if (el.typeTag === typeMonster) {
    const box = document.createElement("div");
    // box.setAttribute("id", `${id}`);
    box.classList.add("output-box", typeMonster);

    if (el.pic) {
      const img = document.createElement("img");
      img.classList.add("imagebox");
      img.src = `${el.pic}`;
      box.appendChild(img);
    }

    const type = document.createElement("p");
    type.classList.add("typemonster");
    type.innerHTML = el.typeTag;
    box.appendChild(type);

    const cName = document.createElement("p");
    cName.innerHTML = `Name: ${el.name}`;
    box.appendChild(cName);

    if (el.japaneseName) {
      const jName = document.createElement("p");
      jName.innerHTML = `Japanese: ${el.japaneseName}`;
      box.appendChild(jName);
    }

    const cOrigin = document.createElement("p");
    cOrigin.innerHTML = `First appeared in: ${el.origin}`;
    box.appendChild(cOrigin);

    if (el.description) {
      const cDescription = document.createElement("p");
      cDescription.innerHTML = `${el.description}`;
      box.appendChild(cDescription);
    }

    container.appendChild(box);
  }

  if (el.typeTag === typeGame) {
    const box = document.createElement("div");
    // box.setAttribute("id", `${id}`);
    box.classList.add("output-box", typeGame);

    if (el.picture) {
      const img = document.createElement("img");
      img.classList.add("imagebox", "imagebox-game");
      img.src = `${el.picture}`;
      box.appendChild(img);
    }

    const type = document.createElement("p");
    type.classList.add("typegame");
    type.innerHTML = el.typeTag;
    box.appendChild(type);

    const cName = document.createElement("p");
    cName.innerHTML = `Name: ${el.name}`;
    box.appendChild(cName);

    if (el.description) {
      const cDescription = document.createElement("p");
      cDescription.innerHTML = `${el.description}`;
      box.appendChild(cDescription);
    }

    container.appendChild(box);
  }
}

/*-----------------------------------
-- RANDOM CHARACTER
------------------------------------*/
function createBox(name, pic, japaneseName, origin, description, typeTag) {
  const box = document.createElement("div");
  // box.setAttribute("id", `${id}`);
  box.classList.add("output-box");

  if (pic) {
    const img = document.createElement("img");
    img.classList.add("imagebox");
    img.src = `${pic}`;
    box.appendChild(img);
  }

  if (typeTag === "Character") {
    const type = document.createElement("p");
    type.classList.add("typecharacter");
    type.innerHTML = typeTag;
    box.appendChild(type);
  }
  if (typeTag === "Monster") {
    const type = document.createElement("p");
    type.classList.add("typemonster");
    type.innerHTML = typeTag;
    box.appendChild(type);
  }

  const cName = document.createElement("p");
  cName.innerHTML = `Name: ${name}`;
  box.appendChild(cName);

  if (japaneseName) {
    const jName = document.createElement("p");
    jName.innerHTML = `Japanese: ${japaneseName}`;
    box.appendChild(jName);
  }

  const cOrigin = document.createElement("p");
  cOrigin.innerHTML = `First appeared in: ${origin}`;
  box.appendChild(cOrigin);

  if (description) {
    const cDescription = document.createElement("p");
    cDescription.innerHTML = `${description}`;
    box.appendChild(cDescription);
  }

  container.appendChild(box);
  // console.log(box);
}

/*-----------------------------------
-- OUTPUT MATCHING TERMS FUNCTION
------------------------------------*/
function performSearchOutput() {
  // reset output container
  container.innerHTML = "";

  if (searchTerm.length < 2) {
    let initialMsg = document.createElement("div");
    initialMsg.classList.add("output-box", "initialmsg");
    let p = document.createElement("p");
    p.innerHTML =
      "Please enter serach term that is at least two characters long";
    initialMsg.appendChild(p);
    container.appendChild(initialMsg);
  }

  // sort array
  dataToSearchThrough
    .sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    })
    .sort((a, b) => {
      const regExp = new RegExp(`^${searchTerm}|\s?${searchTerm}`, "i");
      let aN = a.name.toLowerCase().match(regExp);
      let bN = b.name.toLowerCase().match(regExp);
      let aL = 0;
      let bL = 0;

      if (aN !== null) aL = aN[0].split("").length;
      if (bN !== null) bL = bN[0].split("").length;

      return bL - aL;
    });

  // finally, output!
  dataToSearchThrough.forEach((el) => {
    if (searchTerm.length < 2) return;
    let searchableText = el.name.toLowerCase();
    if (el.description) searchableText += " " + el.description.toLowerCase();
    if (searchableText.includes(searchTerm)) createEntry(el);
  });
}

/*-----------------------------------
-- LEGACY SOLUTION: SEARCH AND OUTPUT BASED ON SEARCH BAR INPUT VALUE, UPDATED BY KEYUP EVENT
------------------------------------*/
// search.addEventListener("keyup", (e) => {

//     searchTerm = e.target.value;

//     performSearchOutput();

// });
