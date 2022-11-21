import sendData from "./api";
import Pristine from "pristinejs/dist/pristine";

const isEmpty = str => !str.trim().length

const form = document.querySelector("#form")
const field = form.querySelector("#phone")
const button = form.querySelector('#button')

const fieldValidator = () => {
  if (isEmpty(field.value)) {
    return false
  }
  return true
}

const pristine = new Pristine(form)

pristine.addValidator(field, fieldValidator, 'Поле не может быть пустым', 1, false)

const blockButton = () => {
  button.disabled = true;
  button.textContent = 'Отправка...';
};

const unblockButton = () => {
  button.disabled = false;
  button.textContent = 'Заказать';
};

const onUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockButton()
      sendData(() =>{
          onSuccess()
          unblockButton()
        },
        () => {
          onFail()
          unblockButton()
        },
        new FormData(form)
      );
    } else {
      onFail()
    }
  });
};

export default onUserFormSubmit;
