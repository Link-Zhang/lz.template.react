import {Children} from "react";

const FindChild = (children, child) =>
    Children.toArray(children).filter(c => c.type === child)[0];

export default FindChild;
