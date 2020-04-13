/* eslint-disable class-methods-use-this */
export default class Popovers {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.popover = document.createElement('div');
    this.sProduct = '';
  }

  get markup() {
    return `
      <p>Name</p>
      <input type="text" id="inpText" class="input" value="">
      <p>Price</p>
      <input type="number" id="inpPrise" class="input" value="" min="1">        <div class="buttons">
        <div id="pSave" class="button">Save</div>
        <div id="pCancel" class="button">Cancel</div>
      </div>
    `;
  }

  addErrorElement(parentElement) {
    const errorElement = document.createElement('div');
    errorElement.id = 'form-error';
    errorElement.className = 'form-error hidden';
    errorElement.textContent = 'Error';
    parentElement.appendChild(errorElement);
  }

  saveProduct(callback) {
    this.sProduct = callback;
  }

  bindToDOM() {
    this.popover.id = 'popup';
    this.popover.className = 'popup hidden';
    this.popover.innerHTML = this.markup;
    this.addErrorElement(this.popover);
    this.parentEl.appendChild(this.popover);
    this.getElements();
    this.addListeners();
  }

  showPopover() {
    this.selectedPopover.classList.remove('hidden');
    this.selectedPopover.style.top = `${(window.innerHeight
      - this.selectedPopover.offsetHeight) / 2}px`;
    this.selectedPopover.style.left = `${(window.innerWidth
      - this.selectedPopover.offsetWidth) / 2}px`;
  }

  getElements() {
    this.selectedPopover = document.querySelector('#popup');
    this.poductName = document.getElementById('inpText');
    this.poductPrice = document.getElementById('inpPrise');
    this.saveButton = document.getElementById('pSave');
    this.cancelButton = document.getElementById('pCancel');
    this.errorForm = document.querySelector('#form-error');
  }

  addListeners() {
    this.saveButton.addEventListener('click', () => {
      if (this.poductName.value === '') {
        this.poductName.focus();
        this.showError(this.poductName, 'Enter a name of product!');
        return;
      }
      const priceValue = Number(this.poductPrice.value);
      if (priceValue <= 0) {
        this.poductPrice.focus();
        this.showError(this.poductPrice, 'Enter a price! Must be a number more then zero');
        return;
      }

      this.selectedPopover.classList.add('hidden');
      this.sProduct();
      this.clearInputFields();
    });

    this.cancelButton.addEventListener('click', () => {
      this.selectedPopover.classList.add('hidden');
      this.hidenError();
      this.clearInputFields();
    });

    this.poductName.addEventListener('input', () => {
      this.hidenError();
    });

    this.poductPrice.addEventListener('input', () => {
      this.hidenError();
    });
  }

  hidenError() {
    if (!this.errorForm.classList.contains('hidden')) {
      this.errorForm.classList.add('hidden');
    }
  }

  clearInputFields() {
    this.poductName.value = '';
    this.poductPrice.value = '';
  }

  showError(element, message) {
    this.errorForm.textContent = message;
    this.errorForm.classList.remove('hidden');
    this.errorForm.style.top = `${element.offsetTop + element.offsetHeight}px`;
    this.errorForm.style.left = `${element.offsetLeft + ((element.offsetWidth - this.errorForm.offsetWidth) / 2)}px`;
  }
}
