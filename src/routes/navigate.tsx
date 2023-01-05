import { useNavigate as useNav } from "react-router-dom";

export default function useNavigate() {
  const nav = useNav();

  const navigate = (input: string) => {
    nav(input);
  };

  return {
    navigate,
  };
}
