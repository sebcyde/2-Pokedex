// retrieve data then add entry numbers to array then create elements based on array order, can use array to sort from high to low and from low to high

axios
	.get('https://pokeapi.co/api/v2/pokemon?limit=1118')
	.then((results) => {
		const PokeDexEntryNumbers = [];
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
				console.log(RawPokeData);
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
				const PName = Poke.name;
				const CappedPname = PName.charAt(0).toUpperCase() + PName.slice(1);
				PokemonName.innerText = CappedPname;
				PokemonNameList.push(Poke.name);
				PokemonSpan.appendChild(PokemonName);
				const PokemonTypes = document.createElement('div');
				PokemonTypes.classList.add('PokemonTypes');
				PokemonSpan.appendChild(PokemonTypes);
				const PokemonEntryNumber = document.createElement('h4');
				PokemonEntryNumber.classList.add('EntryNumber');
				PokemonEntryNumber.innerText = ` #${RawPokeData.id}`;
				PokeDexEntryNumbers.push(RawPokeData.id);
				PokemonTypes.appendChild(PokemonEntryNumber);
				const PokemonType1 = document.createElement('h4');
				PokemonType1.classList.add('Type1');
				PokemonType1.innerText = RawPokeData.types[0].type.name;
				PokemonType1.classList.add(RawPokeData.types[0].type.name);
				PokemonTypes.appendChild(PokemonType1);
				if (RawPokeData.types.length > 1) {
					const PokemonType2 = document.createElement('h4');
					PokemonType2.classList.add('Type2');
					PokemonType2.innerText = RawPokeData.types[1].type.name;
					PokemonType2.classList.add(RawPokeData.types[1].type.name);
					PokemonTypes.appendChild(PokemonType2);
				}
				PokeCard.appendChild(PokemonSpan);
				const EDDiv = document.createElement('div');
				EDDiv.classList.add('SelectedMarker');

				EDDiv.classList.add('Hidden');
				const BaseXP = document.createElement('h5');
				BaseXP.innerText = `Base XP: ${RawPokeData.base_experience}`;
				EDDiv.appendChild(BaseXP);
				const Height = document.createElement('h5');
				Height.innerText = `Height: ${RawPokeData.height}`;
				EDDiv.appendChild(Height);
				const Weight = document.createElement('h5');
				Weight.innerText = `Weight: ${RawPokeData.weight}`;
				EDDiv.appendChild(Weight);
				PokeCard.appendChild(EDDiv);

				PokeCard.appendChild(EDDiv);
				window.addEventListener('click', () => {
					if (PokeCard.classList.contains('Selected')) {
						PokeCard.classList.remove('Selected');
						EDDiv.classList.add('Hidden');
					}
				});
				PokeCard.addEventListener('click', (event) => {
					event.stopPropagation();
					const AllPokeCards = document.querySelectorAll('div.PokeCard');
					const AllEDDivs = document.querySelectorAll('div.SelectedMarker');
					// console.log(AllPokeCards);
					console.log(AllEDDivs);
					Array.from(AllPokeCards).map((PCard) => {
						if (PCard.classList.contains('Selected')) {
							PCard.classList.remove('Selected');
							Array.from(AllEDDivs).map((EDivs) => {
								EDivs.classList.add('Hidden');
								EDivs.classList.remove('EDDiv');
							});
						}
					});

					if (!PokeCard.classList.contains('Selected')) {
						PokeCard.classList.add('Selected');
						EDDiv.classList.remove('Hidden');
						EDDiv.classList.add('EDDiv');
					}
				});
			});
			document.querySelector('.LeftSection').appendChild(PokeCardContainer);
		});
		console.log(PokemonNameList);
		console.log(PokDexEntryNumbers);
	})
	.catch((error) => {
		console.log(error);
	});
