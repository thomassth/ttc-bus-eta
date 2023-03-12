import { BaseBarComponents } from "./BaseBarComponents";

export function NavBar({ width }: { width: number }) {
  return (
    <nav className={width >= 800 ? "sideNav" : "bottomNav"}>
      <BaseBarComponents width={width} />
    </nav>
  );
}
