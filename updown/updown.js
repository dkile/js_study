window.onload = function () {
  const numInput = document.getElementById("numInput");
  const result = document.getElementById("result");
  const submitBtn = document.getElementById("submitBtn");
  const resultArr = ["업", "다운", "정답"];

  let answer = Math.round(Math.random() * 10);

  const resetFunc = function () {
    result.innerHTML = "(1부터 1-사이 정수)";
    answer = Math.round(Math.random() * 10);
  };

  const resultFunc = function () {
    const inputNum = numInput.value;
    if (answer > inputNum) result.innerHTML = resultArr[0];
    else if (inputNum > answer) result.innerHTML = resultArr[1];
    else {
      result.innerHTML = resultArr[2];
      setTimeout(function () {
        resetFunc();
      }, 1000);
    }
  };

  submitBtn.addEventListener("click", function () {
    resultFunc();
  });
};
