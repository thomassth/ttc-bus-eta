import { BaseBarComponents } from "./BaseBarComponents";

export function BottomBar({ width }: { width: number }) {
  return (
    <nav className="bottomNav">
      <BaseBarComponents width={width} />
    </nav>
  );
}

export function SideBar({ width }: { width: number }) {
  return (
    <nav className="sideNav">
      <BaseBarComponents width={width} />
    </nav>
  );
}
