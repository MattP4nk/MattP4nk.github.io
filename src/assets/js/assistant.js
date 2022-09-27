var sign = "Click Me!";
var commands = {};
var argCommands = {};
var commandList = [];
var io = {};
var visible = false;
var user = "Guest"
var awake = false;
var answering = false;
var current_task = "";
let gen;
var yesNo = false;

//classes here.


class Queue {
    constructor() {
        this.items = [];
    }
    // add element to the queue
    add(element) {
        return this.items.push(element);
    }
    
    // run next element from the queue
    next() {
        if(this.items.length > 0) {
            return this.items.shift();
        }
    }

    // check if the queue is empty
    isEmpty(){
       return this.items.length == 0;
    }
    // empty the queue
    clear(){
        this.items = [];
    }
}

// different queues will be here.

var printQueue = new Queue()

//functions here.


function helper(){
    io.input = document.getElementById("input");
    io.output = document.getElementById("output");
	io.aside = document.getElementById("aside")
    //io.sign = document.getElementById("sign");
    //setSign();
	document.getElementById("button").addEventListener("click", displayMessages);
}

function displayMessages(){
	
    if (visible == false){
        io.input.style.visibility = 'visible';
        io.output.style.visibility = 'visible';
		io.aside.style.visibility = 'visible';
        visible = true;
		if (awake == false){
			awake = true;
			sign = "Muse";
			//setSign();
		}
    }else{
		io.input.style.visibility = 'hidden';
        io.output.style.visibility = 'hidden';
		io.aside.style.visibility = 'hidden';
        visible = false;
    }
}

function communication(head, message){
	let currentTask = window[current_task]; // let's transform the string in current task into a function call.
	if (yesNo){ //yesNo control for other functions.
		message = message.toLowerCase();
		if ((message != "yes") && (message != "no")){
			prints("Sorry, \"" + message + "\" is a wrong answer!\nPlease just answer with: Yes//No.");
			return;
		}else{ yesNo = !yesNo;}
	}
	switch(head){
		//handling assistant responses and solits
		case "muse_task": answering = true; current_task = message; initialMessage(); break;
		case "muse_response": prints(message); break;
		case "muse_exit": answering = false; gen = undefined; current_task = undefined; break;
		//handling user responses --> just send the message to the current task. 
		case "user_response": currentTask(message); break;
	}
}
function initialMessage(){
	switch(current_task){
		case "edit":
			communication("muse_response", "Starting Edit Mode. Press ENTER to continue.");
	}
}
function handle(aEvent){
    if (aEvent.keyCode === 13) {
		aEvent.preventDefault();
		if (io.input.value == ""){
			print(user + ": *ENTER* ", false);
		}else{
			print(user + ": " + io.input.value, false);
		}
		let input = io.input.value
		io.input.value = "";
		if (answering == true){
			console.log(input);
			communication("user_response", input);
		}else{
			input = input.toLowerCase();
			if (input !== "") {
				if (input in commands) {
					commands[input]();
				} else {
					let spaceIndex = input.indexOf(" ");
					let command = input;
					if (spaceIndex > 0) {
						command = input.substring(0, spaceIndex);
					}
					if (command in argCommands) {
						argCommands[command](input);
					} else {
						print("Command not found! \n Type 'help' for a list of commands");
					}
				}
			}	
		}
	}
}

