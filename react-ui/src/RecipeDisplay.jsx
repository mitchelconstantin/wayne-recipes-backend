import React, {useState, useEffect} from 'react';
import MultiLineField from './MultiLineField'
import ImageUploader from './ImageUploader'
import { Link } from 'react-router-dom'

export default (props) => {
  const [recipeID, setRecipeID] = useState(props.match.params.number);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const getRecipe = async (id) =>  {
    console.log('getting recipe # ', id);
    const res = await fetch(`/api/recipes/${id}`)
    const [data] = await res.json();
    setRecipe(data);
    setLoading(false);
  }

  useEffect(() => {
    getRecipe(recipeID);
  }, []);
  // return [data, loading];
if (loading) {
  return 'loading';
}
  return (
    <div>
      <Link to={`/recipe/`}>Back to Recipe List</Link>
      <h2>{recipe['RecipeName']}</h2>
      <ImageUploader getRecipe={'wat'} recipeID={recipe.ID} image={recipe.Picture}/>
      <table style={{
        border: '1px solid black', textAlign: 'left', display: 'flex',
        flexDirection: 'column'
      }}>
        <tbody>
          {recipe.Source ?
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
  );
}