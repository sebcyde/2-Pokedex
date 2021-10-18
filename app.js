// retrieve data then add entry numbers to array then create elements based on array order, can use array to sort from high to low and from low to high

const PokeDexEntryNumbers = [];
const PokemonNameList = [];

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

document.querySelector('#mbps').addEventListener('click', () => {
	document.querySelector('.LeftSection').scrollTo(0, 0);
	console.log('Clicked');
});

axios
	.get('https://pokeapi.co/api/v2/pokemon?limit=1118')
	.then((results) => {
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

				PokeCard.addEventListener('click', (event) => {
					const AllPokeCards = document.querySelectorAll('div.PokeCard');
					const AllEDDivs = document.querySelectorAll('div.SelectedMarker');
					console.log(AllPokeCards);

					Array.from(AllPokeCards).map((PCard) => {
						if (PCard.classList.contains('Selected')) {
							PCard.classList.remove('Selected');
							// Array.from(AllEDDivs).map((EDivs) => {
							// 	EDivs.classList.add('Hidden');
							// 	EDivs.classList.remove('EDDiv');
							// });
						}
					});

					if (!PokeCard.classList.contains('Selected')) {
						PokeCard.classList.add('Selected');
						// EDDiv.classList.remove('Hidden');
						// EDDiv.classList.add('EDDiv');

						const AllPokeCards = document.querySelectorAll('div.PokeCard');
						console.log(AllPokeCards);

						Array.from(AllPokeCards).map((PCard) => {
							if (PCard.classList.contains('Selected')) {
								let x =
									PCard.childNodes[1].childNodes[0].innerText.toLowerCase();
								document.querySelector('.RightPokemonName').innerText =
									PCard.childNodes[1].childNodes[0].innerText;

								axios
									.get(`https://pokeapi.co/api/v2/pokemon/${x}`)
									.then((results) => {
										document.querySelector('.RightTypes').innerHTML = '';

										console.log(results.data);
										const Info = results.data;

										document.querySelector(
											'.RightEntryNumber'
										).innerText = `Entry Number #${Info.id}`;

										document.querySelector('.FrontImage').src =
											Info.sprites.front_default;

										document.querySelector('.BackImage').src =
											Info.sprites.back_default;
										document.querySelector('.ShinyFront').src =
											Info.sprites.front_shiny;
										document.querySelector('.ShinyBack').src =
											Info.sprites.back_shiny;

										const RT1 = document.createElement('div');
										RT1.classList.add(Info.types[0].type.name);
										document.querySelector('.RightTypes').appendChild(RT1);

										RT1.innerText = Info.types[0].type.name;

										if (Info.types.length > 1) {
											const RT2 = document.createElement('div');
											RT2.classList.add(Info.types[1].type.name);
											document.querySelector('.RightTypes').appendChild(RT2);
											RT2.innerText = Info.types[1].type.name;
										}

										document.querySelector(
											'.BXP'
										).innerText = `Base XP: ${Info.base_experience}`;
										document.querySelector(
											'.H'
										).innerText = `Height: ${Info.height}`;
										document.querySelector(
											'.W'
										).innerText = `Weight: ${Info.weight}`;

										document.querySelector('.RightRightStats').innerHTML = '';

										const h2 = document.createElement('h2');
										h2.classList.add('AbilitiesHeader');
										h2.innerText = 'Abilities';
										document.querySelector('.RightRightStats').appendChild(h2);

										for (
											let index = 0;
											index < Info.abilities.length;
											index++
										) {
											const Ab = document.createElement('p');
											Ab.classList.add('Ability');
											Ab.innerText = Info.abilities[index].ability.name;
											document
												.querySelector('.RightRightStats')
												.appendChild(Ab);
										}
									})
									.catch((err) => {
										console.log(err);
									});
							}
						});
					}
				});
			});
			document.querySelector('.LeftSection').appendChild(PokeCardContainer);
		});

		//Sort PokeDex Logic
		console.log(PokemonNameList);
		console.log(PokeDexEntryNumbers);
	})
	.catch((error) => {
		console.log(error);
	});
