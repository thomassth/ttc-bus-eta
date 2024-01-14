import FavouriteEta from "../components/eta/FavouriteEta";
import Search from "./Search";

export default function Home() {
  return (
    <main className="home-page">
      <Search />
      <FavouriteEta />
    </main>
  );
}
