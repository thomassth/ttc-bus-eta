import { BaseBarComponents } from "./BaseBarComponents";

export function BottomBar({ width }: { width: number }) {
  return width < 800 ? (
    <nav className="bottomNav">
      <BaseBarComponents width={width} />
    </nav>
  ) : null;
}

export function SideBar({ width }: { width: number }) {
  return width >= 800 ? (
    <nav className="sideNav">
      <BaseBarComponents width={width} />
    </nav>
  ) : null;
}
