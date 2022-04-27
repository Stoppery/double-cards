(() => {

	function createAmountForm() {
		const amountContainer = document.createElement('div');
		const amountForm = document.createElement('form');
		const formInput = document.createElement('input');
		const formHeader = document.createElement('h2');
		const formButton = document.createElement('button');


		amountContainer.style.height = '98vh';
		amountContainer.style.display = 'flex';
		amountContainer.style.alignItems = 'center';
		amountContainer.style.justifyContent = 'center';

		formHeader.innerText = 'Кол-во карточек по вертикали/горизонтали';
		formButton.innerText = 'Начать игру';
		formInput.setAttribute('type', 'number');
		formInput.setAttribute('placeholder', 'Кол-во карточек по вертикали/горизонтали');

		amountForm.style.backgroundColor = '#87CEEB';
		amountForm.style.padding = '40px';
		amountForm.style.borderRadius = '10px';

		formInput.style.width = '70%';
		formInput.style.marginRight = '10px';

		document.body.append(amountContainer);
		amountContainer.append(amountForm);
		amountForm.append(formHeader,formInput,formButton);

		return {
			amountContainer,
			amountForm,
			formInput,
			formButton
		};
	}

	function getAmount() {
		const startForm = createAmountForm();

		let cardsAmount = 4;

		startForm.amountForm.addEventListener('submit', function (e) {
			let inputNumber = parseInt(startForm.formInput.value);
			e.preventDefault();

			if (!startForm.formInput.value) {
				return;
			}

			if ((inputNumber > cardsAmount && inputNumber <= 10 && inputNumber % 2 === 0) || inputNumber === 2) {
				cardsAmount = inputNumber;
			}

			startForm.amountContainer.remove();
			createCards(cardsAmount);
		});
	}

	function checkTwoCards(twoCardsOpened,counter, amountOfCards) {
		if(parseInt(twoCardsOpened[0].innerText) !== parseInt(twoCardsOpened[1].innerText)) {
			for (let j = 0; j < twoCardsOpened.length; j++) {
				twoCardsOpened[j].classList.remove('opened');
				setTimeout(() => twoCardsOpened[j].getElementsByTagName('p')[0].style.display = 'none', 1000);
			}
		} else {
			for (let i = 0; i < twoCardsOpened.length; i++) {
				twoCardsOpened[i].classList.add('done');
				twoCardsOpened[i].getElementsByTagName('div')[0].style.backgroundColor = 'green';
				twoCardsOpened[i].classList.remove('opened');
				twoCardsOpened[i].onmouseover = function (){
					twoCardsOpened[i].style.cursor = 'default';
				};
				twoCardsOpened[i].replaceWith(twoCardsOpened[i].cloneNode(true));
			}

			if (counter === amountOfCards - 2) {
				allPairsDone(amountOfCards);
			} else {
				return counter + 2;
			}
		}
		return counter;
	}

	function checkAllDone() {
		const all = document.getElementsByTagName('li');

		for (let i = 0; i < all.length; i++) {
			if (!all[i].classList.contains('done')) {
				return false;
			}
		}
		return true;
	}

	function allPairsDone(amountOfCards) {
		const finishButton = document.createElement('button');
		const containerOfElems = document.getElementsByClassName('game')[0];

		finishButton.innerText = 'Сыграть еще раз';

		containerOfElems.appendChild(finishButton);
		finishButton.addEventListener('click', () => {
			const game = document.getElementsByTagName('div')[0];
			game.remove();
			createCards(Math.sqrt(amountOfCards));
		});
	}


	function turnCard() {
		const listOfCards = document.getElementsByTagName('li');
		const amountOfCards = listOfCards.length;
		let counter = 0;

		for(let i = 0; i < listOfCards.length; i++) {
			const elemOfList = listOfCards[i];
			elemOfList.onmouseover = function () {
				elemOfList.style.cursor = 'pointer';
			};

			elemOfList.onmouseout = function () {
				elemOfList.style.cursor = 'default';
			};

			elemOfList.addEventListener('click', function () {
				elemOfList.getElementsByTagName('p')[0].style.display = 'block';
				elemOfList.classList.add('opened');
				let twoCards = [];
				for (let j = 0; j < listOfCards.length; j++) {
					if(listOfCards[j].classList.contains('opened')) {
						twoCards.push(listOfCards[j]);
						if (twoCards.length === 2) {
							counter = checkTwoCards(twoCards, counter, amountOfCards);
							twoCards = [];
						}
					}
				}
			});
		}
	}

	function removeEventListner() {
		const arrayOfLi = document.getElementsByTagName('li');

		for (let i = 0; i < arrayOfLi.length; i++) {
			arrayOfLi[i].replaceWith(arrayOfLi[i].cloneNode(true));
		}
	}

	function createCards(amount) {
		const gameContainer = document.createElement('div'),
          timerHeader = document.createElement('h1');
		let arrNumberCards = [],
        seconds = 60;

		for (let k = 1; k <= (amount*amount)/2; k++) {
			arrNumberCards.push(k);
		}

		arrNumberCards = [...arrNumberCards, ...arrNumberCards];

		for (let i = arrNumberCards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arrNumberCards[i], arrNumberCards[j]] = [arrNumberCards[j], arrNumberCards[i]];
		}

		lengthOfArr = arrNumberCards.length;

		gameContainer.style.height = '98vh';
		gameContainer.style.display = 'flex';
		gameContainer.style.flexDirection = 'column';
		gameContainer.style.justifyContent = 'space-around';
		gameContainer.classList.add('game');

		document.body.append(gameContainer);
		timerHeader.style.textAlign = 'center';
		timerHeader.textContent = seconds;


		gameContainer.append(timerHeader);

		for (let i = 0; i < amount; i++) {
			const cardsList = document.createElement('ul');
			cardsList.style.paddingLeft = '0';
			cardsList.style.display = 'flex';
			cardsList.style.flexWrap = 'nowrap';
			cardsList.style.justifyContent = 'space-around';


			gameContainer.append(cardsList);

			for (let j = 0; j < amount; j++) {
				const listElem = document.createElement('li');
				const card = document.createElement('div');
				const numberParagraph = document.createElement('p');

				listElem.style.listStyleType = 'none';

				card.style.width = Math.floor(68 / amount) + 'vh';
				card.style.height = Math.floor(68 / amount) + 'vh';
				card.style.backgroundColor = '#87CEEB';
				card.style.borderRadius = '10px';
				card.style.display = 'flex';
				card.style.justifyContent = 'center';
				card.style.alignItems = 'center';


				numberParagraph.style.display = 'none';
				numberParagraph.innerHTML = arrNumberCards[0];
				numberParagraph.style.fontWeight = '600';
				numberParagraph.style.fontSize = '34px';

				arrNumberCards.shift();
				cardsList.append(listElem);
				listElem.append(card);
				card.append(numberParagraph);
			}
		}
		turnCard();

		let timer = setInterval(function () {
			if (seconds === 0) {
				clearInterval(timer);
				allPairsDone(lengthOfArr);
				removeEventListner();
			}
			if (checkAllDone()) {
				clearInterval(timer);
			}
			timerHeader.textContent = seconds;
			seconds--;
		}, 1000);
	}

	document.addEventListener('DOMContentLoaded', function () {
		getAmount();
	});
})();


