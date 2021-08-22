window.onload = function () {
  const salaryInput = document.getElementById("salaryInput");
  const submitBtn = document.getElementById("submitBtn");
  const result = document.getElementById("result");

  let timer;

  function salaryInterval() {
    let secNum = 0;
    const salary = salaryInput.value * 10000;

    clearInterval(timer);
    secSalary = salary / 365 / 24 / 60 / 60;

    timer = setInterval(function () {
      secNum++;
      result.innerHTML = (secSalary * secNum).toFixed(1);
    }, 1000);
  }

  submitBtn.addEventListener("click", function () {
    salaryInterval();
  });
};
