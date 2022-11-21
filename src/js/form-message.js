const form = document.querySelector("#form")
const errorText = form.querySelector('#error')
const successText = form.querySelector('#success')


export const onSuccess = () => {
  successText.classList.remove('form__field-success--remove')
  setTimeout(() => {
    successText.classList.add('form__field-success--remove')
  }, 2000)
}

export const onFail = () => {
  errorText.classList.remove('form__field-error--remove')
  setTimeout(() => {
    errorText.classList.add('form__field-error--remove')
  }, 2000)
}

