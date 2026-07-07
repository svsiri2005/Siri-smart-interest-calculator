// ================================
// Smart Interest Calculator
// Part 1
// ================================

// Input Elements
const principal = document.getElementById("principal");
const rate = document.getElementById("rate");
const time = document.getElementById("time");
const frequency = document.getElementById("frequency");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const interestOutput = document.getElementById("interest");
const totalOutput = document.getElementById("total");

const formulaText = document.getElementById("formulaText");
const frequencyBox = document.getElementById("frequencyBox");

const calculatorType =
document.querySelectorAll("input[name='type']");

// ================================
// Hide Frequency Initially
// ================================

frequencyBox.style.display = "none";

// ================================
// Change Formula
// ================================

calculatorType.forEach((radio)=>{

    radio.addEventListener("change",()=>{

        if(radio.value==="compound" && radio.checked){

            frequencyBox.style.display="flex";

            formulaText.innerHTML=
            "CI = P × (1 + R / (100 × N))<sup>NT</sup>";

        }
        else{

            frequencyBox.style.display="none";

            formulaText.innerHTML=
            "SI = (P × R × T) / 100";

        }

    });

});

// ================================
// Currency Format
// ================================

function money(value){

    return Number(value).toLocaleString("en-IN",{

        style:"currency",

        currency:"INR",

        maximumFractionDigits:2

    });

}

// ================================
// Validation
// ================================

function validate(){

    if(

        principal.value==="" ||

        rate.value==="" ||

        time.value===""

    ){

        alert("Please fill all fields.");

        return false;

    }

    if(

        principal.value<=0 ||

        rate.value<=0 ||

        time.value<=0

    ){

        alert("Values must be greater than zero.");

        return false;

    }

    return true;

}

// ================================
// Calculate Interest
// ================================

calculateBtn.addEventListener("click",()=>{

    if(!validate()) return;

    const P=parseFloat(principal.value);

    const R=parseFloat(rate.value);

    const T=parseFloat(time.value);

    const selected=

    document.querySelector(

        "input[name='type']:checked"

    ).value;

    let interest;

    let total;

    if(selected==="simple"){

        interest=(P*R*T)/100;

        total=P+interest;

    }

    else{

        const N=parseInt(frequency.value);

        total=

        P*

        Math.pow(

            1+(R/(100*N)),

            N*T

        );

        interest=total-P;

    }

    interestOutput.textContent=

    money(interest);

    totalOutput.textContent=

    money(total);

});

// ================================
// Smart Interest Calculator
// Part 2
// ================================

// Extra Elements
const themeBtn = document.getElementById("themeBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistory = document.getElementById("clearHistory");
const historyList = document.getElementById("historyList");

// ================================
// Load History
// ================================

let history = JSON.parse(localStorage.getItem("history")) || [];

displayHistory();

// ================================
// Save Calculation
// ================================

function saveHistory(type, p, r, t, interest, total) {

    history.unshift({
        type,
        principal: money(p),
        rate: r + "%",
        time: t + " Years",
        interest: money(interest),
        total: money(total)
    });

    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem("history", JSON.stringify(history));

    displayHistory();

}

// ================================
// Display History
// ================================

function displayHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
        "<li>No calculations yet.</li>";

        return;

    }

    history.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
        <strong>${item.type.toUpperCase()}</strong><br>
        Principal : ${item.principal}<br>
        Rate : ${item.rate}<br>
        Time : ${item.time}<br>
        Interest : ${item.interest}<br>
        Total : ${item.total}
        `;

        historyList.appendChild(li);

    });

}

// ================================
// Save After Calculation
// ================================

calculateBtn.addEventListener("click", () => {

    if (!validate()) return;

    const P = parseFloat(principal.value);
    const R = parseFloat(rate.value);
    const T = parseFloat(time.value);

    const selected =
    document.querySelector(
        "input[name='type']:checked"
    ).value;

    let interest;
    let total;

    if (selected === "simple") {

        interest = (P * R * T) / 100;
        total = P + interest;

    } else {

        const N = parseInt(frequency.value);

        total =
        P * Math.pow(
            1 + (R / (100 * N)),
            N * T
        );

        interest = total - P;

    }

    saveHistory(
        selected,
        P,
        R,
        T,
        interest,
        total
    );

});

// ================================
// Reset
// ================================

resetBtn.addEventListener("click", () => {

    principal.value = "";
    rate.value = "";
    time.value = "";

    frequency.value = "1";

    interestOutput.textContent = "₹0";
    totalOutput.textContent = "₹0";

});

// ================================
// Copy Result
// ================================

copyBtn.addEventListener("click", () => {

    const text =

`Interest : ${interestOutput.textContent}
Total Amount : ${totalOutput.textContent}`;

    navigator.clipboard.writeText(text);

    alert("Result copied!");

});

// ================================
// Theme Toggle
// ================================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.textContent = "☀️";

    }else{

        themeBtn.textContent = "🌙";

    }

});

// ================================
// Clear History
// ================================

clearHistory.addEventListener("click", () => {

    history = [];

    localStorage.removeItem("history");

    displayHistory();

});