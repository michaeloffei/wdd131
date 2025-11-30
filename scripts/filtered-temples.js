const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("show");
    hamButton.classList.toggle("open");
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Accra Ghana Temple",
        location: "Accra, Ghana",
        dedicated:"2004, January, 11",
        area: 17500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-15503.jpg" 
  },
  {
        templeName: "Calabar Nigeria Temple",
        location: "Calabar, Nigeria",
        dedicated:"2004, January, 11",
        area: 26000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/calabar-nigeria-temple/calabar-nigeria-temple-65892.jpg" 
  },
  {     templeName: "Birmingham Alabama Temple",
        location: "Alabama, United States",
        dedicated:"2000, September, 3",
        area: 10700,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/birmingham-alabama-temple/birmingham-alabama-temple-62630.jpg" 
  },
  {     templeName: "Dallas Texas Temple",
        location: "Texas, United States",
        dedicated:"1984, October, 24",
        area: 44207,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-59556-thumb.jpg" 
  }
    // Add more temple objects here...
];

const templeContainer = document.querySelector("#temple-cards");

function displayTemples(templesArray) {
    templeContainer.innerHTML = "";

    templesArray.forEach(temple => {
        const card = document.createElement("div");
        card.classList.add("temple-card");

        card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    `;

        templeContainer.appendChild(card);
    });
}

displayTemples(temples);

document.querySelector("#home").addEventListener("click", () => displayTemples(temples));
document.querySelector("#old").addEventListener("click", () => {
  const oldTemples = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
  displayTemples(oldTemples);
});
document.querySelector("#new").addEventListener("click", () => {
  const newTemples = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
  displayTemples(newTemples);
});
document.querySelector("#large").addEventListener("click", () => {
  const largeTemples = temples.filter(t => t.area > 90000);
  displayTemples(largeTemples);
});
document.querySelector("#small").addEventListener("click", () => {
  const smallTemples = temples.filter(t => t.area < 10000);
  displayTemples(smallTemples);
});


const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;
