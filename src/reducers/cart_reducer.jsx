import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

// const cart_reducer = (state, action) => {
//   if (action.type === ADD_TO_CART) {
//     const { id, fields } = action.payload;
//     const tempItem = state.cart.find((i) => i.id === id + color);
//     if (tempItem) {
//       const tempCart = state.cart.map((cartItem) => {
//         if (cartItem.id === id + color) {
//           let newAmount = cartItem.amount + amount;
//           if (newAmount > cartItem.max) {
//             newAmount = cartItem.max;
//           }
//           return { ...cartItem, amount: newAmount };
//         } else {
//           return cartItem;
//         }
//       });
//       return { ...state, cart: tempCart };
//     } else {
//       const newItem = {
//         id: id + color,
//         name: product.name,
//         color,
//         amount,
//         image: product.images[0].url,
//         price: product.price,
//         max: product.stock,
//       };
//       return { ...state, cart: [...state.cart, newItem] };
//     }
//   }
//   if (action.type === REMOVE_CART_ITEM) {
//     const tempCart = state.cart.filter((item) => item.id !== action.payload);
//     return { ...state, cart: tempCart };
//   }
//   if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
//     const { id, value } = action.payload;
//     const tempCart = state.cart.map((item) => {
//       if (item.id === id) {
//         if (value === 'inc') {
//           let newAmount = item.amount + 1;
//           if (newAmount > item.max) {
//             newAmount = item.max;
//           }
//           return { ...item, amount: newAmount };
//         }
//         if (value === 'dec') {
//           let newAmount = item.amount - 1;
//           if (newAmount < 1) {
//             newAmount = 1;
//           }
//           return { ...item, amount: newAmount };
//         }
//       }
//       return item;
//     });
//     return { ...state, cart: tempCart };
//   }
//   if (action.type === CLEAR_CART) {
//     return { ...state, cart: [] };
//   }
//   if (action.type === COUNT_CART_TOTALS) {
//     const { total_items, total_amount } = state.cart.reduce(
//       (total, cartItem) => {
//         const { amount, price } = cartItem;
//         total.total_items += amount;
//         total.total_amount += price * amount;
//         return total;
//       },
//       { total_items: 0, total_amount: 0 }
//     );
//     return { ...state, total_items, total_amount };
//   }
//   throw new Error(`No Matching "${action.type}" - action type`);
// };

// export default cart_reducer;

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, product, amount, color } = action.payload;
      const { name, images, price, stock } = product.fields; // assuming fields contains product details

      // Check if item with the same id and color already exists in the cart
      const tempItem = state.cart.find((item) => item.id === id + color);
      let normalPrice = price / 100;
      if (tempItem) {
        // Update the quantity if the item is already in the cart
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });
        return { ...state, cart: tempCart };
      } else {
        // Add a new item to the cart
        const newItem = {
          id: id + color,
          name,
          color,
          amount,
          image: images[0].url,
          normalPrice,
          max: stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempCart };
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      return { ...state, cart: tempCart };
    }

    case CLEAR_CART: {
      return { ...state, cart: [] };
    }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, normalPrice } = cartItem;
          total.total_amount += normalPrice * amount;
          return total;
        },
        { total_items: state.cart.length, total_amount: 0 }
      );
      return { ...state, total_items, total_amount };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
