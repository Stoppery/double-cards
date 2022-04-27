/*jshint esversion: 6 */
(() => {
	document.addEventListener('DOMContentLoaded', function(){
		const field = document.querySelector('.field');

		let row = 4, col = 4,
			maxBlocks = row * col,
			countDone,
			interval;

		const btns = [];

		const timerText = document.createElement('div');
		timerText.classList.add('timer');

		const rules = document.createElement('div');
		rules.classList.add('rules');
		rules.textContent = 'Число создаваемых полей должно быть четным. Так же, вводимые числа должны быть в диапазоне 2-10, иначе игра запустится со значениями 4 * 4';

		const setCol = document.createElement('input');
		setCol.classList.add('input', 'col');
		setCol.setAttribute('placeholder', 'Количество столбцов');

		const setRow = document.createElement('input');
		setRow.classList.add('input', 'row');
		setRow.setAttribute('placeholder', 'Количество строк');

		const setBtn = document.createElement('button');
		setBtn.classList.add('init');
		setBtn.textContent = 'Создать';

		const start = () => {
			field.innerHTML = '';
			field.append(rules);
			field.append(setCol);
			field.append(setRow);
			field.append(setBtn);
		};

		const createField = () => {
			start();
			setBtn.addEventListener('click', function(){
				if ((Number(setCol.value) >= 2 && Number(setCol.value) <= 10) && (Number(setRow.value) >= 2 && Number(setRow.value) <= 10) ) {
					maxBlocks = Number(setCol.value) * Number(setRow.value);
					if (maxBlocks % 2) {
						row = 4;
						col = 4;
						maxBlocks = row * col;
					} else {
						row = Number(setRow.value);
						col = Number(setCol.value);
					}
				}
				fieldInit();
			});
		};

		const randomArray = () => {
			let arrayNumber = [];

			for (let i = 1; i <= (maxBlocks)/2; i++) {
				arrayNumber.push(i);
			}

			arrayNumber = [...arrayNumber, ...arrayNumber];

			for (let i = maxBlocks - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[arrayNumber[i], arrayNumber[j]] = [arrayNumber[j], arrayNumber[i]];
			}
			return arrayNumber;
		};

		const turnCard = () => {
			const cardsBack = document.getElementsByClassName('card');
			let pairArr = [];

			countDone = 0;

			for (let i = 0; i < maxBlocks; i++) {
				cardsBack[i].children[0].addEventListener('click', function() {
					cardsBack[i].children[1].style.display = 'flex';
					cardsBack[i].children[0].style.display = 'none';
					if (pairArr.length < 2) {
						pairArr.push(cardsBack[i]);
					}
					if (pairArr.length === 2) {
						if (pairArr[0].children[1].textContent !== pairArr[1].children[1].textContent) {
							pairArr.forEach(element => {
								setTimeout(() => {
									element.children[0].style.display = 'block';
									element.children[1].style.display = 'none';
								}, 500);
							});
						} else {
							pairArr.forEach(element => {
								countDone += 1;
								element.children[1].style.backgroundColor ='green';
								if (countDone === maxBlocks) {
									finishGame();
								}
							});
						}
						pairArr = [];
					}
				});
			}
		};

		const removeClick = () => {
			const cards = document.getElementsByClassName('btn');

			for (let i = 0; i < cards.length; i++) {
				cards[i].disabled = true;
			}
		};

		const fieldInit = () => {
			let arrayOfNumbers = randomArray();
			field.innerHTML = '';
			interval = 60;

			timerText.textContent = `У вас осталось ${interval} секунд`;

			let timer = setInterval(function () {
				interval--;
				if (interval === 0) {
					clearInterval(timer);
					removeClick();
					finishGame();
				}
				if (countDone === maxBlocks) {
					clearInterval(timer);
				}
				timerText.textContent = `У вас осталось ${interval} секунд`;
			}, 1000);

			field.before(timerText);
			field.style.flexDirection = 'row';

			for (let i = 0; i < row; i++) {
				btns[i] = [];
				for (let j = 0; j < col; j++) {
					const block = document.createElement('div');
					block.classList.add('card');
					block.style.width = 100 / col + '%';
					block.style.height = 100 / row + '%';

					btns[i][j] = document.createElement('button');
					btns[i][j].classList.add('btn');


					const backsideBlock = document.createElement('div');
					backsideBlock.classList.add('backside');
					backsideBlock.innerHTML = `<span class='number'>${arrayOfNumbers.shift()}</span>`;
					backsideBlock.style.display = 'none';

					block.append(btns[i][j]);
					block.append(backsideBlock);
					field.append(block);
				}
			}
			turnCard();
		};

		const finishGame = () => {
			const finishButton = document.createElement('button');
			finishButton.classList.add('finish');
			finishButton.innerText = 'Сыграть ещё раз';

			document.querySelector('body').append(finishButton);

			finishButton.addEventListener('click', () => {
				fieldInit();
				document.querySelector('body').removeChild(finishButton);
			});
		};

		createField();

	});

})();
