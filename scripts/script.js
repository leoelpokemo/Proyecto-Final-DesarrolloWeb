console.log("Hello world");

// ========== Datos iniciales ==========
// Array de objetos que representan las tarjetas iniciales con sus imágenes y nombres
const cards = [
  {
    image:
      "https://img.freepik.com/foto-gratis/perro-pug-aislado-sobre-fondo-blanco_2829-11416.jpg?semt=ais_hybrid&w=740&q=80",
    name: "Hola",
  },
  {
    image:
      "https://www.tiendanimal.es/articulos/wp-content/uploads/2024/03/caracteristicas-cuidados-golden-retriever.jpg",
    name: "Como",
  },
  {
    image:
      "https://images.pexels.com/phothttps://i.pinimg.com/736x/07/39/3e/07393ee5bd2e2751e1012994182d42c8.jpg",
    name: "Estas",
  },
];

// ========== Selección de Elementos ==========
// Selecciona el contenedor de la lista de tarjetas
const placesGalleryList = document.querySelector(".places-gallery__list");
// Selecciona el modal para añadir nuevos lugares
const modalNewPlace = document.querySelector("#modal-new-place");
// Selecciona el modal de edición de perfil
const modalProfile = document.querySelector("#modal-id-profile");
// Obtiene todos los botones de cierre de modales y los convierte en array
const modalsCloseButtons = Array.from(
  document.querySelectorAll(".modal__close")
);
// Selecciona el botón para añadir nuevo lugar
const addPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
// Selecciona el botón para editar el perfil
const travelerProfileEditBtn = document.querySelector(
  ".traveler-profile__edit-btn"
);
// Selecciona el contenedor de detalles del perfil
const profileDetails = document.querySelector(".traveler-profile__details");
// Selecciona el elemento del nombre del perfil
const profileName = profileDetails.querySelector(".traveler-profile__name");
// Selecciona el formulario para añadir nuevo lugar
const formNewPlace = document.querySelector("#form-new-place");
// Selecciona el formulario para editar perfil
const formEditProfile = document.querySelector("#form-edit-profile");
// Selecciona todos los formularios dentro de modales
const modalsForms = document.querySelectorAll(".modal__form");

// Modal de imagen
// Selecciona el modal para visualización de imágenes
const modalImageView = document.querySelector("#modal-image-view");
// Selecciona la imagen dentro del modal de visualización
const modalImage = modalImageView.querySelector(".modal__image");
// Selecciona el pie de foto dentro del modal de visualización
const modalCaption = modalImageView.querySelector(".modal__caption");

// ========== Función para validar si el botón debe estar deshabilitado ==========
// Función que verifica si algún input no es válido
function validarButton(inputs) {
  return inputs.some((input) => !input.validity.valid);
}

// ========== Validación de inputs en todos los formularios ==========
// Itera sobre todos los formularios de modales para configurar validación
modalsForms.forEach((modalForm) => {
  // Obtiene el botón de envío del formulario actual
  const modalButton = modalForm.querySelector(".modal__submit");
  // Obtiene todos los inputs del formulario y los convierte en array
  const modalinputs = Array.from(modalForm.querySelectorAll(".modal__input"));

  // Estado inicial del botón
  // Deshabilita el botón si algún input no es válido
  modalButton.disabled = validarButton(modalinputs);

  // Escuchar cambios en cada input
  // Añade event listener a cada input para validación en tiempo real
  modalinputs.forEach((modalinput) => {
    modalinput.addEventListener("input", () => {
      // Actualiza el estado del botón basado en la validación
      modalButton.disabled = validarButton(modalinputs);

      // Obtiene el elemento de error correspondiente al input
      let modalError = modalForm.querySelector(`#${modalinput.id}-error`);
      // Si el input no es válido, muestra el mensaje de error
      if (!modalinput.validity.valid) {
        modalError.textContent = modalinput.validationMessage;
        modalError.classList.add("modal__error_visible");
      } else {
        // Si es válido, oculta el mensaje de error
        modalError.textContent = "";
        modalError.classList.remove("modal__error_visible");
      }
    });
  });
});

