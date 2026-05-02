// Pet info object with name, weight, happiness, and energy.
var pet_info = { name: "Koa", weight: 70, happiness: 7, energy: 7 };

// global variables
let pet_message = $('.pet-message');
let treatBtn = $('.treat-button');
let playBtn = $('.play-button');
let exerciseBtn = $('.exercise-button');
let napBtn = $('.nap-button');
let jokeBtn = $('.joke-button');

console.info("PET-INFO: DevTools homework started");

// Makes sure the page elements are loaded before the functions run.
$(function () { 
	// When each button is clicked, it will "call" function for that button (functions are below)
	treatBtn.click(clickedTreatButton);
	playBtn.click(clickedPlayButton);
	exerciseBtn.click(clickedExerciseButton);
	napBtn.click(clickedNapButton);
	jokeBtn.click(clickedJokeButton);
	// creating the boxes for status bars
	setBoxes();
	// Called function to update the name, happiness, and weight of our pet in our HTML
	checkAndUpdatePetInfoInHtml();

	$('.log-info-button').click(logInfoExample);
	$('.log-warning-button').click(logWarningExample);
	$('.log-error-button').click(logErrorExample);
	$('.log-table-button').click(logTableExample);
	$('.log-group-button').click(logGroupExample);
	$('.log-custom-button').click(logCustomExample);
	$('.cause-404-button').click(cause404Error);
	$('.cause-type-error-button').click(causeTypeError);
	$('.cause-violation-button').click(causeViolation);
	$('.filter-demo-button').click(logFilterExamples);
	$('.buggy-add-button').click(runBuggyAddition);
	$('.fixed-add-button').click(runFixedAddition);
})
// Updates HTML with the current values in pet_info object
function updatePetInfoInHtml() {
	$('.name').text(pet_info['name']);
	$('.weight').text(pet_info['weight']);
	$('.happiness').text(pet_info['happiness']);
	$('.energy').text(pet_info.energy);

	// updates to status
	updateHappinessBar();
	updateEnergyBar();
}
function checkAndUpdatePetInfoInHtml() {
	checkWeightAndHappinessBeforeUpdating();
	checkEnergyLevel();
	updatePetInfoInHtml();
	// debug
	console.log("PET-INFO: Current pet state", pet_info);
}
function checkWeightAndHappinessBeforeUpdating() {
	// Add conditional so if weight and happiness is lower than zero.
	if(pet_info.happiness <= 0){
		pet_info.happiness = 0;
	}
	if(pet_info.weight <= 0){
		pet_info.weight = 0;
	}
	// adding conditional to not exceed 10
	if(pet_info.happiness >= 10){
		pet_info.happiness = 10;
	}
}
function checkEnergyLevel(){
	// check energy level, cannot go over 10, cannot be less than 0
	if(pet_info.energy >= 10){
		pet_info.energy = 10;
	}
	if(pet_info.energy <= 0){
		pet_info.energy = 0;
	}
	if(pet_info.energy == 0){
		pet_message.text("I'm too tired...");
		disableButtons(true);
	}
}

// Button functions ==============================
function clickedTreatButton() {
	// Increase pet happiness
	pet_info.happiness += 1;

	// Increase pet weight
	pet_info.weight += 1;

	// update pet message
	pet_message.text("Yummy!");
	console.info("PET-INFO: Treat button clicked", {
		happiness: pet_info.happiness,
		weight: pet_info.weight
	});
	
	checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
	// Increase pet happiness
	pet_info.happiness += 1;

	// Decrease pet weight
	pet_info.weight -= 1;

	// lower energy level
	pet_info.energy -= 1;

	// update pet message
	pet_message.text("Woof! Let's play!");
	console.log("PET-INFO: Play button clicked", {
		happiness: pet_info.happiness,
		weight: pet_info.weight,
		energy: pet_info.energy
	});

	checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
	// Decrease pet happiness
	pet_info.happiness -= 1;
	// Decrease pet weight
	pet_info.weight -= 1;
	// lower energy level
	pet_info.energy -= 1;

	// update pet message
	pet_message.text("Pant... Pant...");
	console.warn("PET-WARN: Exercise lowered happiness and energy", {
		happiness: pet_info.happiness,
		energy: pet_info.energy
	});

	checkAndUpdatePetInfoInHtml();
}

function clickedNapButton(){
	// disable other buttons for 3sec
	const nap_duration = 3000; 
	disableButtons(true);
	
	// update pet message
	pet_message.text("Zzz...");
	console.info("PET-INFO: Nap started. Buttons are disabled during rest.");

	setTimeout( function() {
		// increase happiness
		pet_info.happiness += 1;
		// increase energy 
		pet_info.energy += 3;

		disableButtons(false);
		// update pet message
		pet_message.text("I feel refreshed!");
		console.info("PET-INFO: Nap finished. Energy restored.", pet_info);

		checkAndUpdatePetInfoInHtml();
	}, nap_duration);
}
function clickedJokeButton(){
	fetch("https://official-joke-api.appspot.com/random_joke")
		.then(response => response.json())
		.then(data => {
			pet_message.text(data.setup + " ... " + data.punchline);
			console.log("SOURCE-DEMO: Joke API response", data);
		}
	).catch( () => {
		pet_message.text("No jokes right now :(");
		console.error("PET-ERROR: Joke API request failed");
	});
}

// helper functions ================================
// function to disable buttons when nap is clicked, or energy is 0
function disableButtons(disable){
	const actionButtons = $('.treat-button, .play-button, .exercise-button, .joke-button');
	actionButtons.prop('disabled', disable);
	actionButtons.css("background-color", disable ? "gray" : "");
}

