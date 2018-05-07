import {Children} from "react";

const WhenFalsy = ({children}) => Children.only(children);

export default WhenFalsy;
