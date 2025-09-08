import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Artisan Delights
          </span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            About
          </Button>
          <Button variant="ghost" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;