// initialize the boxes for the status bars
function setBoxes(){
	for(let i=0; i < 10; i++){
		let $box = $("<div class='box'></div>");
		$("#happiness-bar-cont").append($box);
		$("#energy-bar-cont").append($box.clone());
	}
}

function updateHappinessBar(){
	// 4 is red, above four is green
	$("#happiness-bar-cont .box").each(function(index){
		$(this).removeClass("box-fill-green box-fill-red");

		if(index < pet_info.happiness && pet_info.happiness <= 4){
			$(this).addClass("box-fill-red");
		} 
		else if(index < pet_info.happiness && pet_info.happiness > 4){
			$(this).addClass("box-fill-green");
		}
	});
}

function updateEnergyBar(){
	// four is red, above four is green
	$("#energy-bar-cont .box").each(function(index){
		$(this).removeClass("box-fill-green box-fill-red");

		if(index < pet_info.energy && pet_info.energy <= 4){
			$(this).addClass("box-fill-red");
		} 
		else if(index < pet_info.energy && pet_info.energy > 4){
			$(this).addClass("box-fill-green");
		}
	});
}

// DevTools console examples for homework ======================
function logInfoExample() {
	console.log("PET-INFO: Koa is ready.");
	console.info("PET-INFO: Info-level message: happiness is", pet_info.happiness);
}

function logWarningExample() {
	console.warn("PET-WARN: Koa's energy is getting checked.");
	console.trace("PET-WARN: Trace for warning example");
}

function logErrorExample() {
	console.error("PET-ERROR: Example error message for the console.");
}

function logTableExample() {
	const careLog = [
		{ action: "Treat", happinessChange: "+1", energyChange: "0", weightChange: "+1" },
		{ action: "Play", happinessChange: "+1", energyChange: "-1", weightChange: "-1" },
		{ action: "Exercise", happinessChange: "-1", energyChange: "-1", weightChange: "-1" },
		{ action: "Nap", happinessChange: "+1", energyChange: "+3", weightChange: "0" }
	];

	console.table(careLog);
}

function logGroupExample() {
	console.group("PET-INFO: Koa checklist");
	console.log("PET-INFO: Food checked");
	console.log("PET-INFO: Played outside");
	console.log("PET-INFO: Nap time later");
	console.log("PET-INFO: Need screenshots");
	console.groupEnd();
}

function logCustomExample() {
	console.log(
		"%cFILTER-DEMO: Custom styled console message.",
		"background: #dbeafe; border: 2px solid #2563eb; color: #7f1d1d; padding: 4px; font-weight: bold;"
	);
}

function cause404Error() {
	console.info("SOURCE-DEMO: I am requesting a file that does not exist so Chrome shows a 404.");
	fetch("assets/missing-devtools-demo-file.json");
}

function causeTypeError() {
	console.info("SOURCE-DEMO: This button causes a TypeError on purpose.");
	const missingPetStatusElement = null;
	missingPetStatusElement.textContent = "This line intentionally causes a TypeError.";
}

function causeViolation() {
	console.info("SOURCE-DEMO: This click handler is slow on purpose.");
	const startTime = performance.now();

	while (performance.now() - startTime < 2500) {
		// Slow loop for the violation message.
	}

	console.info("SOURCE-DEMO: Slow handler finished.");
}

function logFilterExamples() {
	console.log("PET-INFO: Text filter example with PET-INFO tag.");
	// Regex-friendly examples (can filter with /id:KOA-\d{4}/)
	console.info("PET-INFO: Regex filter example. id:KOA-1234");
	console.log("PET-INFO: user:owner id:KOA-1234 action:feed");
	console.log("PET-INFO: user:owner id:KOA-5678 action:play");

	// Level examples
	console.warn("PET-WARN: Warning filter example.");
	console.error("PET-ERROR: Error filter example.");
	console.debug("PET-SOURCE: Source filter example from script.js.");

	// User / owner messages (filter by tag PET-USER)
	console.log("PET-USER: Owner message - Time to feed Koa.");
	console.log("PET-USER: Owner message - Koa needs a walk.");

	// Grouped logs to demonstrate grouping filters
	console.groupCollapsed("PET-GROUP: Feeding session for Koa");
	console.log("PET-INFO: Feeding started for Koa (id:KOA-1234)");
	console.log("PET-INFO: Feeding completed for Koa (id:KOA-1234)");
	console.groupEnd();

	// Intentionally false so the assertion message always appears during demos
	console.assert(false, "PET-ASSERT: Demo assertion message (weight=" + pet_info.weight + ")");
	console.trace("PET-TRACE: Trace example showing call stack");
}

// Sources tab debugging example ==================================
function getDebugNumberOne() {
	return $('#number-one').val();
}

function getDebugNumberTwo() {
	return $('#number-two').val();
}

function runBuggyAddition() {
	const addend1 = getDebugNumberOne();
	const addend2 = getDebugNumberTwo();
	const sum = addend1 + addend2;
	const message = addend1 + " + " + addend2 + " = " + sum;

	$('.debug-result').text(message + " (bug reproduced)");
	console.log("SOURCE-DEMO: Buggy addition result", {
		addend1: addend1,
		addend2: addend2,
		sum: sum,
		sumType: typeof sum
	});
}

function runFixedAddition() {
	const addend1 = Number(getDebugNumberOne());
	const addend2 = Number(getDebugNumberTwo());
	const sum = addend1 + addend2;
	const message = addend1 + " + " + addend2 + " = " + sum;

	$('.debug-result').text(message + " (fixed)");
	console.log("SOURCE-DEMO: Fixed addition result", {
		addend1: addend1,
		addend2: addend2,
		sum: sum,
		sumType: typeof sum
	});
}
