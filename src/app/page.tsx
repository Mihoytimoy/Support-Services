"use client";
import { Provider } from "react-redux";
import SignIn from "./components/signin";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function Login() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SignIn />
        </PersistGate>
      </Provider>
    </>
  )
}
