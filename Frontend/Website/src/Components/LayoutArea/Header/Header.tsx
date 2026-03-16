import { AuthMenu } from "../../UserArea/AuthMenu/AuthMenu";
import "./Header.css";

export function Header() {
    return (
        <div className="Header">
           <h1>Find Your Dream Vacation</h1>
           <AuthMenu />

        </div>
    );
}
