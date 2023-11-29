// todo
// -- fix countdown flashing negative numbers if current date is Dec 26th (probally through Dec 31st). The correct countdown will show up, a second later.

const handleCountdown = () => {
	const heading = document.querySelector("h1");
	const daysLeft = document.querySelector(".countdown-days");
	const hoursLeft = document.querySelector(".countdown-hrs");
	const minutesLeft = document.querySelector(".countdown-mins");
	const secondsLeft = document.querySelector(".countdown-secs");

	let currentYear = new Date().getFullYear();
	// const dateOfChristmas = new Date();
	// dateOfChristmas.setMonth(12);
	// dateOfChristmas.setDate(25);
	// dateOfChristmas.setHours(0);
	// dateOfChristmas.setMinutes(0);
	// dateOfChristmas.setSeconds(0);

	// console.log("Christmas", dateOfChristmas)

	const countdownInterval = setInterval(() => {
		const currentFullDate = new Date().getTime();
		const dateOfChristmas = new Date(
			`Dec 25, ${currentYear} 00:00:00`
		).getTime();

		// console.log("current", currentFullDate)
		const timeUntilChristmas = dateOfChristmas - currentFullDate;

		const days = Math.floor(timeUntilChristmas / (1000 * 60 * 60 * 24));
		// console.log("days", days)
		const hours = Math.floor(
			(timeUntilChristmas % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor(
			(timeUntilChristmas % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((timeUntilChristmas % (1000 * 60)) / 1000);

		daysLeft.textContent = `${days}`;
		hoursLeft.textContent = `${hours}`;
		minutesLeft.textContent = `${minutes}`;
		secondsLeft.textContent = `${seconds}`;

		if (timeUntilChristmas < 0 && days === -1) {
			//for some reason on Christmas day "days" = -1, not 0
			heading.textContent = "MERRY CHRISTMAS!";
			daysLeft.textContent = "0";
			hoursLeft.textContent = "0";
			minutesLeft.textContent = "0";
			secondsLeft.textContent = "0";
			console.log("days", days);
			// currentYear++;
			// console.log("year", currentYear);
			clearInterval(countdownInterval);
		} else if (dateOfChristmas < currentFullDate) {
			heading.textContent = "Christmas Advent";
			currentYear++;
			console.log("has the year incremented", currentYear);
			console.log("date of Christmas", dateOfChristmas);
			console.log("current full date", currentFullDate);
		}
	}, 1000);
};

const scaleFlame = (flames) => {
	const itsCold = document.querySelector(".its-cold");
	let fireLit = false;

	flames.forEach((flame) => {
		flame.classList.toggle("scale-flame");
		flame.classList.contains("scale-flame")
			? (fireLit = true)
			: (fireLit = false);
	});

	fireLit
		? (itsCold.textContent = "Ahhh, nice. Now it's warming up.")
		: (itsCold.textContent =
				" By the way it's cold in here, why don't you start the fire? Just give that fireplace a tap or click in the black area. If you want it to be cold for some reason... don't start the fire, it's fine.");
};

const handleFirePlace = () => {
	const fireArea = document.querySelector(".fire-area");
	// const flameWrapper = document.querySelector(".flame-wrapper");
	const fireFlames = document.querySelectorAll(".flame");

	fireArea.removeEventListener("click", () => scaleFlame(fireFlames));
	fireArea.addEventListener("click", () => scaleFlame(fireFlames));
};

handleCountdown();
handleFirePlace();
