import ProductConstructor from './ProductConstructor';

export default class Goods {
  constructor() {
    this.goods = [];
  }

  addItem(name, price) {
    const id = this.goods.length;
    const newProduct = new ProductConstructor(id, name, price);
    this.goods.push(newProduct);
  }
}
