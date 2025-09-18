const URL = "https://api.pexels.com/v1/photos/";

const params = new URLSearchParams(window.location.search);
// console.log(params);
const appId = params.get("id");
// console.log(appId);

window.addEventListener("DOMContentLoaded", () => {
  console.log("RESOURCE ID: ", appId);
  fetch(URL + appId, {
    headers: {
      Authorization: "NiAwlSU0YB3EWciuUahYoP1RPAQKK05VVL3kFsxzyJvfx4MKRnkCb5df",
    },
  })
    // .then((appointmentObj) => {
    //   const { name, description, price, time } = appointmentObj;
    //   const container = document.getElementById("details-content");
    //   container.innerHTML = `
    //                   <h1>${name}</h1>
    //                   <p>${description}</p>
    //                   <p>${price}€</p>
    //                   <p>${time}</p>
    //                   <button onclick="handleBtnClick()" class="btn btn-success">Modifica Appuntamento</button>
    //                   `;
    // })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      return response.json();
    })
    .then((photoObj) => {
      console.log(photoObj);
      document.body.style.backgroundColor = photoObj.avg_color;
      const container = document.getElementById("details-content");
      container.innerHTML = `
                      <h1 class="display-3 fw-semibold">${photoObj.photographer}</h1>
                      <a href=${photoObj.photographer_url} class="text-decoration-none d-block fs-3 fw-semibold text-success" target="_blank"> Visualizza il mio profilo </a>
                      <img src=${photoObj.src.large} class="bd-placeholder-img" />
                      <p class="fs-2" >${photoObj.alt}</p>
                      `;
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

const handleBtnClick = function () {
  window.location.assign("./backoffice.html?appointmentId=" + appId);
};
