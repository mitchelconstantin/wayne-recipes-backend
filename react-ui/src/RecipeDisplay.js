import React from 'react';

const RecipeDisplay = (
  {recipe, goToRecipes}
) => {
  console.log('goto',{goToRecipes});
  return (
    <div>
    <button onClick={goToRecipes} >Return to Recipes</button>
    <table>
      <tbody>
        <tr>
          <th>Directions</th>
          <th>ID</th>
          <th>MainIngredient</th>
          <th>NetCarbs</th>
          <th>Picture</th>
          <th>RecipeName</th>
          <th>RecipeType</th>
          <th>Region</th>
          <th>Selected</th>
          <th>Serves</th>
          <th>Source</th>
        </tr>
        <tr>
          <td>{recipe['Directions']}</td>
          <td>{recipe['ID']}</td>
          <td>{recipe['MainIngredient']}</td>
          <td>{recipe['NetCarbs']}</td>
          <td>{recipe['Picture']}</td>
          <td>{recipe['RecipeName']}</td>
          <td>{recipe['RecipeType']}</td>
          <td>{recipe['Region']}</td>
          <td>{recipe['Selected']}</td>
          <td>{recipe['Serves']}</td>
          <td>{recipe['Source']}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
};

export default RecipeDisplay;