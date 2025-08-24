console.log("Hello world");

// ========== Datos iniciales ==========
const cards = [
  {
    image: "https://img.freepik.com/foto-gratis/perro-pug-aislado-sobre-fondo-blanco_2829-11416.jpg?semt=ais_hybrid&w=740&q=80",
    name: "Hola",
  },
  {
    image: "https://www.tiendanimal.es/articulos/wp-content/uploads/2024/03/caracteristicas-cuidados-golden-retriever.jpg",
    name: "Como",
  },
  {
    image: "https://images.pexels.com/phothttps://i.pinimg.com/736x/07/39/3e/07393ee5bd2e2751e1012994182d42c8.jpg",
    name: "Estas",
  },
];

// ========== Selección de Elementos ==========
const placesGalleryList = document.querySelector(".places-gallery__list");
const modalNewPlace = document.querySelector("#modal-new-place");
const modalProfile = document.querySelector("#modal-id-profile");
const modalsCloseButtons = Array.from(document.querySelectorAll(".modal__close"));
const addPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const travelerProfileEditBtn = document.querySelector(".traveler-profile__edit-btn");
const profileDetails = document.querySelector(".traveler-profile__details");
const profileName = profileDetails.querySelector(".traveler-profile__name");
const formNewPlace = document.querySelector("#form-new-place");
const formEditProfile = document.querySelector("#form-edit-profile");
const modalsForms = document.querySelectorAll(".modal__form");

// Modal de imagen
const modalImageView = document.querySelector("#modal-image-view");
const modalImage = modalImageView.querySelector(".modal__image");
const modalCaption = modalImageView.querySelector(".modal__caption");

// ========== Función para validar si el botón debe estar deshabilitado ==========
function validarButton(inputs) {
  return inputs.some(input => !input.validity.valid);
}

// ========== Validación de inputs en todos los formularios ==========
modalsForms.forEach((modalForm) => {
  const modalButton = modalForm.querySelector(".modal__submit");
  const modalinputs = Array.from(modalForm.querySelectorAll(".modal__input"));

  // Estado inicial del botón
  modalButton.disabled = validarButton(modalinputs);

  // Escuchar cambios en cada input
  modalinputs.forEach((modalinput) => {
    modalinput.addEventListener("input", () => {
      modalButton.disabled = validarButton(modalinputs);

      let modalError = modalForm.querySelector(`#${modalinput.id}-error`);
      if (!modalinput.validity.valid) {
        modalError.textContent = modalinput.validationMessage;
        modalError.classList.add("modal__error_visible");
      } else {
        modalError.textContent = "";
        modalError.classList.remove("modal__error_visible");
      }
    });
  });
});

// ========== Habilitar vista previa de imágenes ==========
function enableImagePreview(image, title) {
  image.addEventListener("click", () => {
    modalImage.src = image.src;
    modalImage.alt = title.textContent;
    modalCaption.textContent = title.textContent;
    modalImageView.classList.add("modal_is-opened");
  });
}

// ========== Función para Agregar una Tarjeta ==========
const addCard = (card) => {
  const template = document
    .querySelector("#template-place-card")
    .content
    .cloneNode(true);

  const image = template.querySelector(".place-card__image");
  const title = template.querySelector(".place-card__title");
  const deleteButton = template.querySelector(".place-card__delete-button");
  const likeButton = template.querySelector(".place-card__like-button");

  image.src = card.image;
  image.alt = card.name;
  title.textContent = card.name;

  // Eliminar tarjeta
  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".place-card").remove();
  });

  // Dar like
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("place-card__like-button_active"); 
    console.log(`Te ha gustado: ${card.name}`);
  });

  // Vista previa de imagen
  enableImagePreview(image, title);

  placesGalleryList.appendChild(template);
};

// ========== Renderizar Tarjetas Iniciales ==========
cards.forEach(addCard);

// ========== Abrir modales ==========
travelerProfileEditBtn.addEventListener("click", () => {
  modalProfile.classList.add("modal_is-opened");
});

addPlaceBtn.addEventListener("click", () => {
  modalNewPlace.classList.add("modal_is-opened");
});

// ========== Cerrar modales con botón ==========
modalsCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const modal = evt.target.closest(".modal");
    modal.classList.remove("modal_is-opened");
  });
});

// ========== Cerrar modales con Escape ==========
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      openedModal.classList.remove("modal_is-opened");
    }
  }
});

// ========== Cerrar modales clic fuera ==========
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("modal") && evt.target.classList.contains("modal_is-opened")) {
    evt.target.classList.remove("modal_is-opened");
  }
});

// ========== Guardar cambios de perfil ==========
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const nameInput = document.querySelector("#profile-name");
  const descInput = document.querySelector("#profile-description");

  profileName.textContent = nameInput.value;
  profileDetails.querySelector(".traveler-profile__bio").textContent = descInput.value;

  modalProfile.classList.remove("modal_is-opened");
  formEditProfile.reset();
});

// ========== Crear nuevo lugar ==========
formNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const titleInput = document.querySelector("#place-title");
  const imageInput = document.querySelector("#place-image-url");

  const newCard = {
    name: titleInput.value,
    image: imageInput.value
  };

  addCard(newCard);

  modalNewPlace.classList.remove("modal_is-opened");
  formNewPlace.reset();
});

// ========== Nombre inicial del perfil ==========
profileName.textContent = "Leonardo Bobadilla";