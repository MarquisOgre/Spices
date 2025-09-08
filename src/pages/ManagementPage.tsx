import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Package, Plus, DollarSign, FileText, Archive } from 'lucide-react';
import ManageRecipes from '@/components/ManageRecipes';
import AddRecipe from '@/components/AddRecipe';
import MasterIngredientList from '@/components/MasterIngredientList';
import Indent from '@/components/Indent';
import StockRegister from '@/components/StockRegister';
import Recipes from '@/components/Recipes';
import { fetchMasterIngredients, fetchRecipesWithIngredients } from '@/services/database';
import Footer from '@/components/Footer';

const ManagementPage = () => {
  const [currentView, setCurrentView] = useState('main');

  // Fetch data for management components
  const { data: masterIngredients = [], refetch: refetchIngredients } = useQuery({
    queryKey: ['masterIngredients'],
    queryFn: fetchMasterIngredients,
  });

  const { data: recipes = [], refetch: refetchRecipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipesWithIngredients,
  });

  const refreshData = async () => {
    try {
      await refetchIngredients();
      await refetchRecipes();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const managementOptions = [
    {
      title: 'Recipes',
      description: 'View all recipes and their details',
      icon: ChefHat,
      color: 'bg-orange-500',
      key: 'recipes'
    },
    {
      title: 'Manage Recipes',
      description: 'Manage recipe visibility and settings',
      icon: ChefHat,
      color: 'bg-orange-600',
      key: 'manage-recipes'
    },
    {
      title: 'Ingredients',
      description: 'Manage master ingredient list and pricing',
      icon: Package,
      color: 'bg-green-500',
      key: 'ingredients'
    },
    {
      title: 'Add Recipe',
      description: 'Create new recipes with ingredients',
      icon: Plus,
      color: 'bg-blue-500',
      key: 'add-recipe'
    },
    {
      title: 'Pricing Manager',
      description: 'Set selling prices for different quantities',
      icon: DollarSign,
      color: 'bg-purple-500',
      key: 'pricing'
    },
    {
      title: 'Indent',
      description: 'Cost calculator and ingredient planning',
      icon: FileText,
      color: 'bg-indigo-500',
      key: 'indent'
    },
    {
      title: 'Stock Register',
      description: 'Track inventory and stock levels',
      icon: Archive,
      color: 'bg-red-500',
      key: 'stock-register'
    }
  ];

  const renderContent = () => {
    if (currentView === 'main') {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Backend Management</h1>
            <p className="text-xl text-muted-foreground">Manage your recipes, ingredients, pricing and inventory</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {managementOptions.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card key={item.key} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-muted-foreground mb-6 min-h-[48px] flex items-center justify-center">{item.description}</p>
                    <Button 
                      onClick={() => setCurrentView(item.key)}
                      className="w-full"
                      variant="outline"
                      size="lg"
                    >
                      Open {item.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    // Render specific management components
    switch (currentView) {
      case 'recipes':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <Recipes recipes={recipes} masterIngredients={masterIngredients} onRecipeUpdated={refreshData} />
          </div>
        );
      case 'manage-recipes':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <ManageRecipes recipes={recipes} onRecipeUpdated={refreshData} />
          </div>
        );
      case 'ingredients':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <MasterIngredientList masterIngredients={masterIngredients} onRefresh={refetchIngredients} />
          </div>
        );
      case 'add-recipe':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Add New Recipe</h2>
              <AddRecipe masterIngredients={masterIngredients} onRecipeAdded={refreshData} />
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <div className="text-center py-16">
              <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Pricing Manager</h3>
              <p className="text-muted-foreground">Set selling prices for different quantities</p>
              <p className="text-sm text-muted-foreground mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case 'indent':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <Indent recipes={recipes} masterIngredients={masterIngredients} />
          </div>
        );
      case 'stock-register':
        return (
          <div>
            <Button 
              onClick={() => setCurrentView('main')} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Management
            </Button>
            <StockRegister />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Backend Management</h1>
              <p className="text-xl text-muted-foreground">Manage your recipes, ingredients, pricing and inventory</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ManagementPage;