function focusInput() {
	io.input.focus();
}
function blurInput(){
    io.input.blur();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function prints(aString){
    printQueue.add(aString);
    do{
		rawText = printQueue.next();
		console.log(rawText);
		print(rawText)
		await sleep(rawText.length * 40 );
    }while(printQueue.isEmpty() == false);
}
async function print(aString, typeWriting = true) {
    var output = document.createElement("p");
    output.style = `
    background: #000000;
    color: rgb(50, 132, 107);
	width: 95%;
	margin: 10px;
    border-style: solid;
    border-radius: 1rem;
    padding: 5px;
	margin-bottom: 10px;
    `
	if (typeWriting == false){
		output.style = `
		background: #000000;
		color: 	darkseagreen;
		width: 95%;
		margin: 10px;
		border-style: solid;
		border-radius: 1rem;
		padding: 10px;`
	}
	let splitedText = aString.split("\n");
    let typing = ('▓');
	console.log(splitedText);
	for (var text of splitedText){
		if (text.length >= 0){
			var content = document.createTextNode("");
			output.appendChild(content);
			var newline = document.createElement("br");
			if (typeWriting){
				typeWriter(0);
			}else{
				content.nodeValue = (text);
			}
			output.appendChild(newline);
			io.output.appendChild(output);
			await sleep(text.length * 40 );
		}
	}
    
    function typeWriter(i) {
        content.nodeValue = ( text.substring(0, i)+ typing);
        if (text.length >= i) {
        setTimeout(function() {typeWriter(i+1);}, 30);
        }else{
        content.nodeValue = (text);
        }
		scrollToBottom();
    }
}
function scrollToBottom() {
    io.output.scrollTop = io.output.scrollHeight;
  }

// function setSign() {	
// 	io.sign.innerHTML = sign;
// 	io.input.style.width = (document.body.offsetWidth - io.sign.offsetWidth * 1.2) + "px";
// }

function assistCommand(aName, aDescription, aFunction) {
	commands[aName] = aFunction;
	if (aDescription) {
		commandList.push(aName + " - " + aDescription);
	}
}
function assistArgCommand(aName, aDescription, aFunction) {
	argCommands[aName] = aFunction;
	if (aDescription) {
		commandList.push(aName + " - " + aDescription);
	}
}


function edit(response){
	function* editionWork(){
		//functions for the prints and validations.
		function imgUrlValidator(url, callback) { //img url validator.
			const img = new Image();
			img.src = url;
		
			if (img.complete) {
			  callback(true);
			} else {
			  img.onload = () => {
				callback(true);
			  };
			  
			  img.onerror = () => {
				callback(false);
			  };
			}
		}
		function mensaje(order, param = ""){ // Prints sorter.
			const mensaje= [
				"Let's update your porfolio! First let me know where do you wish to start:\n\"abm\"- About me\n\"exp\"- Experience\n\"edu\"- Education\n\"prj\"- Projects\n\"skl\"- Skills",
				//1
				"We will edit " + areaSectionItem(param),
				//2 section targeting.
				" What section do you wish to update?\n-\"1\"- " + areaSectionItem("1") + ".\n-\"2\"- " + areaSectionItem("2") + ".\n-\"3\"- " + areaSectionItem("3") + ".",
				//3 incorrect option message.
				"Sorry, wrong answer! Please check again!",
				//4 section info.
				"We will update your " + areaSectionItem(param) + " of the " + areaSectionItem(editing.slice(0,3)) + " area.",
				//5 targeting success message.
				"Okay! Let's begin!",
				//6 
				"Do you wish to continue?\nYes//No.",
				//7
				"Do you wish to change the "+ areaSectionItem(param) +"?\nYes//No.",
				//8
				"Please give me the URL of the new "+ areaSectionItem(param) +".",
				//9
				"Do you wish to continuing updating your portfolio?\nYes//No.",
				//10
				"The "+ areaSectionItem(param) +" was updated successfully",
				//11
				"Here, tell me what you wish to change or add!",
				//12

				//13


			]
			return (mensaje[order])
		}
		function areaSectionItem(param){ // labels.
			let first;
			let second;
			if (!areas.includes(param)){ first = editing.slice(0,3) }else{ first = param; }
			if (!sections.includes(param)){ second = editing.slice(4,5); }else{ second = param; }
			let third = param; 
			let areaName = "";
			let sectionName = "";
			let itemName= "";
			switch (first){
				case "exp": areaName = "Experience";
					switch (second){
						case "1": sectionName = "Last Job"; break;
						case "2": sectionName = "Biggest Challenge"; break;
						case "3": sectionName = "Most Exciting"; break;
						default: break;
					}
					break;
				case "edu": areaName = "Education";
					switch (second){
						case "1": sectionName = "Official education"; break;
						case "2": sectionName = "Courses"; break;
						case "3": sectionName = "Hobbies"; break;
						default: break;
					}
					break;
				case "skl": areaName = "Skill";
					switch(second){
						case "1": sectionName = "Programming"; break;
						case "2": sectionName = "Writing"; break;
						case "3": sectionName = "Language"; break;
						default: break;
					}
					break;
				case "prj": areaName = "Projects";
					switch(second){
						case "1": sectionName = "Code"; break;
						case "2": sectionName = "Tales"; break;
						case "3": sectionName = "Fight The Dragon!"; break;
						default: break;
					}
					break;
				case "abm": areaName = "About Me"; break;
			}
			if (areas.includes(param)){ return(areaName)}
			if (sections.includes(param)){return(sectionName)}
			if (first == "abm"){
				switch(third){
					case "a": itemName = "Profile Picture"; break;
					case "b": itemName = "Title"; break;
					case "c": itemName = "Description"; break;
				}
			}else{
				switch(third){
					case "a": itemName = "Item Logo"; break;
					case "b": itemName = "Description"; break;
					case "c": itemName = "Thoughts"; break;
				}
			}
			return(itemName);
		}

		//variables para loops y verificaciones.
		let editing = ""; //aca guardamos el target.
		let answer; // aca guardamos los yields.
		const areas = ["exp","edu","skl", "prj", "abm"];
		const sections = ["1","2","3"];
		//primero: targeting sequence.
		yield; // Pausa. Punto de arranque.
		let editorIsWorking = true;
		do{ // main editing loop. 
			let generalTargetingDone = false;
			do{  //main targeting loop.

				//  Area Targeting

				let areaTargeting = true;
				do{
					answer = yield(mensaje(0));
					if(areas.includes(answer)){ 
						editing = answer;
						areaTargeting = false;
						communication("muse_response", mensaje(1, answer)); //area info.
					}else{ communication("muse_response", mensaje(3)); } //error option.
				}while(areaTargeting)

				//  Section Targeting
				if (editing != "abm"){
					let sectionTargeting = true;
					do{
						answer = yield(mensaje(2));
						if(sections.includes(answer)){
							editing+="-"+answer+"-";
							communication("muse_response", mensaje(4, answer)); //section info.
							sectionTargeting = false;
						}else{ communication("muse_response", mensaje(3)); } //error option.
					}while(sectionTargeting);;
				}

				// Yes No confirmation.

				communication("muse_response", mensaje(6));
				answer = yield("yesNo");
				if (answer == "yes"){communication("muse_response", mensaje(5)); generalTargetingDone = true;}
				else{
					communication("muse_response", mensaje(9))
					answer = yield("yesNo");
					if (answer == "no"){return;}
				}
			}while(!generalTargetingDone);

			communication("muse_response", mensaje(7, "a"));
			answer = yield("yesNo");
			if (answer == "yes"){ //picture editing
				let pictureEditing = true;
				do{
					answer = yield(mensaje(8, "a"));
					imgUrlValidator(answer, (exists) => {
						if (exists) {
							document.getElementById(editing+"-a").src=answer;
							communication("muse_response", mensaje(10, "a"));
							pictureEditing = false; // picture editing done.								
						} else {
							communication("muse_response", mensaje(3));
						}
					});
				}while(pictureEditing);
			}
			let itemsBC = ["b", "c"];
			for (char of itemsBC){
				communication("muse_response", mensaje(7, char));
				answer = yield("yesNo");
				if(answer == "yes"){
					io.input.value = document.getElementById(editing+"-"+char).innerHTML;
					answer = yield(mensaje(11));
					document.getElementById(editing+"-"+char).innerHTML = answer;
					communication("muse_response", mensaje(10, char));
				}
			}
			communication("muse_response", mensaje(9))
			answer = yield("yesNo")
			if (answer == "no"){
				return;
			}
		}while(editorIsWorking == true);
	}

	if (gen == undefined){
		console.log(response);
		gen = editionWork();
		gen.next();
	}
	let control = gen.next(response);
	if (control.done == true){
		communication("muse_response", "I hope I have been helpful!\nExiting from Edit Mode.");
		communication("muse_exit");
	}else{
		switch(control.value){
			case "yesNo": yesNo = !yesNo; break;
			default: if (control.value != undefined){ communication("muse_response", control.value)}; break;
		}
	}
	
}