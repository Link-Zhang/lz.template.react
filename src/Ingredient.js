const Ingredient = ({measurement, amount, name}) =>
    <li>
        <span className="amount">{amount} </span>
        <span className="measurement">{measurement} </span>

        <span className="name">{name}</span>
    </li>;
Ingredient.displayName = 'Ingredient';
export default Ingredient;
