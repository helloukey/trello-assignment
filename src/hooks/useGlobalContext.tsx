import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

type Props = {};
const useGlobalContext = (props: Props) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "GlobalContext must be wrapped inside the GlobalContextProvider."
    );
  }

  return context;
};
export default useGlobalContext;
