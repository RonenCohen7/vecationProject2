import { Header } from "../Header/Header.js";
import { Menu } from "../Menu/Menu.js";
import { Routing } from "../Routing/Routing.js";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>

            <nav></nav>
                <Menu />
            <main>
                
                <Routing />
            </main>
        </div>
    );
}
