import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={onSubmitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" />
          </div>
          <div className="form-control">
            <button type="submit">Add Ingredients</button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default IngredientForm;
