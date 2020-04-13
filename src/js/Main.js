/* eslint-disable class-methods-use-this */
import GoodsCollection from './Data/GoodsCollection';
import defaultData from './Data/DefaultData';
import DrawUI from './UI/DrawUI';
import Popovers from './UI/Popovers';
import Confirm from './UI/Confirm';

const goodsCollection = new GoodsCollection();
const drawUI = new DrawUI();
const popover = new Popovers(document.body);
const confirm = new Confirm();

export default class Main {
  constructor() {
    this.goodsField = document.querySelector('tbody');
    this.addProductButton = document.querySelector('.add-product');
    this.id = -1;
    this.itemIndex = '';
  }

  init() {
    defaultData(goodsCollection);
    drawUI.draw(goodsCollection.goods);
    popover.bindToDOM();
    popover.saveProduct(this.saveProduct.bind(this));
    this.inpText = document.getElementById('inpText');
    this.inpPrise = document.getElementById('inpPrise');
    confirm.init();
    this.addListeners();
  }

  addListeners() {
    this.goodsField.addEventListener('click', (event) => {
      const eventClassList = event.target.classList;
      this.id = Number(event.target.closest('tr').dataset.id);
      if (eventClassList.contains('change-product')) {
        this.itemIndex = this.findProductIndex(this.id);
        this.inpText.value = goodsCollection.goods[this.itemIndex].name;
        this.inpPrise.value = goodsCollection.goods[this.itemIndex].price;
        popover.showPopover();
      }
      if (eventClassList.contains('del-product')) {
        confirm.delElement(this.delProduct.bind(this));
      }
    });

    this.addProductButton.addEventListener('click', () => {
      this.id = -1;
      popover.showPopover();
    });
  }

  delProduct() {
    goodsCollection.goods = goodsCollection.goods.filter((item) => item.id !== this.id);
    drawUI.draw(goodsCollection.goods);
  }

  saveProduct() {
    if (this.id >= 0) {
      goodsCollection.goods[this.itemIndex].name = this.inpText.value;
      goodsCollection.goods[this.itemIndex].price = Number(this.inpPrise.value);
    } else {
      goodsCollection.addItem(this.inpText.value, Number(this.inpPrise.value));
    }
    drawUI.draw(goodsCollection.goods);
  }

  findProductIndex(id) {
    return goodsCollection.goods.findIndex((item) => item.id === id);
  }
}
