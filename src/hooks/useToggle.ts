import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toogle = () => {
    setValue(!value);
  };

  return [value, toogle] as const;
};
