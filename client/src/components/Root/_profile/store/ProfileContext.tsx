import { User } from "@/shared/types/User";
import { createContext, useContext } from "react";

export const ProfileContext = createContext<User | undefined>(undefined);

export const useProfile = () => useContext(ProfileContext);
