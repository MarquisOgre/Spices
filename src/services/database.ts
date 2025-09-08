import { MasterIngredient, RecipeWithIngredients, RecipeIngredient, NewRecipe, NewIngredient } from '@/types/recipe';
import { mockMasterIngredients, mockRecipes } from '@/data/mockData';

// Simple local storage for demo purposes
let ingredients = [...mockMasterIngredients];
let recipes = [...mockRecipes];

export type { MasterIngredient, RecipeWithIngredients, RecipeIngredient, NewRecipe, NewIngredient };

export const getAllIngredients = async (): Promise<Pick<MasterIngredient, 'name' | 'brand' | 'price_per_kg'>[]> => {
  return ingredients.map(ing => ({
    name: ing.name,
    brand: ing.brand,
    price_per_kg: ing.price_per_kg
  }));
};

export const fetchMasterIngredients = async (): Promise<MasterIngredient[]> => {
  return [...ingredients];
};

export const fetchRecipesWithIngredients = async (): Promise<RecipeWithIngredients[]> => {
  return [...recipes];
};

export const calculateSellingPrice = (finalCost: number): number => {
  return finalCost * 2; // Simplified markup
};

export const calculateIngredientCost = (
  ingredient: RecipeIngredient,
  masterIngredients: MasterIngredient[]
): number => {
  const masterIngredient = masterIngredients.find(mi => mi.name === ingredient.ingredient_name);
  if (!masterIngredient) return 0;

  const pricePerKg = masterIngredient.price_per_kg;
  let quantityInKg = ingredient.quantity;

  if (ingredient.unit === 'g') {
    quantityInKg = ingredient.quantity / 1000;
  } else if (ingredient.unit === 'ml') {
    quantityInKg = ingredient.quantity / 1000;
  }

  return quantityInKg * pricePerKg;
};

export const calculateIngredientCostFromPartial = (
  ingredient: NewIngredient,
  masterIngredients: MasterIngredient[]
): number => {
  const masterIngredient = masterIngredients.find(mi => mi.name === ingredient.ingredient_name);
  if (!masterIngredient) return 0;

  const pricePerKg = masterIngredient.price_per_kg;
  let quantityInKg = ingredient.quantity;

  if (ingredient.unit === 'g') {
    quantityInKg = ingredient.quantity / 1000;
  } else if (ingredient.unit === 'ml') {
    quantityInKg = ingredient.quantity / 1000;
  }

  return quantityInKg * pricePerKg;
};

export const calculateRecipeCost = (
  recipe: RecipeWithIngredients,
  masterIngredients: MasterIngredient[]
): { totalCost: number; finalCost: number } => {
  const totalCost = recipe.ingredients.reduce((sum, ingredient) => {
    return sum + calculateIngredientCost(ingredient, masterIngredients);
  }, 0);

  const finalCost = totalCost + recipe.overheads;
  return { totalCost, finalCost };
};

export const addMasterIngredient = async (
  name: string,
  pricePerKg: number,
  brand?: string
): Promise<void> => {
  const newIngredient: MasterIngredient = {
    id: Date.now().toString(),
    name,
    price_per_kg: pricePerKg,
    brand,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  ingredients.push(newIngredient);
};

export const updateMasterIngredient = async (
  id: string,
  pricePerKg: number,
  brand?: string
): Promise<void> => {
  const index = ingredients.findIndex(ing => ing.id === id);
  if (index !== -1) {
    ingredients[index] = {
      ...ingredients[index],
      price_per_kg: pricePerKg,
      brand,
      updated_at: new Date().toISOString()
    };
  }
};

export const upsertMasterIngredient = async (
  name: string,
  pricePerKg: number,
  brand?: string
): Promise<void> => {
  const existing = ingredients.find(ing => ing.name === name);
  if (existing) {
    await updateMasterIngredient(existing.id, pricePerKg, brand);
  } else {
    await addMasterIngredient(name, pricePerKg, brand);
  }
};

export const updateMasterIngredientPrice = async (
  id: string,
  pricePerKg: number
): Promise<void> => {
  const index = ingredients.findIndex(ing => ing.id === id);
  if (index !== -1) {
    ingredients[index] = {
      ...ingredients[index],
      price_per_kg: pricePerKg,
      updated_at: new Date().toISOString()
    };
  }
};

export const deleteMasterIngredient = async (id: string): Promise<void> => {
  ingredients = ingredients.filter(ing => ing.id !== id);
};

export const addRecipeWithIngredients = async (
  recipe: NewRecipe,
  ingredientsList: NewIngredient[],
  masterIngredients: MasterIngredient[]
): Promise<void> => {
  const totalCost = ingredientsList.reduce((sum, ingredient) => {
    return sum + calculateIngredientCostFromPartial(ingredient, masterIngredients);
  }, 0);

  const finalCost = totalCost + recipe.overheads;
  const sellingPrice = calculateSellingPrice(finalCost);

  const newRecipe: RecipeWithIngredients = {
    id: Date.now().toString(),
    ...recipe,
    selling_price: sellingPrice,
    is_hidden: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ingredients: ingredientsList.map((ingredient, index) => ({
      id: `${Date.now()}-${index}`,
      recipe_id: Date.now().toString(),
      ingredient_name: ingredient.ingredient_name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      created_at: new Date().toISOString()
    }))
  };

  recipes.push(newRecipe);
};

export const updateRecipeVisibility = async (
  recipeId: string,
  isHidden: boolean
): Promise<void> => {
  const index = recipes.findIndex(recipe => recipe.id === recipeId);
  if (index !== -1) {
    recipes[index] = {
      ...recipes[index],
      is_hidden: isHidden,
      updated_at: new Date().toISOString()
    };
  }
};