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

const handleAdventBtnsLighting = (inTesting = false) => {
	const adventBtns = document.querySelectorAll(".advent-btn");

	const currentYear = new Date().getFullYear();

	const currentMonth = !inTesting
		? new Date().getMonth()
		: new Date(`Dec 25, ${currentYear} 01:00:00`).getMonth();
	const currentDay = !inTesting
		? new Date().getDate()
		: new Date(`Dec 25, ${currentYear} 01:00:00`).getDate();
	// const currentDay = new Date(`Dec 25, ${currentYear} 01:00:00`).getDate();

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

	paper.textContent = "";
	contentTypeHeading.classList.add("content-type");
	paperText.classList.add("main-text");

	contentType === "traditions"
		? (contentTypeHeading.textContent = "Christmas Around the World")
		: contentType === "winter fact"
		? (contentTypeHeading.textContent = "Winter Fact")
		: (contentType = "verse"
				? (contentTypeHeading.textContent = "Bible Verse")
				: null);
	paperText.textContent = contentToWrite;
	paper.append(contentTypeHeading, paperText);

	source.forEach((link) => {
		if (link) {
			const linkWrapper = document.createElement("p");
			const sourceLink = document.createElement("a");

			linkWrapper.classList.add("text-source");
			sourceLink.setAttribute("href", `${link}`);
			sourceLink.textContent = link;
			linkWrapper.textContent = "Source: ";
			linkWrapper.append(sourceLink);
			paper.append(linkWrapper);
		}
	});

	// paper.textContent = `${contentToWrite}`;
};

