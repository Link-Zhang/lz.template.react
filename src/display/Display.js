import WhenTruthy from './WhenTruthy';
import WhenFalsy from './WhenFalsy';
import FindChild from './FindChild';

const Display = ({ifTruthy = true, children}) =>
    (ifTruthy) ?
        FindChild(children, WhenTruthy) :
        FindChild(children, WhenFalsy);

export default Display;
