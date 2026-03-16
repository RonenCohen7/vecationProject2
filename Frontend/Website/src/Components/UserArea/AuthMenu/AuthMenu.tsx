import { userService } from "../../../Services/UserService"



export function AuthMenu() {

    const fullName = userService.getFullName()


    return (
        <div className="AuthMenu">
           
            { fullName && (<span>Welcome {fullName}</span>)}

        </div>
    )

}

