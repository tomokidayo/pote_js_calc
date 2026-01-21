//電卓処理

//必要な変数
let calcDisplay = document.getElementById("cal_display");
let firstOperand = null; //初期入力値を保存
let operator = null;     //演算子を格納
let waitingForSecondOperand = false; //二つ目の数値を入力中かどうか

//数字ボタンが押されたときの処理
function insertNumber(digit) {
    if (waitingForSecondOperand) {
        //(数字) + の状態の時に値を押した時の処理
        calcDisplay.value = digit;
        waitingForSecondOperand = false;
    } else {
        //上記でないときの処理
        calcDisplay.value = calcDisplay.value === '0' ? digit : calcDisplay.value + digit;
    }
}

//小数点ボタンが押されたときの処理
function insertDecimal(dot) {
    if (waitingForSecondOperand) {
        calcDisplay.value = '0.';
        waitingForSecondOperand = false;
        return;
    }
    if (!calcDisplay.value.includes(dot)) {
        //現在の入力値に小数点は含まれていないか
        calcDisplay.value += dot;
    }
}

//演算子ボタンが押されたときの処理
function setOperator(nextOperator) {
    const inputValue = parseFloat(calcDisplay.value);
    if (operator && waitingForSecondOperand) {
        //(数値) + の状態の時に演算子を押した時の処理
        operator = nextOperator;
        return;
    }
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        //(数値) + (数値) の状態で演算子を押した時の処理
        //現時点での計算結果を表示
        const result = performCalculation[operator](firstOperand, inputValue);
        calcDisplay.value = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;

    // 表示用
    expression = firstOperand + " " + nextOperator;
    calcDisplay.value = expression;
}

//計算を実行するオブジェクト
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

//イコールボタンが押されたときの処理
function calculate() {
    const inputValue = parseFloat(calcDisplay.value);
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calcDisplay.value = String(result);
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = true;
    }
}

//クリアボタンが押されたときの処理
function clearDisplay() {
    calcDisplay.value = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
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
