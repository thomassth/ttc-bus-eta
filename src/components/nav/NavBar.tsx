import { BaseBarComponents } from "./BaseBarComponents";

interface BarWidth {
  width: number;
}
export function BottomBar(props: BarWidth) {
  return (
    <nav className="bottomNav">
      <ul>
        <BaseBarComponents width={props.width} />
      </ul>
    </nav>
  );
}

export function SideBar(props: BarWidth) {
  return (
    <nav className="sideNav">
      <ul>
        <BaseBarComponents width={props.width} />
      </ul>
    </nav>
  );
}
