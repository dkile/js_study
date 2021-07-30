window.onload = function () {
  const starBg = document.querySelector(".starBg");
  const title = document.querySelector(".title");
  const topBtn = document.getElementById("topBtn");
  const titleDiv = title.querySelectorAll("div");

  window.addEventListener("scroll", function () {
    const scroll = this.scrollY;
    console.log(scroll);
    starBg.style.transform = "translateY(" + -scroll / 3 + "px)";
    title.style.transform = "translateY(" + scroll / 1.7 + "px)";
  });

  for (let i = 0; i < titleDiv.length; i++) {
    TweenMax.from(titleDiv[i], 1.5, {
      autoAlpha: 0,
      scale: 4,
      delay: Math.random() * 1,
      ease: Power3.easeInOut,
    });
  }
  //   setTimeout(function () {
  //     window.scrollTo({
  //       top: document.querySelector(".bottom").offsetTop,
  //       behavior: "smooth",
  //     });
  //   }, 2000);

  //   TweenMax.to(window, 3, {
  //     scrollTo: {
  //       y: ".bottom",
  //     },
  //     delay: 1.7,
  //     ease: Power4.easeInOut,
  //   });

  TweenMax.to(window, 3, {
    scrollTo: {
      y: ".bottom",
    },
    delay: 1.7,
    ease: Power4.easeInOut,
  });

  TweenMax.from(".bottom", 2.5, {
    scale: 0.7,
    y: 100,
    delay: 3,
    ease: Power3.easeInOut,
  });

  topBtn.addEventListener("click", function () {
    TweenMax.to(window, 1.5, {
      scrollTo: {
        y: 0,
        autoKill: true,
      },
      ease: Power3.easeInOut,
    });
  });
};
