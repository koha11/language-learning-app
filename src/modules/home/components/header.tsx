import { BookOpen, SearchIcon, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/shared/hooks/useAuth';

const Header = () => {
  const location = useLocation();

  const { user, isLoading } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">LinguaLearn</span>
        </Link>
        {isLoading ? (
          <div className="w-[50%]"></div>
        ) : user ? (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/collections"
              className={cn(
                'text-foreground hover:text-primary transition-colors font-medium',
                isActive('/collections') && 'text-primary',
              )}
            >
              Collections
            </Link>
            <Link
              to="/progress"
              className={cn(
                'text-foreground hover:text-primary transition-colors font-medium',
                isActive('/progress') && 'text-primary',
              )}
            >
              Progress
            </Link>
          </nav>
        ) : (
          <>
            <div className="relative w-[50%]">
              <SearchIcon className=" absolute left-3 size-4 opacity-60 top-1/2 -translate-y-1/2" />
              <Input className=" rounded-full w-full pl-9 bg-gray-100" />
            </div>

            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className=" rounded-full bg-blue-500 hover:bg-blue-500 cursor-pointer">
                  Login
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
