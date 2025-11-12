const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("show");
  hamButton.classList.toggle("open");
});


const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;
