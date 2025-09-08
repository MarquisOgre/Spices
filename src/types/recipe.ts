// Simple recipe types without Supabase
export interface MasterIngredient {
  id: string;
  name: string;
  price_per_kg: number;
  brand?: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  ingredient_name: string;
  quantity: number;
  unit: string;
  created_at: string;
}

export interface Recipe {
  id: string;
  name: string;
  preparation?: string;
  selling_price: number;
  overheads: number;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  shelf_life?: string;
  storage?: string;
  is_hidden?: boolean;
  created_at: string;
  updated_at: string;
}

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