const handlePlainTextBtns = () => {
	const traditionBtn1 = document.querySelector(".advent-btn-3");
	const traditionBtn2 = document.querySelector(".advent-btn-8");
	const traditionBtn3 = document.querySelector(".advent-btn-13");
	const traditionBtn4 = document.querySelector(".advent-btn-18");
	const traditionBtn5 = document.querySelector(".advent-btn-23");
	const winterFactBtn1 = document.querySelector(".advent-btn-4");
	const winterFactBtn2 = document.querySelector(".advent-btn-9");
	const winterFactBtn3 = document.querySelector(".advent-btn-14");
	const winterFactBtn4 = document.querySelector(".advent-btn-19");
	const winterFactBtn5 = document.querySelector(".advent-btn-24");
	const verseBtn1 = document.querySelector(".advent-btn-5");
	const verseBtn2 = document.querySelector(".advent-btn-10");
	const verseBtn3 = document.querySelector(".advent-btn-15");
	const verseBtn4 = document.querySelector(".advent-btn-20");

	const tradition1 = {
		content:
			"While in the United States, we use decorations like tinsel and stars, Ukraine uses spider webs. That's right, spider webs. The origin comes from a folktale of a poor widow. She didn't have enough money to decorate a tree. The story goes that the spiders in the house had pity for the family. They spun lovely webs all over the tree, which the children were to find on Christmas morning.",
		source: [
			"https://www.holidayextras.com/travel-blog/wanderlust/unusual-christmas-traditions.html",
		],
	};
	const tradition2 = {
		content:
			"Iceland has 13 days of Christmas. Over these 13 days, kids are visited by 13 Yule Lads, a different Yule Lad each night. Common names of these elves are: Gimpy, Gully Imp, Itty Bitty, Pot Scraper Licker, Pot Licker, Bowl Licker, Door Slammer, Skyr Gobbler, Sausage Snatcher, Window Peeper, Doorway Sniffer, Meat Hooker, and Candle Beggar. The kids place their shoes by the window and go to bed. In the morning, good kids receive candy, but bad kids find their shoes stuffed with rotten potatoes.",
		source: [
			"https://www.countryliving.com/entertaining/g4933/christmas-traditions-around-the-world/",
			"https://www.whychristmas.com/cultures/iceland",
		],
	};
	const tradition3 = {
		content:
			"In Caracas, Venezuela, skating is the way you get to church on Christmas morning, not by driving. If you were to drive, it might take a little while. Here it is such a customary practice to skate to church on Christmas morning that some streets are closed to cars so the skaters can get there safel..",
		source: [
			"https://www.thepioneerwoman.com/holidays-celebrations/g41466285/christmas-traditions-around-world/",
		],
	};
	const tradition4 = {
		content:
			"San Fernanda, Philippines holds a Christmas light festival every year, Ligligan Parul (Giant Lantern Festival). This festival features bright lanterns which symbolize the star of Bethlehem. The lanterns contain spinning lights which light up the night sky. San Fernando is the Christmas capital of the Philippines, due to the festival.",
		source: [
			"https://www.countryliving.com/entertaining/g4933/christmas-traditions-around-the-world/",
		],
	};
	const tradition5 = {
		content:
			"There’s nothing like simplicity. Ethiopia celebrates Christmas on January 7th. On Christmas, Ethiopians don’t give and receive gifts on Christmas. Kids, however, might get clothes from their family. People still love to eat, play games, and go to church. Simple, isn’t it?",
		source: ["https://www.whychristmas.com/cultures/ethiopia"],
	};

	const winterFact1 = {
		content:
			"First off, let’s deal with a misconception. Earth’s distance from the sun is not what causes seasons. What? Isn’t the Earth furthest from the sun in winter? No, not for the northern hemisphere anyway. The Earth is closest to the sun when it’s winter in the northern hemisphere. What causes the seasons is the tilt of the Earth. When the north pole is titled away from the sun, it’s winter in the northern hemisphere, and summer in the southern hemisphere. When the north pole is titled toward the sun, it’s winter in the southern hemisphere, and summer in the northern hemisphere.",
		source: [
			"https://www.mentalfloss.com/article/89881/15-surprising-facts-about-winter-weather ",
		],
	};
	const winterFact2 = {
		content:
			"The major city that receives the most annual snowfall on Earth may not be what you would think. It’s not somewhere in Russia, but Japan. To be clear, this is the major city that receives the most annual snowfall, not place or city in general. One source I came across said of any city over a 100,000 population. To continue, Aomori, Japan’s annual snowfall on average is about 312 inches, or about 26 feet. This does vary based on where in the city you are. ",
		source: [
			"https://www.mentalfloss.com/article/89881/15-surprising-facts-about-winter-weather",
			"https://www.youtube.com/watch?v=qqerKWp1kqs",
		],
	};
	const winterFact3 = {
		content:
			"According to the Gunness World Records, the largest snowflake ever recorded fell near Missoula, Montana in 1887. Reportedly, this snowflake was 15 inches wide and 8 inches thick. However, there is no photographic proof of this phenomena, and there are skeptics of this claim. In addition, this snowflake would not have been one large crystal, but multiple snowflakes. This snowflake would also not have been a giant, fancy, symmetrical version of what we’re used to. It may have had a more chaotic shape.",
		source: [
			"https://www.npr.org/2023/12/25/1217356234/just-how-big-can-a-snowflake-get-it-depends-on-what-you-mean-by-snowflake#:~:text=If%20you%20consult%20the%20Guinness,diameter%20and%208%20inches%20thick",
			"https://www.worldrecordacademy.org/2023/11/world-largest-snowflake-world-record-at-fort-keogh-montana-423550",
		],
	};
	const winterFact4 = {
		content:
			"The U.S. uses 10 to 20 million tons of salt on its roads each winter. This is enough salt to fill dump trucks bumper to bumper spanning 8,333 miles. This distance is equivalent to Burlington, Vermont to Seattle Washington, back to Burlington, and lastly to Glacier National Park, Montana. Another comparison is that we use 10 times as much salt on our roads as we do in processed foods.",
		source: [
			"https://www.copecompany.com/snow-management-industry-articles/history-of-road-salt/",
			"https://www.uvm.edu/seagrant/outreach/road-salt-water-quality-salt-savvy-champlain#:~:text=W	e%20have%20used%20road%20salt,in%20the%20U.S.%20each%20year ",
		],
	};
	const winterFact5 = {
		content:
			"Thunder and lightning don’t just happen when there’s rain. Though rare, thunder and lightning can occur in winter, during snowfall too, this event is called thundersnow. For thundersnow to happen, columns of warm air must rise from the ground forming turbulent storm clouds. More is still needed though, like that the air closest to the ground must be warmer than the cloud cover above it, then wind must push that warm air upwards. Still, you might not notice thundersnow when it happens, with it being harder to see lightning in winter, and with the snow dampening the sound of the thunder. ",
		source: [
			"https://www.mentalfloss.com/article/89881/15-surprising-facts-about-winter-weather",
		],
	};

	const verse1 = {
		content:
			"Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel. --Isaiah 7:14",
		source: [""],
	};
	const verse2 = {
		content:
			"For unto you is born this day in the city of David a Savior, who is Christ the Lord. --Luke 2:11",
		source: [""],
	};
	const verse3 = {
		content:
			"For to us a child is born, to us a son is given; and the goverment shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace. --Isaiah 9:6",
		source: [""],
	};
	const verse4 = {
		content:
			"But when the kindness and love of God our Savior appeared, he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit, whom he poured out on us genererously through Jesus Christ our Savior. --Titus 3:4-6",
		source: [""],
	};

	const traditions = [
		tradition1,
		tradition2,
		tradition3,
		tradition4,
		tradition5,
	];

	const traditionBtns = [
		traditionBtn1,
		traditionBtn2,
		traditionBtn3,
		traditionBtn4,
		traditionBtn5,
	];

	const winterFacts = [
		winterFact1,
		winterFact2,
		winterFact3,
		winterFact4,
		winterFact5,
	];

	const winterFactBtns = [
		winterFactBtn1,
		winterFactBtn2,
		winterFactBtn3,
		winterFactBtn4,
		winterFactBtn5,
	];

	const verses = [verse1, verse2, verse3, verse4];

	const verseBtns = [verseBtn1, verseBtn2, verseBtn3, verseBtn4];

	passToFunction(traditionBtns, "traditions", traditions);
	passToFunction(winterFactBtns, "winter fact", winterFacts);
	passToFunction(verseBtns, "verse", verses);
};

