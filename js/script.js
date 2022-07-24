const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let currentPokemon = '';

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.innerHTML = '../images/pokeballAnimated.gif';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ];

    input.value = '';
    currentPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Pokemon not found';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = '../images/pokeballAnimated.gif';

    input.value = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (currentPokemon > 1) {
    currentPokemon -= 1;
    renderPokemon(currentPokemon);
  } else {
    alert('This is the first pokemon');
  }
});

buttonNext.addEventListener('click', () => {
  currentPokemon += 1;
  renderPokemon(currentPokemon);
});
