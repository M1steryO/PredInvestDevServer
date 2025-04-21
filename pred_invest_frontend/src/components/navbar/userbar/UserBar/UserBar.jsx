import AccountBar from "./AccountBar/AccountBar";
import UnauthorizedBar from "./UnauthorizedBar/UnauthorizedBar";

export default function UserBar({isAuthorized, userName}) {
    return isAuthorized ? (
        <AccountBar userName={userName}/>
    ) : (
        <UnauthorizedBar/>
    );
}
