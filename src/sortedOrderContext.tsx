import { createContext } from "react";
import { PostOrder } from "./enums";

const SortedOrderContext = createContext(PostOrder.INCREASING);

export default SortedOrderContext;
