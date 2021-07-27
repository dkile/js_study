window.onload = function () {
  const contentWrap = document.querySelector(".contentWrap");
  const album = document.getElementsByClassName("album");
  const innerDisk = document.getElementsByClassName("innerDisk");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pointWrap = document.getElementsByClassName("pointWrap")[0];
  const totalPageNum = album.length;
  let pointBtn;
  let pageNum = 0;
  const bgArray = [
    ["#0272a4", "#f6a564"],
    ["#bbc4cd", "#346864"],
    ["#e48d81", "#5e6e95"],
    ["#d0b080", "#b67c62"],
    ["#b33137", "#1c0a02"],
    ["#acb5b0", "#7f9b92"],
  ];

  (function () {
    const li = [];
    for (let i = 0; i < totalPageNum; i++) {
      li.push("<li></li>");
    }
    pointWrap.innerHTML = li.join("");
  })();

  pointBtn = document.querySelectorAll(".pointWrap li");
  for (let i = 0; i < totalPageNum; i++) {
    (function (idx) {
      pointBtn[idx].onclick = function () {
        pageNum = idx;
        pageChange();
      };
    })(i);
  }
  pageChange();

  function pageChange() {
    for (let i = 0; i < totalPageNum; i++) {
      album[i].classList.remove("active");
      pointBtn[i].classList.remove("active");
    }
    album[pageNum].classList.add("active");
    pointBtn[pageNum].classList.add("active");

    contentWrap.style.background =
      "linear-gradient(120deg, " +
      bgArray[pageNum][0] +
      ", " +
      bgArray[pageNum][1] +
      ")";
    innerDisk[pageNum].style.background = bgArray[pageNum][0];
  }

  prevBtn.addEventListener("click", function () {
    if (pageNum > 0) pageNum--;
    else pageNum = totalPageNum - 1;
    pageChange();
  });

  nextBtn.addEventListener("click", function () {
    if (pageNum < totalPageNum - 1) pageNum++;
    else pageNum = 0;
    pageChange();
  });
};
