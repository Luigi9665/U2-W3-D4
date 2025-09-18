// VARIABILI GENERALI
const btnLoad = document.getElementById("loadFirst");
const btnSecondLoad = document.getElementById("loadSecond");
const row = document.getElementById("rowCard");
const search = document.getElementById("formSearch");

// FUNZIONI
const eliminateCard = () => {
  const allCard = document.querySelectorAll(".col-md-4");
  allCard.forEach((card) => card.remove());
};

generateCard = (photo) => {
  const col = document.createElement("div");
  col.classList.add("col-md-4");
  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";
  const cardImg = document.createElement("img");
  cardImg, (className = "bd-placeholder-img card-img-top");
  cardImg.src = photo.src.medium;
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = photo.photographer;
  const p = document.createElement("p");
  p.className = "card-text";
  p.innerText = photo.alt;
  const divBtn = document.createElement("div");
  divBtn.className = "d-flex justify-content-between align-items-center";
  const btnGrour = document.createElement("div");
  btnGrour.className = "btn-group";
  const btnView = document.createElement("button");
  btnView.className = "btn btn-sm btn-outline-secondary";
  btnView.innerText = "View";
  const btnHide = document.createElement("button");
  btnHide.className = "btn btn-sm btn-outline-secondary";
  btnHide.innerText = "Hide";
  btnGrour.append(btnView, btnHide);
  const small = document.createElement("small");
  small.className = "text-muted";
  small.innerText = photo.id;
  divBtn.append(btnGrour, small);
  cardBody.append(h5, p, divBtn);
  card.append(cardImg, cardBody);
  col.append(card);
  row.appendChild(col);
};

// button per il primo load
btnLoad.addEventListener("click", () => {
  const URL = "https://api.pexels.com/v1/search?query=hamsters";
  fetch(URL, {
    headers: {
      Authorization: "NiAwlSU0YB3EWciuUahYoP1RPAQKK05VVL3kFsxzyJvfx4MKRnkCb5df",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      return response.json();
    })
    .then((hamsters) => {
      photos = hamsters.photos;
      console.log(photos);
      // mando la funzione per eliminare le card
      eliminateCard();
      // mando la funzione per generare le nuove card
      photos.forEach((photo) => generateCard(photo));
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

// button per il secondo load
btnSecondLoad.addEventListener("click", () => {
  const URL = "https://api.pexels.com/v1/search?query=tigers";
  fetch(URL, {
    headers: {
      Authorization: "NiAwlSU0YB3EWciuUahYoP1RPAQKK05VVL3kFsxzyJvfx4MKRnkCb5df",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      return response.json();
    })
    .then((hamsters) => {
      photos = hamsters.photos;
      console.log(photos);
      // mando la funzione per eliminare le card
      eliminateCard();
      // mando la funzione per generare le nuove card
      photos.forEach((photo) => generateCard(photo));
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});
