window.onload = function () {
  const bgColorArr = ["#85FFBD", "#FFFB7D", "#E0C3FC", "#00DBDE"];
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const section = document.getElementsByTagName("section");

  const totalPage = section.length;
  let pageNum = Math.round(Math.random() * (totalPage - 1));
  let timer;

  function pageChange() {
    document.getElementsByTagName("body")[0].style.background =
      bgColorArr[pageNum];
  }

  prevBtn.addEventListener("click", function () {
    if (pageNum > 0) pageNum--;
    else pageNum = totalPage - 1;
    pageChange();
    window.scrollTo({
      top: section[pageNum].offsetTop,
      behavior: "smooth",
    });
  });
  nextBtn.addEventListener("click", function () {
    if (pageNum < totalPage - 1) pageNum++;
    else pageNum = 0;
    pageChange();
    window.scrollTo({
      top: section[pageNum].offsetTop,
      behavior: "smooth",
    });
  });
  /*timer = setInterval(function () {
    if (pageNum > 0) pageNum--;
    else pageNum = totalPage - 1;
    bgColorChange();
  }, 1000);*/
  window.addEventListener("scroll", function (event) {
    let scroll = this.scrollY;

    for (let i = 0; i < totalPage; i++) {
      if (
        scroll > section[i].offsetTop - window.outerHeight / 2 &&
        scroll <
          section[i].offsetTop -
            window.outerHeight / 2 +
            section[i].offsetHeight
      ) {
        pageNum = i;
        break;
      }
    }
    pageChange();
  });
  pageChange();
};
