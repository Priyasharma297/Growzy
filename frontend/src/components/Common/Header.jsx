import { TopBar } from "../Layout/TopBar"
import { NavBar } from "./NavBar"
export const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <TopBar/>
      <NavBar/>
    </header>
  )
}
