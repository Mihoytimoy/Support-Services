import React from "react";

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