const passToFunction = (btnSet, contentType, contentSet) => {
	let index = 0;
	btnSet.forEach((btn) => {
		listenForInfoBtns(
			btn,
			contentType,
			contentSet[index].content,
			contentSet[index].source
		);
		index++;
	});
};

const listenForInfoBtns = (btnName, contentType, contentToWrite, source) => {
	// btnName.removeEventListener("click", populatePaperWithContent(contentToWrite));
	btnName.addEventListener("click", () =>
		populatePaperWithContent(contentType, contentToWrite, source)
	);
};

const handleGameBtns = () => {
	const adventBtn2 = document.querySelector(".advent-btn-2");
	const adventBtn7 = document.querySelector(".advent-btn-7");
	const adventBtn12 = document.querySelector(".advent-btn-12");
	const adventBtn17 = document.querySelector(".advent-btn-17");
	const adventBtn22 = document.querySelector(".advent-btn-22");

	const gameText = document.querySelector(".game-text");

	const answerField = document.createElement("input");

	const game1 = {
		content: `Oh, bring us some figgy pudding  <br> Oh, bring us some figgy pudding <br> Oh bring us some figgy pudding <br> <input></input>!`,
		answers: ["And bring it right here"],
	};

	const game2 = {
		content: `Twas the night before Christmas, when all through the house <br>
      Not a creature was stirring, not even a mouse; <br>
      <input></input> <input></input>, <br>
      In hopes that St. Nicholas soon would be there; <br>
      <input></input> <input></input>; <br>
      While <input></input> of sugar-plums danced in their heads; <br>
      And mamma in her 'kerchief, and I in my cap, <br>
      Had just settled down for a long winter's nap,`,
		answers: [
			"The stockings were hung",
			"by the chimney with care",
			"The children were nestled",
			"all snug in their beds",
			"visions",
		],
	};

	const game3 = {
		content: `Oh, Frosty, the Snowman <br> <input></input> <br> And the children say <br> <input></input> <br> Just the same as you and me`,
		answers: ["Was alive as he could be", "He could laugh and play"],
	};

	const game4 = {
		content: `You know <input></input> and <input></input> and <input></input> and <input></input> <br> <input></input> and <input></input> and <input></input> and <input></input> <br> But do you recall <br> The most famous reindeer of all?`,
		answers: [
			"Dasher",
			"Dancer",
			"Prancer",
			"Vixen",
			"Comet",
			"Cupid",
			"Donner",
			"Blitzen",
		],
	};

	const game5 = {
		content: `On the twelfth day of Christmas, <br>
my true love gave to me <br>
Twelve <input></input>, <br>
Eleven <input></input>, <br>
Ten <input></input>, <br>
Nine <input></input>, <br>
Eight <input></input>, <br>
Seven <input></input>, <br>
Six <input></input>, <br>
Five <input></input>, <br>
Four <input></input>, <br>
Three <input></input>, <br>
Two <input></input>, <br>
And <input></input>!`,
		answers: [
			"drummers drumming",
			"pipers piping",
			"lords a-leaping",
			"ladies dancing",
			"maids a-milking",
			"swans a-swimming",
			"geese a-laying",
			"golden rings",
			"calling birds",
			"French hens",
			"turtle doves",
			"a partridge in a pear tree",
		],
	};

	const allGames = [game1, game2, game3, game4, game5];

	const gameBtns = [
		adventBtn2,
		adventBtn7,
		adventBtn12,
		adventBtn17,
		adventBtn22,
	];
	// const games = [game1];

	let gameIndex = 0;
	gameBtns.forEach((btn) => {
		listenForGameBtns(
			btn,
			"game", // this is the content type
			allGames[gameIndex]
		);
		gameIndex++;
	});
};

