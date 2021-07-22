window.onload = function() {
    const resetBtn = document.getElementById("resetBtn");
    const rotateBtn = document.getElementById("rotateBtn");
    const h2 = document.getElementsByTagName("h2")[0];
    const arrow = document.getElementById("arrowImg");

    let rotateNum = -90;

    console.log(resetBtn);
    resetBtn.addEventListener("click", function() {
        rotateNum = -90;
        h2.innerHTML = rotateNum + "deg";
        arrow.style.transform = "rotate(" + rotateNum + "deg)";
    })

    rotateBtn.addEventListener("click", function() {
        rotateNum = Math.round(Math.random() * 720);
        h2.innerHTML = rotateNum + "deg";
        arrow.style.transform = "rotate(" + rotateNum + "deg)";
    })
}