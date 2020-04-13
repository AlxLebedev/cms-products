import GoodsCollection from '../../Data/GoodsCollection';

test('add a new product', () => {
  const goodsCollection = new GoodsCollection();
  goodsCollection.addItem('your Soul', 100500);
  const received = goodsCollection.goods[0].name;
  const expected = 'your Soul';
  expect(received).toBe(expected);
});
