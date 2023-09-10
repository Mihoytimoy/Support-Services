import React from "react";

//use this function if you have a state setter to only run once
// pass the function and its parameters as props to this function call
export default function runOnce(props:any) {
  const useInit = (initCallback: () => void) => {
    const [initialized, setInitialized] = React.useState(false);
    if(!initialized) {
      initCallback()
      setInitialized(true);
    }
  };

  useInit(() => {
    props();
  })
}
