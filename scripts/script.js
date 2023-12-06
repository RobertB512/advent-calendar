// todo
// -- fix countdown flashing negative numbers if current date is Dec 26th (probally through Dec 31st). The correct countdown will show up, a second later.

const handleCountdown = () => {
	const heading = document.querySelector("h1");
	const daysLeft = document.querySelector(".countdown-days");
	const hoursLeft = document.querySelector(".countdown-hrs");
	const minutesLeft = document.querySelector(".countdown-mins");
	const secondsLeft = document.querySelector(".countdown-secs");

	let currentYear = new Date().getFullYear();

	const countdownInterval = setInterval(() => {
		const currentFullDate = new Date().getTime();
		const dateOfChristmas = new Date(
			`Dec 25, ${currentYear} 00:00:00`
		).getTime();

		const timeUntilChristmas = dateOfChristmas - currentFullDate;

		const days = Math.floor(timeUntilChristmas / (1000 * 60 * 60 * 24));
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
	const fireFlames = document.querySelectorAll(".flame");

	fireArea.removeEventListener("click", () => scaleFlame(fireFlames));
	fireArea.addEventListener("click", () => scaleFlame(fireFlames));
};

const handleAdventBtnsLighting = () => {
	const adventBtns = document.querySelectorAll(".advent-btn");

	const currentMonth = new Date().getMonth();
	const currentDay = new Date().getDate();

	adventBtns.forEach((btn) => {
		btn.setAttribute("disabled", "disabled");
	});

	adventBtns.forEach((btn) => {
		if (currentMonth === 11 && currentDay >= Number(btn.textContent)) {
			btn.removeAttribute("disabled");
			// 11 refers to December (months are index based)
		}

		if (currentMonth === 11 && currentDay === Number(btn.textContent)) {
			btn.classList.add("btn-current-day");
		} else {
			btn.classList.remove("btn-current-day");
		}
	});
};

const populatePaperWithContent = (contentType, contentToWrite, source) => {
	const paper = document.querySelector(".paper");
	const contentTypeHeading = document.createElement("h3");
	const paperText = document.createElement("p");
	// const linkWrapper = document.createElement("p");
	// const sourceLink = document.createElement("a");

	paper.textContent = "";
	contentTypeHeading.classList.add("content-type");
	paperText.classList.add("main-text");
	// linkWrapper.classList.add("text-source");
	// sourceLink.setAttribute("href", `${source}`);
	// sourceLink.textContent = source;
	contentType === "traditions"
		? (contentTypeHeading.textContent = "Christmas Around the World")
		: null;
	paperText.textContent = contentToWrite;
	paper.append(contentTypeHeading, paperText);

	source.forEach((link) => {
		const linkWrapper = document.createElement("p");
		const sourceLink = document.createElement("a");

		linkWrapper.classList.add("text-source");
		sourceLink.setAttribute("href", `${link}`);
		sourceLink.textContent = link;
		linkWrapper.textContent = "Source: ";
		linkWrapper.append(sourceLink);
		paper.append(linkWrapper);
	});

	// paper.textContent = `${contentToWrite}`;
};

const handleTraditionBtns = () => {
	const adventBtn1 = document.querySelector(".advent-btn-1");
	const adventBtn6 = document.querySelector(".advent-btn-6");
	const adventBtn11 = document.querySelector(".advent-btn-11");
	const adventBtn16 = document.querySelector(".advent-btn-16");
	const adventBtn21 = document.querySelector(".advent-btn-21");

	const tradition1 = {
		tradition:
			"While in the United States, we use decorations like tinsel and stars, Ukraine uses spider webs. That's right, spider webs. The origin comes from a folktale of a poor widow. She didn't have enough money to decorate a tree. The story goes that the spiders in the house had pity for the family. They spun lovely webs all over the tree, which the children were to find on Christmas morning.",
		source: [
			"https://www.holidayextras.com/travel-blog/wanderlust/unusual-christmas-traditions.html",
		],
	};
	const tradition2 = {
		tradition:
			"Iceland has 13 days of Christmas. Over these 13 days, kids are visited by 13 Yule Lads, a different Yule Lad each night. Common names of these elves are: Gimpy, Gully Imp, Itty Bitty, Pot Scraper Licker, Pot Licker, Bowl Licker, Door Slammer, Skyr Gobbler, Sausage Snatcher, Window Peeper, Doorway Sniffer, Meat Hooker, and Candle Beggar. The kids place their shoes by the window and go to bed. In the morning, good kids receive candy, but bad kids find their shoes stuffed with rotten potatoes.",
		source: [
			"https://www.countryliving.com/entertaining/g4933/christmas-traditions-around-the-world/",
			"https://www.whychristmas.com/cultures/iceland",
		],
	};
	const tradition3 = {
		tradition:
			"In Caracas, Venezuela, skating is the way you get to church on Christmas morning, not by driving. If you were to drive, it might take a little while. Here it is such a customary practice to skate to church on Christmas morning that some streets are closed to cars so the skaters can get there safel..",
		source: [
			"https://www.thepioneerwoman.com/holidays-celebrations/g41466285/christmas-traditions-around-world/",
		],
	};
	const tradition4 = {
		tradition:
			"San Fernanda, Philippines holds a Christmas light festival every year, Ligligan Parul (Giant Lantern Festival). This festival features bright lanterns which symbolize the star of Bethlehem. The lanterns contain spinning lights which light up the night sky. San Fernando is the Christmas capital of the Philippines, due to the festival.",
		source: [
			"https://www.countryliving.com/entertaining/g4933/christmas-traditions-around-the-world/",
		],
	};
	const tradition5 = {
		tradition:
			"There’s nothing like simplicity. Ethiopia celebrates Christmas on January 7th. On Christmas, Ethiopians don’t give and receive gifts on Christmas. Kids, however, might get clothes from their family. People still love to eat, play games, and go to church. Simple, isn’t it?",
		source: ["https://www.whychristmas.com/cultures/ethiopia"],
	};

	const traditions = [
		tradition1,
		tradition2,
		tradition3,
		tradition4,
		tradition5,
	];
	// const currentMonth = new Date().getMonth();
	// const currentDay = new Date().getDate();

	// let currentBtn;
	// let contentToWrite;
	const traditionBtns = [
		adventBtn1,
		adventBtn6,
		adventBtn11,
		adventBtn16,
		adventBtn21,
	];

	let traditionIndex = 0;
	traditionBtns.forEach((btn) => {
		listenForTraditionBtn(
			btn,
			"traditions", // this is the content type
			traditions[traditionIndex].tradition,
			traditions[traditionIndex].source
		);
		traditionIndex++;
	});
};

const listenForTraditionBtn = (
	btnName,
	contentType,
	contentToWrite,
	source
) => {
	// btnName.removeEventListener("click", populatePaperWithContent(contentToWrite));
	btnName.addEventListener("click", () =>
		populatePaperWithContent(contentType, contentToWrite, source)
	);
};

handleCountdown();
handleFirePlace();
handleAdventBtnsLighting();
handleTraditionBtns();

// for each button
// handleTraditionBtn1();
// handleTraditionBtn2();
