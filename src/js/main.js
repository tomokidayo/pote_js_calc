//電卓処理

//必要な変数
let calcDisplay = document.getElementById("cal_display");
let firstOperand = null; //初期入力値を保存
let operator = null;     //演算子を格納
let waitingForSecondOperand = false; //二つ目の数値を入力中かどうか

let expression = ""; // 表示用
let currentInput=""; // 入力値

//数字ボタンが押されたときの処理
function insertNumber(digit) {
    if (waitingForSecondOperand) {
        //(数字) + の状態の時に値を押した時の処理
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        if (currentInput === "0" || currentInput === "00") {
            //一番最初に0または00が押下された時の処理
            currentInput = digit;
        } else {
            //上記でないときの処理
            currentInput += digit;
        }
        
    }
    calcDisplay.value = expression + currentInput;
}

//小数点ボタンが押されたときの処理
function insertDecimal() {
    if (currentInput.includes(".")) return;

    if (currentInput === "") {
        currentInput = "0.";
    } else {
        currentInput += ".";
    }

    waitingForSecondOperand = false;
    calcDisplay.value = expression + currentInput;
}

//演算子ボタンが押されたときの処理
function setOperator(nextOperator) {
    if (currentInput === "") return;

    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {

        firstOperand = inputValue;
    } else if (operator) {
        //(数値) + (数値) の状態で演算子を押した時の処理
        //現時点での計算結果を表示
        firstOperand = performCalculation[operator](firstOperand, inputValue);
    }

    operator = nextOperator;
    // 表示用
    expression = firstOperand + " " + nextOperator + " ";
    currentInput = "";
    waitingForSecondOperand = true;
    calcDisplay.value = expression;
}

//計算を実行するオブジェクト
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
};

//イコールボタンが押されたときの処理
function calculate() {
    if (!operator || currentInput === "") return;

    const secondOperand = parseFloat(currentInput);
    const result = performCalculation[operator](firstOperand, secondOperand);

    calcDisplay.value = result;

    firstOperand = result;
    operator = null;
    expression = "";
    currentInput = "";
    waitingForSecondOperand = true;
}

//クリアボタンが押されたときの処理
function clearDisplay() {
    calcDisplay.value = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    expression = "";
    currentInput ="";
}

$(".cal_btn").hover(
    function () {
        $(this).css({
            "background-color": "#888",
            "transform": "scale(1.05)"
        });
    },
    function () {
        $(this).css({
            "background-color": "#666",
            "transform": "scale(1)"
        });
    }
);