const listenForGameBtns = (gameBtn, contentType, contentToWrite) => {
	gameBtn.addEventListener("click", () => {
		populatePaperWithGame(
			"game", // this is the content type
			contentToWrite.content
		);

		handleGameAnswers(contentToWrite.content, contentToWrite.answers);
	});
};

const listenForTypedAnswer = (answerField, answer) => {
	const userAnswer = answerField.value;
	const correctAnswer = answer;

	// console.log("user answer === answer", userAnswer.toLowerCase() === correctAnswer.toLowerCase())
	// console.log("user answer and answer types", typeof(userAnswer), typeof(correctAnswer))

	// console.log("answer", correctAnswer);
	// console.log("user answer", userAnswer);

	// const inputWidth = answerField.style.length
	// console.log(inputWidth);

	answerField.style.width = correctAnswer.length + 1 + "ch";

	if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
		answerField.value = correctAnswer;
		answerField.setAttribute("disabled", true);
		answerField.classList.add("correct-answer");
	} else {
		console.log("answer should be: ", correctAnswer);
	}
	// userAnswer.toLowerCase() === correctAnswer.toLowerCase()
	// 	? console.log("answer status: correct")
	// 	: console.log("answer status: incorect");
	// console.log("answer should be: ", correctAnswer);

	// console.log("answer field", answerField);
	// console.log("you typed: ", userAnswer);
	// console.log("");
};

const handleGameAnswers = (gameContent, gameAnswers) => {
	const gameText = document.querySelector(".game-text").textContent;
	const answerFields = document.querySelectorAll("input");

	answerFields.forEach((field, index) => {
		field.addEventListener("input", () => {
			listenForTypedAnswer(field, gameAnswers[index]);
		});

		// console.log("all answers", gameAnswers);
		// console.log("an answer", gameAnswers[index]);
		// console.log("answer index", index);
	});

	// console.log(gameText, gameContent, gameAnswers);
};

