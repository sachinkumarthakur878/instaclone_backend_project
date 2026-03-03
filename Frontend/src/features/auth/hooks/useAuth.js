import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

// custom hook to access the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}