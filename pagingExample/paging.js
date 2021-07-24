window.onload = function () {
  const bgColorArr = ["#85FFBD", "#FFFB7D", "#E0C3FC", "#00DBDE"];
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const totalPage = bgColorArr.length;
  let pageNum = Math.round(Math.random() * (totalPage - 1));
  let timer;

  function bgColorChange() {
    document.getElementsByTagName("body")[0].style.background =
      bgColorArr[pageNum];
  }

  prevBtn.addEventListener("click", function () {
    if (pageNum > 0) pageNum--;
    else pageNum = totalPage - 1;
    bgColorChange();
  });
  nextBtn.addEventListener("click", function () {
    if (pageNum < totalPage - 1) pageNum++;
    else pageNum = 0;
    bgColorChange();
  });
  timer = setInterval(function () {
    if (pageNum > 0) pageNum--;
    else pageNum = totalPage - 1;
    bgColorChange();
  }, 1000);
};
