// localStorage.setItem('shoppingList', JSON.stringify({newRecipe: 'ayyy'}));

export class ShoppingListBehaviors {
  static clear = () => {
    console.log('clearing the shopping list');
    localStorage.setItem('shoppingList', JSON.stringify([]))
  };

  static remove = (recipeId) => {
    const prev = this.load();
    console.log('prev', prev);
    const indexToRemove = prev.findIndex((item) => item.id === recipeId)
    prev.splice(indexToRemove, 1);
    localStorage.setItem('shoppingList', JSON.stringify(prev));
    return this.load();
  }


  static add = (recipe) => {
    console.log('here is a recipe', recipe);
    console.log('adding to shopping list');
    const listItem = { id: recipe.id, ingredients: recipe.ingredients, title: recipe.title };
    const prev = this.load();
    console.log('here is prev', prev);
    localStorage.setItem('shoppingList', JSON.stringify([...prev, listItem]));
    return this.load();
  };

  static load = () => {
    console.log('loading the shopping list');
    return JSON.parse(localStorage.getItem('shoppingList'));
  };
};

//   save = () => {
//   console.log('saving the shopping list');
//   localStorage.setItem('shoppingList', JSON.stringify({newRecipe: 'ayyy'}));
//   // localStorage.setItem('shoppingList', {...shoppingList, newRecipe: 'ayyy'});
//   // setShoppingList(shoppingList);
// };