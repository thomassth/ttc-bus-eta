import { Anchor, Nav } from "grommet";

const navItems = [
  {
    label: "Home",
    href: `${process.env.PUBLIC_URL}/`,
  },
  {
    label: "Lines",
    href: `${process.env.PUBLIC_URL}/lines`,
  },
  {
    label: "About",
    href: `${process.env.PUBLIC_URL}/about`,
  },
];

export const BottomBar = () => {
  const nav: JSX.Element[] = [];
  navItems.forEach((item, index) => {
    if (item.href === window.location.pathname) {
      nav.push(
        <Anchor
          key={index}
          href={item.href}
          label={item.label}
          className="active"
        />
      );
    } else {
      nav.push(<Anchor key={index} label={item.label} href={item.href} />);
    }
  });
  return (
    <Nav className="bottomNav" gap="medium" direction="row">
      {nav}
    </Nav>
  );
};
