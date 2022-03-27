
inputName.addEventListener('input', evt =>{
  console.log(evt.target.validity.valid);
})

const showInputError = (item) => {
  item.classList.add('item_type_wrong');
}

const hideInputError = (item) => {
  item.classList.remove('item_type_wrong');
}

const isValid = () => {
  if (!inputName.validity.valid) {
      showInputError(inputName);
  } else {
      hideInputError(inputName);
  }
};
