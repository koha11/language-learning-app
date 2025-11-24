import { BookOpen, LogOut, PlusIcon, SearchIcon, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/shared/hooks/useAuth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/shared/hooks/useTheme';
import Loading from '@/components/ui/loading';
import React from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const { user, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LEFT — Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">LinguaLearn</span>
        </Link>

        <div className="flex-1 flex justify-center">
          {isLoading ? (
            <div className="w-[40%] h-10 bg-muted rounded-md animate-pulse"></div>
          ) : !user ? (
            <div className="relative w-[60%] max-w-lg">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
              <Input
                className="rounded-full w-full pl-9 bg-gray-100"
                placeholder="Search for flashcard collections"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
          ) : (
            <nav className="flex items-center gap-10">
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
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && !user && (
            <div className="flex items-center gap-6">
              <Link to="/collections/create" className="flex items-center gap-1 text-blue-600">
                <PlusIcon className="size-4.5" />
                <span className="text-[15px] font-medium">Create</span>
              </Link>
              <Link to="/login">
                <Button className="rounded-full bg-blue-500 px-6  hover:bg-blue-500">Login</Button>
              </Link>
            </div>
          )}

          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center">
                    {user?.name?.[0] ?? 'U'}
                  </div>
                </button>
              </PopoverTrigger>

              <PopoverContent className=" p-2" align="end">
                <div className="px-2 py-2 border-b">
                  <p className=" font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <Switch
                    id="theme-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                  <Label htmlFor="theme-switch">Dark Mode</Label>
                </div>
                <div className="flex items-center hover:bg-accent rounded-md gap-2 p-2">
                  <Settings className="size-5" />
                  <Label htmlFor="airplane-mode">Settings</Label>
                </div>

                <button
                  onClick={() => console.log('Logout')}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-accent rounded-md text-red-500"
                >
                  <LogOut className="size-5" />
                  <Label>Logout</Label>
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
