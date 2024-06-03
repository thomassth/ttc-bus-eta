import { BaseBarComponents } from "./BaseBarComponents.js";
import style from "./NavBar.module.css";

export function NavBar({ width }: { width: number }) {
  return (
    <nav
      className={
        width >= 800
          ? `${style["nav-bar"]} ${style["side-nav"]}`
          : `${style["nav-bar"]} ${style["bottom-nav"]}`
      }
    >
      <BaseBarComponents width={width} />
    </nav>
  );
}
