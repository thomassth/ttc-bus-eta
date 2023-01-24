import { BaseBarComponents } from "./BaseBarComponents";

export function BottomBar({ width }: { width: number }) {
  return (
    <nav className="bottomNav">
      <ul>
        <BaseBarComponents width={width} />
      </ul>
    </nav>
  );
}

export function SideBar({ width }: { width: number }) {
  return (
    <nav className="sideNav">
      <ul>
        <BaseBarComponents width={width} />
      </ul>
    </nav>
  );
}
