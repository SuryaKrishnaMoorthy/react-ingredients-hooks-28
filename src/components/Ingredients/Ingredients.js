import React, { useState, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      "https://react-ingredients-hooks-28-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setIngredients((prevState) => [
          ...prevState,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(
      `https://react-ingredients-hooks-28-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        setIngredients((prevState) =>
          prevState.filter((ingredient) => ingredient.id !== id)
        );
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        isLoading={isLoading}
        onAddIngredient={addIngredientHandler}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
