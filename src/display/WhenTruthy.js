import {Children} from "react";

const WhenTruthy = ({children}) => Children.only(children);

export default WhenTruthy;
