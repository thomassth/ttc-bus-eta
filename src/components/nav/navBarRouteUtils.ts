import useNavigate from "../../routes/navigate";

export interface NavItem {
  label: string;
  prefix: string;
  path: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
}

export function useNavBarRouteUtils() {
  const { navigate } = useNavigate();

  const handleRouteClick = (path: string) => () => {
    navigate(path);
  };

  const getFullRoute = (item: NavItem) => {
    return item.prefix + item.path;
  };

  return { handleRouteClick, getFullRoute };
}
