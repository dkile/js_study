window.onload = function() {
    const numInput = document.getElementById("numInput");
    const result = document.getElementById("result");
    const submitBtn = document.getElementById("submitBtn");
    const answer = 4;
    const resultArr = ["업", "다운", "정답"];

    const resultFunc = function() {
        const inputNum = numInput.value;
        if (answer > inputNum)
            result.innerHTML = resultArr[0];
        else if (inputNum > answer)
            result.innerHTML = resultArr[1];
        else
            result.innerHTML = resultArr[2];
    }

    submitBtn.addEventListener("click", function() {
        resultFunc();
    });
}