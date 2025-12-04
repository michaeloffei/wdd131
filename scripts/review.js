
let count = Number(localStorage.getItem("reviewCount")) || 0;


count++;


localStorage.setItem("reviewCount", count);


document.getElementById("review-count").textContent = count;


const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;