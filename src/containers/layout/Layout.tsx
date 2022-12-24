import { useEffect } from "react";
import { history } from "../..";

export default function Layout() {
  
  useEffect(() => {
    // Accessing history object is possible outside the react-components.
    history.push("/hello-world");
  }, []);

  return <div>Layout</div>;
}
