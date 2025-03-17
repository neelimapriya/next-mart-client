import { Store, Dispatch, Action } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addProduct, decrementOrderQuantity, fetchCoupon, incrementOrderQuantity, removeProduct, subTotalSelector } from "../features/cartSlice";

export const couponMiddleware =
  (store: Store) => (next: Dispatch) => (action: Action) => {
    if (
      action.type === addProduct.type ||
      action.type === incrementOrderQuantity.type ||
      action.type === decrementOrderQuantity.type ||
      action.type === removeProduct.type
    ) {
      next(action);

      const state: RootState = store.getState();

      const subTotal = subTotalSelector(state);

      store.dispatch(
        fetchCoupon({
          couponCode: state.cart.coupon.code,
          subTotal: subTotal,
          shopId: state.cart.shopId,
        }) as unknown as Action
      );
    } else {
      next(action);
    }
  };