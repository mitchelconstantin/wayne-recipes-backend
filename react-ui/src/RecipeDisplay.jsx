import React from 'react';
import MultiLineField from './MultiLineField'
import ImageUploader from './ImageUploader'

export default (props) => {
  // console.log('recipe props', props);
  return (
    <div>
      <button onClick={props.goToRecipes} >Return to Recipes</button>
      <p>{props.recipe['props.RecipeName']}</p>
      <ImageUploader getRecipe={props.getRecipe} recipeID={props.recipe.ID} image={props.recipe.Picture}/>
      <table style={{
        border: '1px solid black', textAlign: 'left', display: 'flex',
        flexDirection: 'column'
      }}>
        <tbody>
          {props.recipe.Source ?
            <tr>
              <th>{'from'}</th>
              <td>{props.recipe['Source']}</td>
            </tr>
            : null}
          <tr>
            <th>{'serves'}</th>
            <td>{props.recipe['Serves']}</td>
          </tr>
          <tr>
            <th>{'ingredients'}</th>
            <td><MultiLineField lines={props.recipe['Ingredients']} /></td>
          </tr>
          <tr>
            <th>{'Directions'}</th>
            <td><MultiLineField lines={props.recipe['Directions']} /></td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}