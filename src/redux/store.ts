import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart';
import ordersReducer from './slices/orders';
import favsReducer from './slices/favorites';
import sneakersReducer from './slices/sneakers';
import filtersReducer from './slices/filters';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    favorites: favsReducer,
    sneakers: sneakersReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;