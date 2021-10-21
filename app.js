// retrieve data then add entry numbers to array then create elements based on array order, can use array to sort from high to low and from low to high

const PokeDexEntryNumbers = [];
const PokemonNameList = [];

screen.orientation.lock(portrait - primary);

document.querySelector('.ENL2H').selected = true;
document.querySelector('.MENL2H').selected = true;

document.querySelector('#btt').addEventListener('click', () => {
	document.querySelector('.LeftSection').scrollTo(0, 0);
	console.log('Clicked');
});

let time = 1;

function Create(time, selector) {
	axios
		.get('https://pokeapi.co/api/v2/pokemon?limit=1118')
		.then((results) => {
			if (time > 1 && selector == 'left') {
				let PC = document.querySelector('div.PokeCardContainer');
				let PCAll = document.querySelectorAll('div.PokeCardContainer');
				PCAll.forEach((C) => {
					C.classList.add('Hidden');
				});
				document.getElementById('LoadingSignal').classList.remove('Hidden');

				if (document.querySelector('.MENH2L').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
					console.log('Sorted by entry number H2L');
					results.data.results.reverse();
				} else if (document.querySelector('.MENL2H').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
				} else if (document.querySelector('.MAA2Z').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
					results.data.results.sort((a, b) => (a.name > b.name ? 1 : -1));
				} else if (document.querySelector('.MAZ2A').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
					results.data.results.sort((a, b) => (b.name > a.name ? 1 : -1));
				}
			}

			if (time > 1 && selector == 'right') {
				let PC = document.querySelector('div.PokeCardContainer');
				let PCAll = document.querySelectorAll('div.PokeCardContainer');
				PCAll.forEach((C) => {
					C.classList.add('Hidden');
				});
				document.getElementById('LoadingSignal').classList.remove('Hidden');

				if (document.querySelector('.ENH2L').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
					console.log('Sorted by entry number H2L');
					results.data.results.reverse();
				} else if (document.querySelector('.ENL2H').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
				} else if (document.querySelector('.AA2Z').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
					results.data.results.sort((a, b) => (a.name > b.name ? 1 : -1));
				} else if (document.querySelector('.AZ2A').selected === true) {
					if (
						document.querySelector('section#LeftSection').contains(PC) === true
					) {
						PCAll.forEach((Card) => {
							Card.parentNode.removeChild(Card);
						});
					}
					results.data.results.sort((a, b) => (b.name > a.name ? 1 : -1));
				}
			}

			const LoadingSignal = document.querySelector('#LoadingSignal');

			console.log(results.data.results);

			results.data.results.map((Poke) => {
				const x = Poke.name;
				let PokeCardContainer = document.createElement('div');
				PokeCardContainer.classList.add('PokeCardContainer');
				PokeCardContainer.classList.add('Hidden');

				// default PokeCard List
				axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`).then((results) => {
					const RawPokeData = results.data;

					const PokeCard = document.createElement('div');
					PokeCard.classList.add('PokeCard');
					PokeCardContainer.appendChild(PokeCard);
					const PokemonSprite = document.createElement('img');
					PokemonSprite.src = LoadingSignal.src;

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

						if (document.querySelector('#C1').classList.contains('Hidden')) {
							document.querySelector('#C1').classList.remove('Hidden');
						}

						if (document.querySelector('#C2').classList.contains('Hidden')) {
							document.querySelector('#C2').classList.remove('Hidden');
						}

						if (document.querySelector('#C3').classList.contains('Hidden')) {
							document.querySelector('#C3').classList.remove('Hidden');
						}

						if (document.querySelector('#C4').classList.contains('Hidden')) {
							document.querySelector('#C4').classList.remove('Hidden');
						}

						document.querySelector('.FrontImage').src = '';
						document.querySelector('.BackImage').src = '';
						document.querySelector('.ShinyFront').src = '';
						document.querySelector('.ShinyBack').src = '';

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

											if (Info.sprites.front_default == null) {
												document.querySelector('.FrontImage').src =
													'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
											} else {
												document.querySelector('.FrontImage').src =
													Info.sprites.front_default;
											}

											if (Info.sprites.back_default == null) {
												document.querySelector('.BackImage').src =
													'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
											} else {
												document.querySelector('.BackImage').src =
													Info.sprites.back_default;
											}

											if (Info.sprites.front_shiny == null) {
												document.querySelector('.ShinyFront').src =
													'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
											} else {
												document.querySelector('.ShinyFront').src =
													Info.sprites.front_shiny;
											}

											if (Info.sprites.back_shiny == null) {
												document.querySelector('.ShinyBack').src =
													'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
											} else {
												document.querySelector('.ShinyBack').src =
													Info.sprites.back_shiny;
											}

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
											document
												.querySelector('.RightRightStats')
												.appendChild(h2);

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

				PokeCardContainer.classList.remove('Hidden');
				LoadingSignal.classList.add('Hidden');
			});

			console.log(time);
		})
		.catch((error) => {
			console.log(error);
		});
}

//Sort PokeDex Logic

Create(time);
const SortOptions = document.querySelectorAll('option');
console.log(SortOptions);

document.querySelector('#MobilePokeSorter').addEventListener('change', () => {
	time++;
	console.log(time);
	console.log(document.querySelector('#MobilePokeSorter').value);
	document.querySelector('#PokeSorter').value =
		document.querySelector('#MobilePokeSorter').value;
	Create(time, 'left');
});

document.querySelector('#PokeSorter').addEventListener('change', () => {
	time++;
	console.log(time);
	console.log(document.querySelector('#PokeSorter').value);
	document.querySelector('#MobilePokeSorter').value =
		document.querySelector('#PokeSorter').value;
	Create(time, 'right');
});