const populatePaperWithGame = (contentType, contentToWrite) => {
	const paper = document.querySelector(".paper");
	const contentTypeHeading = document.createElement("h3");
	const note = document.createElement("p");
	const gameText = document.createElement("p");
	const answerForm = document.createElement("form");

	paper.textContent = "";
	contentType === "game"
		? (contentTypeHeading.textContent = "Fill In The Blank")
		: null;
	contentTypeHeading.classList.add("content-type");
	note.textContent =
		"NOTE: The text field will disapear when you have guessed correctly.";
	gameText.innerHTML = contentToWrite;
	note.classList.add("game-note");
	gameText.classList.add("game-text");
	answerForm.append(gameText);
	paper.append(contentTypeHeading, note, answerForm);
};

const handleDecorating = () => {
	const decorBtn1 = document.querySelector(".advent-btn-1");
	const decorBtn2 = document.querySelector(".advent-btn-6");
	const decorBtn3 = document.querySelector(".advent-btn-11");
	const decorBtn4 = document.querySelector(".advent-btn-16");
	const decorBtn5 = document.querySelector(".advent-btn-21");

	const reefArea = document.querySelector(".reef-img");
	const stockingsArea = document.querySelector(".stockings-img");
	const bellArea = document.querySelector(".bell-img");
	const houseArea = document.querySelector(".house-img");
	const treeArea = document.querySelector(".tree-img");

	const reefImgSet = [
		"./images/reef1.png",
		"./images/reef2.png",
		"./images/reef3.png",
	];

	const bellImgSet = [
		"./images/ChristmasBells1.png",
		"./images/ChristmasBells2.png",
		"./images/ChristmasBells3.png",
	];

	const stockingsImgSet = [
		"./images/stockings1.png",
		"./images/stockings2.png",
		"./images/stockings3.png",
	];

	const houseImgSet = [
		"./images/ChristmasHouse1.png",
		"./images/ChristmasHouse2.png",
		"./images/ChristmasHouse3.png",
	];

	const treeImgSet = [
		"./images/ChristmasTree1.png",
		"./images/ChristmasTree2.png",
		"./images/ChristmasTree3.png",
	];

	decorBtn1.addEventListener("click", () =>
		populatePaperWithDecorOptions(
			"Choose First Decoration",
			reefImgSet,
			reefArea,
			"Choose a reef to goo under the countdown."
		)
	);

	decorBtn2.addEventListener("click", () =>
		populatePaperWithDecorOptions(
			"Choose Second Decoration",
			bellImgSet,
			bellArea,
			"Choose a bell to go under this content section."
		)
	);

	decorBtn3.addEventListener("click", () =>
		populatePaperWithDecorOptions(
			"Choose Third Decoration",
			stockingsImgSet,
			stockingsArea,
			"Choose the stockings that will go on the fireplace."
		)
	);

	decorBtn4.addEventListener("click", () =>
		populatePaperWithDecorOptions(
			"Choose Fourth Decoration",
			houseImgSet,
			houseArea,
			"Choose a house that will go on the snow below."
		)
	);

	decorBtn5.addEventListener("click", () =>
		populatePaperWithDecorOptions(
			"Choose Fifth Decoration",
			treeImgSet,
			treeArea,
			"Choose a tree that will go on the snow below."
		)
	);
};

