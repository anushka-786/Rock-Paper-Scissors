let userscore = 0;
let compscore = 0;

//accessing choices -1
const choices = document.querySelectorAll(".choice");

// defining winning msg -8
const msg = document.querySelector("#msg");

//accessing scores  -9
const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");

let bestoffive = false;  // false = endless mode
let matchover = false;   // true when someone reaches 3 in best of 5


//generating computer choice -4
const gencompchoice = () => {
  const options = ["rock" , "paper" , "scissors"];
   //saving choices in an array so we can randomly generate numbers which will be treated as indexes to fetch random choice for comp
  const randidx = Math.floor(Math.random() * 3);
  return options[randidx];
}

//defining draw game -6
const drawgame = () => {
    console.log("draw");
    msg.innerText = " It's a Draw . Play Again! ";//winning text-8
    msg.style.backgroundColor = "#69A197";
}

// adding best of five loop
const checkmatch = () => {
    if (!bestoffive) return;
    if (userscore === 3) {
                msg.innerText = msg.innerText.replace("!YOU WON!", "!YOU WON THE MATCH! 🏆");
        matchover = true;
    } else if (compscore === 3) {
                msg.innerText = msg.innerText.replace("!YOU LOST!", "!YOU LOST THE MATCH!");
        matchover = true;
    }
};


//defining showwinner -7
const showwinner = (userwin , userchoice , compchoice) => {
    if (userwin){
        userscore++; // calling scores
        userscorepara.innerText = userscore;

        console.log("you win");
        msg.innerText =  `Your ${userchoice} beats ${compchoice} . !YOU WON!` ; //winning text-8
        msg.style.backgroundColor = "rgb(78, 199, 73)";
    } else {
        compscore++;  // calling scores
        compscorepara.innerText = compscore;

        console.log("you lose");
        msg.innerText = `${compchoice} beats your ${userchoice} . !YOU LOST!`;//winning text-8
        msg.style.backgroundColor = "#ED254E";
    }   checkmatch();
}

//defining playgame -3
const playgame =(userchoice) => {
 console.log("user choice =" , userchoice);

 //now we need to generate comp choice -4
 const compchoice = gencompchoice();
 console.log("comp choice=" , compchoice);

//setting consition for result of game -5
 if (userchoice === compchoice){
    drawgame(); // draw game -6
 } else {
    let userwin = true ; //tracking win of user
    //case 1
    if(userchoice === "rock"){
       userwin = compchoice === "paper" ? false : true //userwin=false =>>paper wins so comp wins , userwin=true =>>comp looses 


       //case 2
    } else if (userchoice === "paper"){
        userwin = compchoice === "scissors" ? false : true;  
    
    
    //case 3
    } else {
        userwin = compchoice === "rock" ? false : true ;
    }

    showwinner(userwin , userchoice , compchoice); //we can show winner now -7
 }
};
//now add winning msg -8


//adding event list. on each div to track click -2
choices.forEach((choice) => {
    choice.addEventListener("click", () =>{
         if (matchover) return;  // locks the hands when the match is over
    const userchoice = choice.getAttribute("id");
    console.log("choice in clicked");
    playgame(userchoice);

    });
});

//new game button
const newgamebtn = document.querySelector("#new-game");

newgamebtn.addEventListener("click", () => {
    matchover = false;
    userscore = 0;
    compscore = 0;
    userscorepara.innerText = 0;
    compscorepara.innerText = 0;
    msg.innerText = " Play your move ";
    msg.style.backgroundColor = "";
});


//best of five toggle
const bestbtn = document.querySelector("#best-of-five");

bestbtn.addEventListener("click", () => {
    bestoffive = !bestoffive;
    bestbtn.innerText = bestoffive ? "Back to Endless" : "Play Best of 5";
    newgamebtn.click();  // fresh start whenever the mode changes
    if (bestoffive) {
        msg.innerText = " Best of 5: first to 3 wins! ";
    }
});