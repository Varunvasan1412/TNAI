import { createContext } from "react";
import type { contextType } from "./contextType";


const RsistoreContext = createContext<contextType | null>(null);

export default RsistoreContext;