import { useContext } from "react";
import { AuthContext } from "../contextAPI/AuthContext";

export const useAuth = () => useContext(AuthContext);

