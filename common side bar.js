const barLines = document.getElementById("barLines");
const sideOptBar = document.getElementById("sideOptBar");
barLines.addEventListener("click", () => {
    sideOptBar.classList.toggle("show");
});