const populatePaperWithDecorOptions = (
	heading,
	decorSet,
	placeToDecorate,
	decorationNote
) => {
	const paper = document.querySelector(".paper");

	const contentHeading = document.createElement("h3");
	const decorOptionsWrapper = document.createElement("article");
	const note = document.createElement("p");

	note.classList.add("decoration-note");
	decorOptionsWrapper.classList.add("decor-options-wrapper");

	contentHeading.textContent = heading;
	paper.textContent = "";

	note.textContent = decorationNote;

	decorSet.forEach((decor) => {
		const decorOptionBtn = document.createElement("button");
		const decorOptionImg = document.createElement("img");
		decorOptionBtn.classList.add("decor-option-btn");
		decorOptionImg.classList.add("decor-option-img");

		decorOptionImg.setAttribute("src", decor);
		decorOptionBtn.append(decorOptionImg);

		decorOptionsWrapper.append(decorOptionBtn);

		decorOptionBtn.addEventListener("click", () => {
			placeToDecorate.setAttribute("src", decor);
		});
	});
	paper.append(contentHeading, note, decorOptionsWrapper);
};

const handleChristmasMessage = () => {
	const messageBtn = document.querySelector(".advent-btn-25");

	messageBtn.addEventListener("click", () => populatePaperWithMessage());
};

