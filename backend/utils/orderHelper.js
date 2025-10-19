export const calcItemsPrice = (items) => {
  return items.reduce((sum, it) => sum + (it.price * it.qty), 0);
};
