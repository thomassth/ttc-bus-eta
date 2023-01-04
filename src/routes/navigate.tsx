import { useNavigate as useNav } from "react-router-dom";

export default function useNavigate() {
  const nav = useNav();

  const navigate = (input: string) => {
    console.log("navigating to", input);
    nav(input);
  };

  return {
    navigate,
  };
}
