import React, { useState, useCallback, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (initialState, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...initialState, action.ingredient];
    case "DELETE":
      return initialState.filter((ingredient) => ingredient.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { ...httpState, loading: true };
    case "RESPONSE":
      return { ...httpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.error };
    case "CLEAR":
      return { ...httpState, error: null };
    default:
      throw new Error("Should not reach there!");
  }
};

const Ingredients = () => {
  const [ingredients, disptach] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    disptach({ type: "SET", ingredients: filteredIngredients });
    // setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    dispatchHttp({ type: "SEND" });
    // setIsLoading(true);
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
        dispatchHttp({ type: "RESPONSE" });
        // setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        disptach({ type: "ADD", ingredient: ingredient });
        // setIngredients((prevState) => [
        //   ...prevState,
        //   { id: responseData.name, ...ingredient },
        // ]);
      });
  };

  const removeIngredientHandler = (id) => {
    dispatchHttp({ type: "SEND" });
    // setIsLoading(true);
    fetch(
      `https://react-ingredients-hooks-28-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        // setIsLoading(false);
        disptach({ type: "DELETE", id: id });
        // setIngredients((prevState) =>
        //   prevState.filter((ingredient) => ingredient.id !== id)
        // );
      })
      .catch((error) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatchHttp({ type: "ERROR", error: error.message });
        // setIsLoading(false);
        // setError(error.message);
      });
  };

  const clearError = () => {
    dispatchHttp({ type: "CLEAR" });
    // setError(null);
  };

  return (
    <div>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        isLoading={httpState.loading}
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