const populatePaperWithMessage = () => {
	const paper = document.querySelector(".paper");
	const heading = document.createElement("h3");
	const resourceList = document.createElement("ul");
	const closing = document.createElement("p");

	const message = [
		"Merry Christmas everyone! I just want to take this time to tell you something important. Some of what I’m about to tell you, you may know, some you may not, but it’s all important. The overall message being the meaning of Christmas.",
		"First, let me say that what I’m about to tell you, I’m guilty of not being good at doing. I’m not perfect at what I’m going to say and have a long way to go.",
		"Christmas is not about the presents, tree, the angel or star on top of the tree, the lights, music, food, or other Christmasy type things. Family, friends, and giving are, or should, be more important, but there’s an even deeper meaning to Christmas.",
		"You may have heard of the Christmas story, the story about Mary, Joesph, some shepherds, wise men, and of course Jesus. This story is not a fable, or folklore made up by someone a long time ago and passed down generation after generation. This story is true, and Jesus is real too, and he didn’t remain a baby.",
		"In fact, Jesus didn’t begin to exist that day. He’s always been, and always will be. This is where the meaning for Christmas comes in. Jesus humbled himself and came down as a child to be among us, live a perfect, sinless life that we could never live, and die for our sins.",
		"You see, according to the Bible, we’ve all sinned. We’ve all done wrong. The Bible says that all have sinned and fallen short of the glory of God. What is sin? Sin is the breaking of God’s law. Sin is not just for Hitler, Stalin, serial killers, and other people that did what we would call heinous crimes. Yes, murder is sin, as well as theft, torture, abusing men, women, and children, and sins too.",
		"You may think you haven’t committed any sin or wrongdoing that any of those people committed, but let me ask you this, have you ever stolen anything, even if it’s small? Have you ever used the Lord’s name in vain? Have you ever slept around before marriage? Have you ever hated someone? According to God, all this is still sin. Jesus says that if you hate someone, you’re guilty of murder. He also says that if you simply look at someone with lustful intent, you’re guilty of adultery. We’ve all done these things, and more that’s not listed. Based on what Jesus says, we deserve death and hell.",
		"Hell is what we all deserve. The Bible says that the wage of sin is death. Some say hell is where we’re eternally separated from God. Others say it’s where God’s wrath is endlessly poured out on those in there. It’s a place of total misery, loneliness, and despair. I don’t mean like a bad day, or someone that’s depressed, but far worse. Trust me, you are not going to be partying in hell. Once you’re there, there’s no going back.",
		"The good news though is that Jesus came to save us, so we wouldn’t have to go to hell, and so we can spend eternity with him. Jesus came down to Earth, fully man, but still fully God to live the sinless life that we could never live, was tempted as we are, but never gave in. He felt pain and sadness, and ultimately was betrayed and died on a cross for our sins.",
		"That’s not the end of the story, because three days later, he rose from the dead and appeared to his disciples and many others. Later he ascended into heaven to be seated at the right hand of the Father.",
		"It’s not enough to know this though, not in the slightest. If you want to be with Jesus in Heaven, you must acknowledge that he is God and that there is no other, and that you have sinned, that you need a savior, that is, Jesus. Once you have acknowledged your sinfulness and that Jesus is God, ask him into your heart. It’s that simple. Know though that it’s not your works that save you, but what Jesus did.",
		"If your stuck on how to ask Jesus into your heart here’s a sample prayer, but please know the prayer is not what saves you. What saves you is accepting Jesus, acknowledging him as God, and that you’re a sinner in need of him. Any prayer will do, but here’s a simple one: Jesus, forgive me. I know that I have sinned against you and need you. I accept you as God and savior. I ask you into my life and I choose to live for you.",
		"You’re free to talk to God more for as long as you want, casting all your fears, burdens, anxieties, and questions on him. He’s there, you can have a personal relationship with him.",
		"Now, this life is not going to be easy, you’ll be tempted to fall back into old lifestyles, and your friends and family might tease or be angry with you. God can give you strength though, ask him.",
		"It’s also important to start reading the Bible and to get into a local church community to grow your faith. As for the Bible, try starting in the book of John. Read it through, then try starting in the book of Matthew and read through the book of Revelation. Take your time though, there’s no rush. Eventually though, you should start reading in the Old Testament, there’s lots of precious information there as well, and Jesus is still there too. As for a church, if you have any Christian friends or family try asking them where you should go. I can’t help you, since I have no idea where you live.",
		"If you have any questions, again try asking Christian friends and family. Here’s a list of resources, including some for finding answers to questions.",
	];

	const resourceLinks = [
		{
			link: "https://www.youversion.com/the-bible-app/",
			linkText: "Get a free Bible app",
		},
		{
			link: "https://www.gotquestions.org/",
			linkText: "Find answers to Bible questions",
		},
		{
			link: "https://www.youtube.com/@MikeWinger",
			linkText: "Mike Winger on YouTube",
		},
		{
			link: "https://www.youtube.com/@CrossExamined ",
			linkText: "Frank Turek on YouTube",
		},
		{
			link: "https://www.youtube.com/@alisachilders",
			linkText: "Alisa Childers",
		},
		{
			link: "https://www.youtube.com/@MelissaDougherty",
			linkText: "Melissa Dougherty on YouTube",
		},
	];

	paper.textContent = "";
	heading.textContent = "Christmas Message";
	paper.append(heading);

	message.forEach((paragraph) => {
		const paraEle = document.createElement("p");

		paraEle.append(paragraph);
		paper.append(paraEle);
	});
	resourceLinks.forEach((link) => {
		const resource = document.createElement("li");
		const linkTag = document.createElement("a");

		linkTag.setAttribute("href", link.link);
		linkTag.textContent = link.linkText;

		resource.append(linkTag);
		resourceList.append(resource);
	});
	paper.append(resourceList);

	closing.textContent = "Merry Christmas and happy new year!";
	paper.append(closing);
};

const handleTestMode = () => {
	const whereToStartTest = document.querySelector(".in-testing");
	const banner = document.querySelector(".banner");

	let clicks = 0;
	whereToStartTest.addEventListener("click", () => {
		clicks++;
		console.log(`clicks: ${clicks}`);
		// clicks >= 5 ? preformTestModeAction("on") : null;
		if (clicks >= 10) {
			preformTestModeAction("off");
			banner.classList.remove("toggle-banner");
			clicks = 0;
		} else if (clicks >= 5) {
			preformTestModeAction("on");
			banner.classList.add("toggle-banner");
		}
	});
};

const preformTestModeAction = (inTesting) => {
	const testingActive = inTesting === "on" ? true : false;
	handleAdventBtnsLighting(testingActive);
	inTesting === "on"
		? console.log("should be in testing")
		: console.log("should be out of testing");
};

handleCountdown();
handleFirePlace();
handleAdventBtnsLighting();
handlePlainTextBtns();
handleGameBtns();
handleDecorating();
handleChristmasMessage();
handleTestMode();
