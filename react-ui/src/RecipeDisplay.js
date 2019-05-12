import React, { Fragment } from 'react';
import MultiLineField from './MultiLineField.js'
const RecipeDisplay = (
  { recipe, goToRecipes }
) => {
  console.log('recipe', recipe['Directions']);
  return (
    <div>
      <button onClick={goToRecipes} >Return to Recipes</button>
      <p>{recipe['RecipeName']}</p>
      <div><p >
        <img src="http://4.bp.blogspot.com/-1PPIpuTPnPY/UCudijf1DPI/AAAAAAAABgY/Ohzq0co9uyk/s1600/generic.jpg" style={{ height: '200px', width: '200px', border: '1px' }} /></p>
        {/* {recipe['Source'] ? <div>{'from: ' + recipe['Source']}</div> : null} */}
        {/* <div>{'serves ' + recipe['Serves']}</div> */}
        {/* <MultiLineField title={'Ingredients'} lines={recipe['Ingredients']} /> */}
      </div>

      <table style={{
        border: '1px solid black', textAlign: 'left', display: 'flex',
        flexDirection: 'column'
      }}>
        <tbody>
          {recipe['Source'] ?
            <tr>
              <th>{'from'}</th>
              <td>{recipe['Source']}</td>
            </tr>
            : null}
          <tr>
            <th>{'serves'}</th>
            <td>{recipe['Serves']}</td>
          </tr>
          <tr>
            <th>{'ingredients'}</th>
            <td><MultiLineField lines={recipe['Ingredients']} /></td>
          </tr>
          <tr>
            <th>{'Directions'}</th>
            <td><MultiLineField lines={recipe['Directions']} /></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
};

export default RecipeDisplay;

// {/* <table>
// <tbody>
//   <tr>
//     <th>Directions</th>
//     <th>ID</th>
//     <th>Ingredient</th>
//     <th>MainIngredient</th>
//     <th>NetCarbs</th>
//     <th>Picture</th>
//     <th>RecipeName</th>
//     <th>RecipeType</th>
//     <th>Region</th>
//     <th>Selected</th>
//     <th>Serves</th>
//     <th>Source</th>
//   </tr>
//   <tr>
//     <td>{recipe['Directions']}</td>
//     <td>{recipe['ID']}</td>
//     <td>{recipe['Ingredients']}</td>
//     <td>{recipe['MainIngredient']}</td>
//     <td>{recipe['NetCarbs']}</td>
//     {/* <td>{recipe['Picture']}</td> */}
//     <td><img src="http://4.bp.blogspot.com/-1PPIpuTPnPY/UCudijf1DPI/AAAAAAAABgY/Ohzq0co9uyk/s1600/generic.jpg" /> </td>
//     <td>{recipe['RecipeName']}</td>
//     <td>{recipe['RecipeType']}</td>
//     <td>{recipe['Region']}</td>
//     <td>{recipe['Selected']}</td>
//     <td>{recipe['Serves']}</td>
//     <td>{recipe['Source']}</td>
//   </tr>
// </tbody>
// </table> */}