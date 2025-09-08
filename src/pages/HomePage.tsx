import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, ChefHat } from 'lucide-react';
import { Input } from '@/components/ui/input';
import RecipeCard from '@/components/RecipeCard';
import { fetchMasterIngredients, fetchRecipesWithIngredients } from '@/services/database';
import Footer from '@/components/Footer';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: masterIngredients = [], refetch: refetchIngredients } = useQuery({
    queryKey: ['masterIngredients'],
    queryFn: fetchMasterIngredients,
  });

  const { data: recipes = [], refetch: refetchRecipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipesWithIngredients,
  });

  const refreshData = async () => {
    await refetchIngredients();
    await refetchRecipes();
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleRecipes = filteredRecipes
    .filter(recipe => !recipe.is_hidden)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="text-primary h-12 w-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Artisan Delights
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic South Indian spice powders and traditional recipes crafted with love and heritage
          </p>
        </div>

        {/* Stats & Search */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="w-full md:w-1/4">
            <Badge variant="secondary" className="text-sm px-4 py-2 w-full justify-center">
              <FileText size={16} className="mr-2" />
              Total Recipes: {visibleRecipes.length}
            </Badge>
          </div>
          <div className="w-full md:w-1/4">
            <Badge variant="outline" className="text-sm px-4 py-2 w-full justify-center">
              <img src="/logo.png" className="h-4 w-4 mr-2" alt="icon" />
              Ingredients: {masterIngredients.length}
            </Badge>
          </div>
          <div className="w-full md:w-2/4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              masterIngredients={masterIngredients}
              onRecipeUpdated={refreshData}
            />
          ))}
        </div>

        {/* Empty State */}
        {visibleRecipes.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {searchTerm ? 'No recipes found' : 'No recipes available'}
            </h3>
            <p className="text-muted-foreground text-lg">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Our delicious recipes will be available soon!'
              }
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;