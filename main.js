const EDIT = (a=prevNum,b=prev,c=curr,d=isOperation) => {
    prevNum = a;
    prev = b;
    curr = c;
    isOperation = d;
    PREV.innerText = prev;
    CURR.innerText = curr;
}

const CALC = (x) => {
    if(["+","-","x","÷"].includes(x)) {
        if(!isOperation) {
            EDIT(curr,`${curr} ${x}`,"0",true);
            return;
        } else {
            return;
        };
    };

    switch(x) {
        case "+/-":
            negation = parseFloat(curr) * -1;
            EDIT(negation,prev,negation.toString());
            break;
        case ".":
            !curr.includes(".") && EDIT(prevNum,prev,curr+="."); 
            break;
        case "CLEAR":
            EDIT(0,"","0",false);
            break;
        case "←":
            if(curr.length == 1 || curr.match(/^\-\d$/)) {
                EDIT(prevNum,prev,"0");
            } else {
                EDIT(prevNum,prev,curr.slice(0,-1));
            }
            break;
        case "√":
            EDIT(prevNum,prev,(parseFloat(curr) ** 0.5).toString());
            break;
        case "=":
            let result = 0;
            if(prev.includes("+")) {
                result = parseFloat(prevNum) + parseFloat(curr);
            } else if(prev.includes("-")){
                result = parseFloat(prevNum) - parseFloat(curr);
            } else if(prev.includes("x")) {
                result = parseFloat(prevNum) * parseFloat(curr);
            } else if(prev.includes("÷")) {
                result = parseFloat(prevNum) / parseFloat(curr);
            } else {
                break;
            };
            EDIT(0,"",result.toString(),false);
            break;
        default:
            EDIT(prevNum,prev,curr+=x);
    };
};

const BUTTON_ROWS = (x) => {
    switch(x) {
        case 1:
            return [4,8];
        case 2:
            return [8,12];
        case 3:
            return [12,16];
        case 4:
            return [16,20];
        default:
            return [0,4];
    };
};

let prevNum;
let prev = "";
let curr = "0";
let isOperation = false;

const BTN = [
    "CLEAR","←","√","+",
    "7","8","9","-",
    "4","5","6","x",
    "1","2","3","÷",
    "+/-","0",".","="
];

const BUTTON_CONTAINER = document.querySelectorAll("article")[1];
const PREV = document.querySelectorAll("li")[1];
const CURR = document.querySelectorAll("li")[2];

for(i=0;i<5;i++){
    const ROW = document.createElement("div");
    for(k=BUTTON_ROWS(i)[0];k<BUTTON_ROWS(i)[1];k++){
        const BUTTON = document.createElement("button");
        BUTTON.innerText = BTN[k];
        BUTTON.addEventListener("click", (e) => CALC(e.target.textContent));
        ROW.appendChild(BUTTON);
    };
    BUTTON_CONTAINER.appendChild(ROW);
};