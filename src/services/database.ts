import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type MasterIngredient = Database['public']['Tables']['master_ingredients']['Row'];
export type Recipe = Database['public']['Tables']['recipes']['Row'];
export type RecipeIngredient = Database['public']['Tables']['recipe_ingredients']['Row'];

export interface RecipeWithIngredients extends Recipe {
  ingredients: RecipeIngredient[];
}

export interface NewRecipe {
  name: string;
  preparation: string;
  overheads: number;
  shelf_life?: string;
  storage?: string;
  calories?: number | null;
  protein?: number | null;
  fat?: number | null;
  carbs?: number | null;
}

export interface NewIngredient {
  ingredient_name: string;
  quantity: number;
  unit: string;
}

// ✅ NEW: Export all master ingredients
export const getAllIngredients = async (): Promise<Pick<MasterIngredient, 'name' | 'brand' | 'price_per_kg'>[]> => {
  const { data, error } = await supabase
    .from('master_ingredients')
    .select('name, brand, price_per_kg')
    .order('name');

  if (error) throw new Error(error.message);
  return data || [];
};

export const fetchMasterIngredients = async (): Promise<MasterIngredient[]> => {
  const { data, error } = await supabase
    .from('master_ingredients')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
};

export const fetchRecipesWithIngredients = async (): Promise<RecipeWithIngredients[]> => {
  const { data: recipes, error: recipesError } = await supabase
    .from('recipes')
    .select('*')
    .order('name');

  if (recipesError) throw recipesError;

  const { data: ingredients, error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .select('*');

  if (ingredientsError) throw ingredientsError;

  return recipes.map(recipe => ({
    ...recipe,
    ingredients: ingredients.filter(ing => ing.recipe_id === recipe.id)
  }));
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
  const { error } = await supabase
    .from('master_ingredients')
    .insert({ name, price_per_kg: pricePerKg, brand });

  if (error) throw error;
};

export const updateMasterIngredient = async (
  id: string,
  pricePerKg: number,
  brand?: string
): Promise<void> => {
  const { error } = await supabase
    .from('master_ingredients')
    .update({ price_per_kg: pricePerKg, brand, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};

export const upsertMasterIngredient = async (
  name: string,
  pricePerKg: number,
  brand?: string
): Promise<void> => {
  const { data: existing } = await supabase
    .from('master_ingredients')
    .select('id')
    .eq('name', name)
    .single();

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
  const { error } = await supabase
    .from('master_ingredients')
    .update({ price_per_kg: pricePerKg, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};

export const deleteMasterIngredient = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('master_ingredients')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const addRecipeWithIngredients = async (
  recipe: NewRecipe,
  ingredients: NewIngredient[],
  masterIngredients: MasterIngredient[]
): Promise<void> => {
  const totalCost = ingredients.reduce((sum, ingredient) => {
    return sum + calculateIngredientCostFromPartial(ingredient, masterIngredients);
  }, 0);

  const finalCost = totalCost + recipe.overheads;
  const sellingPrice = calculateSellingPrice(finalCost);

  const { data: recipeData, error: recipeError } = await supabase
    .from('recipes')
    .insert({ ...recipe, selling_price: sellingPrice })
    .select()
    .single();

  if (recipeError) throw recipeError;

  const ingredientInserts = ingredients.map(ingredient => ({
    recipe_id: recipeData.id,
    ingredient_name: ingredient.ingredient_name,
    quantity: ingredient.quantity,
    unit: ingredient.unit
  }));

  const { error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .insert(ingredientInserts);

  if (ingredientsError) throw ingredientsError;
};

export const updateRecipeVisibility = async (
  recipeId: string,
  isHidden: boolean
): Promise<void> => {
  const { error } = await supabase
    .from('recipes')
    .update({
      is_hidden: isHidden,
      updated_at: new Date().toISOString()
    })
    .eq('id', recipeId);

  if (error) throw error;
};
