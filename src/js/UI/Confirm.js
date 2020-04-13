export default class confirm {
  init() {
    const confirmForm = document.createElement('div');
    confirmForm.id = 'confirm-del';
    confirmForm.className = 'popup hidden';
    confirmForm.innerHTML = `
    <p>Delete this product?</p>
    <div class="buttons">
      <div id="ok-del" class="button">Delete</div>
      <div id="cancel-del" class="button">Cancel</div>
    </div>
    `;
    document.body.appendChild(confirmForm);
    this.deletionForm = document.getElementById('confirm-del');
    this.okButton = document.getElementById('ok-del');
    this.cancelButton = document.getElementById('cancel-del');
  }

  delElement(callback) {
    this.deletionForm.classList.remove('hidden');
    this.deletionForm.style.top = `${(window.innerHeight
      - this.deletionForm.offsetHeight) / 2}px`;
    this.deletionForm.style.left = `${(window.innerWidth
      - this.deletionForm.offsetWidth) / 2}px`;
    this.okButton.addEventListener('click', () => {
      this.deletionForm.classList.add('hidden');
      callback();
    });

    this.cancelButton.addEventListener('click', () => {
      this.deletionForm.classList.add('hidden');
    });
  }
}
