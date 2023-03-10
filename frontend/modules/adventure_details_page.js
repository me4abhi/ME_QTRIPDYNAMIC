import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureUrl = new URLSearchParams(search.slice(1));
  let adventureId = adventureUrl.get("adventure");

  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventureDetails = await (
      await fetch(
        config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
      )
    ).json();
    return adventureDetails;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return adventureDetails;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure["name"];
  document.getElementById("adventure-subtitle").innerHTML =
    adventure["subtitle"];

  adventure["images"].forEach((image) => {
    document.getElementById(
      "photo-gallery"
    ).innerHTML += `<img src="${image}" alt="${adventure["name"]}" class="activity-card-image">`;
  });

  document.getElementById("adventure-content").innerHTML = adventure["content"];
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = "";

  let imagesCarousel = "";
  images.forEach((image) => {
    imagesCarousel += `<div class="carousel-item">
    <img src="${image}" class="d-block w-100" alt="adventure">
  </div>`;
  });

  document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    ${imagesCarousel}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

document.querySelector(".carousel-item").setAttribute("class", "carousel-item active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out");
  let available = document.getElementById("reservation-panel-available");
  let costPerHead = adventure["costPerHead"];

  let availability = adventure["available"];

  if (availability === true) {
    soldOut.style.display = "none";
    available.style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = costPerHead;
  } else {
    soldOut.style.display = "block";
    available.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure["costPerHead"];
  let reservationCost = costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = reservationCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById("myForm");
  const postEndpoint = config.backendEndpoint + "/reservations/new";

  form.addEventListener('submit', (event) => {
    event.preventDefault();


    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const person = form.elements["person"].value;
  
    const dataToSubmit = {
      name: name,
      date: date,
      person: person,
      adventure: adventure.id
    };
  
    console.log(dataToSubmit)

    const options = {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  fetch(postEndpoint, options)
  .then((response) => {
    console.log(response.json());
    alert("Success!");
  })
  .catch((response) => alert("Failed!"));
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");
  if (adventure["reserved"]) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
  // if (adventure["reserved"])
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
