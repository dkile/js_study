window.onload = function () {
  const section = document.getElementsByTagName("section");
  const pointBtn = document.querySelectorAll(".pointWrap li");
  const totalPage = section.length;
  let pageNum = 0;

  function pageChange() {
    for (let i = 0; i < totalPage; i++) {
      section[i].classList.remove("active");
      pointBtn[i].classList.remove("active");
    }
    section[pageNum].classList.add("active");
    pointBtn[pageNum].classList.add("active");
  }

  for (let i = 0; i < pointBtn.length; i++) {
    (function (idx) {
      pointBtn[idx].onclick = function () {
        pageNum = idx;
        pageChange();

        window.scrollTo({
          top: section[pageNum].offsetTop,
          behavior: "smooth",
        });
      };
    })(i);
  }

  window.addEventListener("scroll", function (event) {
    const scroll = this.scrollY;

    for (let i = 0; i < totalPage; i++) {
      if (
        scroll > section[i].offsetTop - window.outerHeight / 1.5 &&
        scroll <
          section[i].offsetTop -
            window.outerHeight / 1.5 +
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
