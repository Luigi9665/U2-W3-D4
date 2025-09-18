// VARIABILI GENERALI
const btnLoad = document.getElementById("loadFirst");
const btnSecondLoad = document.getElementById("loadSecond");
const row = document.getElementById("rowCard");
const search = document.getElementById("formSearch");

// FUNZIONI

// gestione del loading
const isLoading = (boolean, id) => {
  const spinner = document.getElementById(id);
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

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
  const linkImg = document.createElement("a");
  linkImg.href = `details.html?id=${photo.id}`;
  linkImg.className = "text-decoration-none";
  cardImg.className = "bd-placeholder-img card-img-top";
  cardImg.src = photo.src.medium;
  linkImg.append(cardImg);
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const h5 = document.createElement("h5");
  const linkText = document.createElement("a");
  linkText.href = `details.html?id=${photo.id}`;
  linkText.className = "text-decoration-none";
  h5.className = "card-title";
  h5.innerText = photo.photographer;
  linkText.append(h5);
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

  // {

  //   aggiungo evento per visualizzare la foto nel modale
  // btnView.addEventListener("click", () => {
  //     const modal = document.createElement("div");
  //     modal.innerHTML = `
  //     <div class="modal" tabindex="-1">
  //     <div class="modal-dialog">
  //     <div class="modal-content">
  //     <div class="modal-header">
  //     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //     </div>
  //     <div class="modal-body">
  //     <img src=${photo.src.large} class="bd-placeholder-img" />
  //     </div>
  //     <div class="modal-footer">
  //     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //     <button type="button" class="btn btn-primary">Save changes</button>
  //     </div>
  //     </div>
  //     </div>
  //     </div>
  //     `;
  //     console.log("sei dentro il click del view");
  //     console.log(modal);
  // col.append(modal);
  // ottieni l'elemento con class="modal"
  // const modalEl = modal.querySelector(".modal");
  // document.body.appendChild(modalEl);

  // inizializza Bootstrap Modal
  // const bsModal = new bootstrap.Modal(modalEl);
  // bsModal.show();

  // rimuovi il modal dal DOM quando si chiude
  //         modalEl.addEventListener("hidden.bs.modal", () => {
  //             modalEl.remove();
  //         });
  //     });
  // }

  const btnHide = document.createElement("button");
  btnHide.className = "btn btn-sm btn-outline-secondary";
  btnHide.innerText = "Hide";
  //aggiungo evento per rimuovere la card
  btnHide.addEventListener("click", () => {
    col.remove();
  });
  btnGrour.append(btnView, btnHide);
  const small = document.createElement("small");
  small.className = "text-muted";
  small.innerText = photo.id;
  divBtn.append(btnGrour, small);
  cardBody.append(linkText, p, divBtn);
  card.append(linkImg, cardBody);
  col.append(card);
  row.appendChild(col);
};

// gestione del fetch
const handleFetch = (url, id) => {
  const spinner = document.getElementById(id);
  fetch(url, {
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
    .then((dataArray) => {
      photos = dataArray.photos;
      console.log(photos);
      if (!photos || photos.length === 0) {
        alert("Nessuna immagine trovata, riprova con un'altra ricerca.");
        return; // blocco qui, non eseguo il resto
      }

      // se ci sono foto, allora procedo
      // mando la funzione per eliminare le card
      eliminateCard();
      // mando la funzione per generare le nuove card
      photos.forEach((photo) => generateCard(photo));
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    })
    .finally(() => {
      isLoading(false, id);
    });
};

// button per il primo load
btnLoad.addEventListener("click", () => {
  const id = "firstSpinner";
  isLoading(true, id);
  const URL = "https://api.pexels.com/v1/search?query=hamsters";
  handleFetch(URL, id);
});

// button per il secondo load
btnSecondLoad.addEventListener("click", () => {
  const id = "secondSpinner";
  isLoading(true, id);
  const URL = "https://api.pexels.com/v1/search?query=tigers";
  handleFetch(URL, id);
});

// richiesta foto tramite input search
search.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = "searchSpinner";
  isLoading(true, id);
  const input = document.getElementById("search");
  console.log(input.value);
  const URL = "https://api.pexels.com/v1/search?query=" + input.value;
  handleFetch(URL, id);
  input.value = "";
});
