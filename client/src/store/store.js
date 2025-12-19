import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import shopProductReducer from "./shop/productSlice";
import cartReducer from "./shop/cartSlice";
import addressReducer from "./shop/addressSlice";
import orderReducer from "./shop/orderSlice";
import adminOrderReducer from "./adminOrderslice";
import searchReducer from "./shop/searchSlice";
import reviewReducer from "./shop/reviewSlice";
import featureReducer from "./featureSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    shop: shopProductReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
    search: searchReducer,
    review: reviewReducer,
    feature: featureReducer,
  },
});
export default store;
