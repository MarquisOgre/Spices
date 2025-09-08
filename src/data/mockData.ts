import { MasterIngredient, RecipeWithIngredients } from '@/types/recipe';

// Mock master ingredients data
export const mockMasterIngredients: MasterIngredient[] = [
  {
    id: '1',
    name: 'Coriander Seeds',
    price_per_kg: 120,
    brand: 'Premium',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Red Chili',
    price_per_kg: 200,
    brand: 'Spicy',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '3',
    name: 'Turmeric',
    price_per_kg: 150,
    brand: 'Golden',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '4',
    name: 'Cumin Seeds',
    price_per_kg: 180,
    brand: 'Aromatic',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '5',
    name: 'Black Gram',
    price_per_kg: 140,
    brand: 'Fresh',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '6',
    name: 'Sesame Seeds',
    price_per_kg: 300,
    brand: 'Premium',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

// Mock recipes data
export const mockRecipes: RecipeWithIngredients[] = [
  {
    id: '1',
    name: 'Sambar Powder',
    preparation: 'Dry roast all ingredients separately until aromatic. Cool completely and grind to fine powder. Store in airtight container.',
    selling_price: 400,
    overheads: 50,
    calories: 325,
    protein: 12,
    fat: 8,
    carbs: 45,
    shelf_life: '6 months',
    storage: 'Store in dry, airtight container',
    is_hidden: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    ingredients: [
      {
        id: '1',
        recipe_id: '1',
        ingredient_name: 'Coriander Seeds',
        quantity: 200,
        unit: 'g',
        created_at: '2024-01-01'
      },
      {
        id: '2',
        recipe_id: '1',
        ingredient_name: 'Red Chili',
        quantity: 100,
        unit: 'g',
        created_at: '2024-01-01'
      },
      {
        id: '3',
        recipe_id: '1',
        ingredient_name: 'Turmeric',
        quantity: 50,
        unit: 'g',
        created_at: '2024-01-01'
      }
    ]
  },
  {
    id: '2',
    name: 'Rasam Powder',
    preparation: 'Dry roast coriander seeds, cumin seeds separately. Roast red chili until crisp. Cool and grind all together to fine powder.',
    selling_price: 350,
    overheads: 40,
    calories: 310,
    protein: 10,
    fat: 6,
    carbs: 42,
    shelf_life: '6 months',
    storage: 'Store in dry place',
    is_hidden: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    ingredients: [
      {
        id: '4',
        recipe_id: '2',
        ingredient_name: 'Coriander Seeds',
        quantity: 150,
        unit: 'g',
        created_at: '2024-01-01'
      },
      {
        id: '5',
        recipe_id: '2',
        ingredient_name: 'Cumin Seeds',
        quantity: 100,
        unit: 'g',
        created_at: '2024-01-01'
      },
      {
        id: '6',
        recipe_id: '2',
        ingredient_name: 'Red Chili',
        quantity: 80,
        unit: 'g',
        created_at: '2024-01-01'
      }
    ]
  },
  {
    id: '3',
    name: 'Idly Podi',
    preparation: 'Dry roast black gram until golden. Roast sesame seeds until they pop. Roast red chili until crisp. Cool and grind coarsely with salt.',
    selling_price: 450,
    overheads: 60,
    calories: 380,
    protein: 15,
    fat: 18,
    carbs: 35,
    shelf_life: '4 months',
    storage: 'Airtight container',
    is_hidden: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    ingredients: [
      {
        id: '7',
        recipe_id: '3',
        ingredient_name: 'Black Gram',
        quantity: 300,
        unit: 'g',
        created_at: '2024-01-01'
      },
      {
        id: '8',
        recipe_id: '3',
        ingredient_name: 'Sesame Seeds',
        quantity: 150,
        unit: 'g',
        created_at: '2024-01-01'
      },
      {
        id: '9',
        recipe_id: '3',
        ingredient_name: 'Red Chili',
        quantity: 100,
        unit: 'g',
        created_at: '2024-01-01'
      }
    ]
  }
];