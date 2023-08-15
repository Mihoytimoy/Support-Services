"use client";
import { Provider } from "react-redux";
import SignIn from "./components/signin";
import { store } from "./store";

export default function Login() {
  return (
    <>
      <Provider store={store}>
        <SignIn />
      </Provider>
    </>
  )
}
