const imageUrl = document.querySelector(".card-image img");
const nameOfPoke = document.querySelector(".name");
const typeofPoke = document.querySelector(".type");
const info = document.querySelector(".card-description");
const hp = document.querySelector(".hp-value");
const att = document.querySelector(".att-value");
const def = document.querySelector(".def-value");
const btn = document.querySelector("button");

const imgSet = (img, imgSrc) =>{
  img.setAttribute("src",imgSrc);
};

const setNameAndType = (pokeName, pokeType)=>{
  nameOfPoke.innerText = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  typeofPoke.innerText = pokeType.charAt(0).toUpperCase() + pokeType.slice(1);
};

const setDescription = (pokeDes)=>{  
  info.innerText = pokeDes;
};

const gatherInfo = (pokeInfo)=>{
  const speciesUrl = pokeInfo.species.url;
  return fetch(speciesUrl)
    .then(response => response.json())
    .then(speciesData => {
      const description = speciesData.flavor_text_entries[6].flavor_text;
      console.log(description);
      return description;
    });
}

const setThreeStats = (stats) =>{
  hp.innerText = stats.stats[0].base_stat;
  att.innerText = stats.stats[1].base_stat;
  def.innerText = stats.stats[2].base_stat;
};

const makePokeCard = (pokemon)=>{
  imgSet(imageUrl, pokemon.sprites.other.dream_world.front_default);
  setNameAndType(pokemon.name, pokemon.types[0].type.name);
  setThreeStats(pokemon);
  gatherInfo(pokemon).then((description) => {
    setDescription(description);
  });
}

const generatePokemon = ()=>{
  let randomNum = Math.floor(Math.random() * 258 + 1);

fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
.then((result) => result.json())
.then((json) => {
  const pokemon = json;
  console.log(json);
  makePokeCard(pokemon);
})
.catch((err) => console.log(err));
};

btn.addEventListener("click", ()=>{
  generatePokemon();
})
generatePokemon();
