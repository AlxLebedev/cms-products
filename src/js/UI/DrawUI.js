export default class DrawUI {
  constructor() {
    this.goodsField = document.querySelector('tbody');
  }

  draw(products) {
    this.goodsField.innerHTML = '';
    for (const item of products) {
      const product = document.createElement('tr');
      product.dataset.id = item.id;
      product.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td class="actions">
        <span class="change-product pointer"></span>
        <span class="del-product pointer"></span>
      </td>
      `;
      this.goodsField.appendChild(product);
    }
  }
}
