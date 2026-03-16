
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";





export function AuthMenu() {

   const user = useSelector((state: RootState) => state.user)



    return (
        <div className="AuthMenu">
            {user && (
                <span>Welcome {user.firstName} {user.lastName}</span>
            )}
           

        </div>
    )

}