// ========== Habilitar vista previa de imágenes ==========
// Función que permite abrir una imagen en el modal de visualización
function enableImagePreview(image, title) {
  image.addEventListener("click", () => {
    // Establece la fuente y texto alternativo de la imagen en el modal
    modalImage.src = image.src;
    modalImage.alt = title.textContent;
    // Establece el pie de foto en el modal
    modalCaption.textContent = title.textContent;
    // Muestra el modal de visualización
    modalImageView.classList.add("modal_is-opened");
  });
}

// ========== Función para Agregar una Tarjeta ==========
// Función que crea y añade una nueva tarjeta al DOM
const addCard = (card) => {
  // Clona el template de la tarjeta
  const template = document
    .querySelector("#template-place-card")
    .content.cloneNode(true);

  // Selecciona los elementos dentro del template clonado
  const image = template.querySelector(".place-card__image");
  const title = template.querySelector(".place-card__title");
  const deleteButton = template.querySelector(".place-card__delete-button");
  const likeButton = template.querySelector(".place-card__like-button");

  // Establece los valores de la tarjeta con los datos proporcionados
  image.src = card.image;
  image.alt = card.name;
  title.textContent = card.name;

  // Eliminar tarjeta
  // Añade funcionalidad al botón de eliminar tarjeta
  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".place-card").remove();
  });

  // Dar like
  // Añade funcionalidad al botón de like
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("place-card__like-button_active");
    console.log(`Te ha gustado: ${card.name}`);
  });

  // Vista previa de imagen
  // Habilita la vista previa de la imagen al hacer clic
  enableImagePreview(image, title);

  // Añade la tarjeta al contenedor de la galería
  placesGalleryList.appendChild(template);
};

// ========== Renderizar Tarjetas Iniciales ==========
// Itera sobre el array de tarjetas iniciales y las añade al DOM
cards.forEach(addCard);

// ========== Abrir modales ==========
// Abre el modal de edición de perfil al hacer clic en el botón correspondiente
travelerProfileEditBtn.addEventListener("click", () => {
  modalProfile.classList.add("modal_is-opened");
});

// Abre el modal para añadir nuevo lugar al hacer clic en el botón correspondiente
addPlaceBtn.addEventListener("click", () => {
  modalNewPlace.classList.add("modal_is-opened");
});

// ========== Cerrar modales con botón ==========
// Añade funcionalidad a todos los botones de cierre de modales
modalsCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const modal = evt.target.closest(".modal");
    modal.classList.remove("modal_is-opened");
  });
});

// ========== Cerrar modales con Escape ==========
// Cierra el modal abierto al presionar la tecla Escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      openedModal.classList.remove("modal_is-opened");
    }
  }
});

// ========== Cerrar modales clic fuera ==========
// Cierra el modal al hacer clic fuera del contenido del modal
document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("modal") &&
    evt.target.classList.contains("modal_is-opened")
  ) {
    evt.target.classList.remove("modal_is-opened");
  }
});

// ========== Guardar cambios de perfil ==========
// Maneja el envío del formulario de edición de perfil
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Obtiene los valores de los inputs del formulario
  const nameInput = document.querySelector("#profile-name");
  const descInput = document.querySelector("#profile-description");

  // Actualiza los valores del perfil con los nuevos valores
  profileName.textContent = nameInput.value;
  profileDetails.querySelector(".traveler-profile__bio").textContent =
    descInput.value;

  // Cierra el modal y resetea el formulario
  modalProfile.classList.remove("modal_is-opened");
  formEditProfile.reset();
});

// ========== Crear nuevo lugar ==========
// Maneja el envío del formulario para crear nuevo lugar
formNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Obtiene los valores de los inputs del formulario
  const titleInput = document.querySelector("#place-title");
  const imageInput = document.querySelector("#place-image-url");

  // Crea un objeto con los datos del nuevo lugar
  const newCard = {
    name: titleInput.value,
    image: imageInput.value,
  };

  // Añade la nueva tarjeta al DOM
  addCard(newCard);

  // Cierra el modal y resetea el formulario
  modalNewPlace.classList.remove("modal_is-opened");
  formNewPlace.reset();
});

// ========== Nombre inicial del perfil ==========
// Establece el nombre inicial del perfil
profileName.textContent = "Leonardo Bobadilla";
