window.onload = function(){
    const button = document.getElementById("resetBtn");
    const h1 = document.getElementsByTagName("h1")[0];

    const handArr = ["가위", "바위", "보"];

    button.addEventListener("click", function() {
        let num = Math.round(Math.random() * (handArr.length -1));

        h1.innerHTML = handArr[num];
    })
}