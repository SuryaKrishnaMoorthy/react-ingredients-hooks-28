import React, { useState } from "react";
import LoadingIndicator from '../UI/LoadingIndicator';

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    props.onAddIngredient({
      title: enteredTitle,
      amount: enteredAmount
    });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={onSubmitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={enteredTitle}
              onChange={(event) => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={enteredAmount}
              onChange={(event) => {
                setEnteredAmount(event.target.value);
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredients</button>
            {props.isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
