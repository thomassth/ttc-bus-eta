import { BaseBarComponents } from "./BaseBarComponents";
import { LanguageSelection } from "./LanguageSelection";

export function BottomBar({ width }: { width: number }) {
  return (
    <nav className="bottomNav">
      <BaseBarComponents width={width} />
      <LanguageSelection width={width} />
    </nav>
  );
}

export function SideBar({ width }: { width: number }) {
  return (
    <nav className="sideNav">
      <BaseBarComponents width={width} />
      <LanguageSelection width={width} />
    </nav>
  );
}
