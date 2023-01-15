export interface NavItem {
  label: string;
  prefix: string;
  path: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
}

export function useNavBarRouteUtils() {
  const getFullRoute = (item: NavItem) => {
    return item.prefix + item.path;
  };

  return { getFullRoute };
}
