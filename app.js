// retrieve data then add entry numbers to array then create elements based on array order, can use array to sort from high to low and from low to high

axios
	.get('https://pokeapi.co/api/v2/pokemon?limit=1118')
	.then((results) => {
		const PokDexEntryNumbers = [];
		const PokemonNameList = [];

		let RawResults = results.data.results;
		const LoadingSignal = document.querySelector('#LoadingSignal');
		LoadingSignal.classList.add('Hidden');

		RawResults.map((Poke) => {
			const x = Poke.name;
			const PokeCardContainer = document.createElement('div');

			PokeCardContainer.classList.add('PokeCardContainer');
			axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`).then((results) => {
				const RawPokeData = results.data;
				const PokeCard = document.createElement('div');
				PokeCard.classList.add('PokeCard');
				PokeCardContainer.appendChild(PokeCard);
				const PokemonSprite = document.createElement('img');
				PokemonSprite.src = '/assets/LoadingSignal.gif';

				PokemonSprite.src = RawPokeData.sprites.front_default;
				PokeCard.appendChild(PokemonSprite);
				const PokemonSpan = document.createElement('span');
				PokemonSpan.classList.add('Pokemon');
				PokeCardContainer.appendChild(PokemonSpan);
				const PokemonName = document.createElement('h3');
				PokemonName.classList.add('PokemonName');
				PokemonName.innerText = Poke.name;
				PokemonNameList.push(Poke.name);
				PokemonSpan.appendChild(PokemonName);
				const PokemonTypes = document.createElement('div');
				PokemonTypes.classList.add('PokemonTypes');
				PokemonSpan.appendChild(PokemonTypes);
				const PokemonEntryNumber = document.createElement('h4');
				PokemonEntryNumber.classList.add('EntryNumber');
				PokemonEntryNumber.innerText = `PokeDex # ${RawPokeData.id}`;
				PokDexEntryNumbers.push(RawPokeData.id);
				PokemonTypes.appendChild(PokemonEntryNumber);
				const PokemonType1 = document.createElement('h4');
				PokemonType1.classList.add('Type1');
				PokemonType1.innerText = RawPokeData.types[0].type.name;
				PokemonTypes.appendChild(PokemonType1);
				if (RawPokeData.types.length > 1) {
					const PokemonType2 = document.createElement('h4');
					PokemonType2.classList.add('Type2');
					PokemonType2.innerText = RawPokeData.types[1].type.name;
					PokemonTypes.appendChild(PokemonType2);
				}
				PokeCard.appendChild(PokemonSpan);
			});
			document.querySelector('.LeftSection').appendChild(PokeCardContainer);
		});
		console.log(PokemonNameList);
		console.log(PokDexEntryNumbers);
	})
	.catch((error) => {
		console.log(error);
	});

/* <div class="PokeCardContainer">
    <div class="PokeCard">
        <img src="https://purepng.com/public/uploads/large/purepng.com-pokemonpokemonpocket-monsterspokemon-franchisefictional-speciesone-pokemonmany-pokemonone-pikachu-1701527784845bdjl3.png"
            alt="">
        <span class="Pokemon">
            <h3 class="PokemonName">Pikachu</h3>
            <div class="PokemonTypes">
                <h4 class="EntryNumber">#17</h4>
                <h4 class="Type1">Electric</h4>
                <h4 class="Type2">Flying</h4>
            </div>
        </span>

    </div>
    <div class="ExtraContentHidden">
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci dolore aliquam et, ut
            porro
            doloremque minima ipsam rerum vel?</h4>
        <h5>First Appeared: Sinnoh</h5>
    </div>
</div>

*/
