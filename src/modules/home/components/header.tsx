import { BookOpen, LogOut, PlusIcon, SearchIcon, Settings, User, User2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/shared/hooks/useAuth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/shared/hooks/useTheme';
import Loading from '@/components/ui/loading';
import React, { useState } from 'react';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { ChangePassword, Logout } from '@/modules/auth/services/auth.services';
import { useQueryClient } from '@tanstack/react-query';
import EditUserInfoModal from '@/modules/user/components/editUserInfoModal';
import ChangePasswordModal from '@/modules/user/components/changePasswordModal';

const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [isEditUserInfoModalOpen, setIsEditUserInfoModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const { mutate, isPending } = useMutationWithToast(Logout, {
    invalidateKeys: ['me'],
    success: 'Logout success',
    error: 'Logout failed',
  });

  const nameSplit = user?.name?.split(' ');
  const q = searchParams.get('q') ?? '';
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  React.useEffect(() => {
    setSearchValue(q);
  }, [q]);

  const handleLogout = () => {
    mutate(null, {
      onSuccess: () => {
        localStorage.removeItem('token');
        queryClient.clear();
        navigate('/login', {
          replace: true,
        });
      },
    });
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    setSearchParams({
      q: q,
    });
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <header className="border-b border-border bg-background/95  sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LEFT — Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg  from-primary to-accent flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">G-Flashcard</span>
        </Link>

        <div className="flex-1 flex justify-center">
          {isLoading ? (
            <div className="w-[40%] h-10 bg-muted rounded-md animate-pulse"></div>
          ) : (
            <div className="flex items-center w-full justify-center">
              <div className="relative w-[60%] max-w-lg">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <Input
                  className="rounded-full w-full pl-9 bg-gray-100"
                  placeholder="Search for flashcard collections"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && !user && (
            <div className="flex items-center gap-6">
              <Link to="/collections/create" className="flex items-center gap-1 text-primary">
                <PlusIcon className="size-4.5" />
                <span className="text-[15px] font-medium">Create</span>
              </Link>
              <Link to="/login">
                <Button className="rounded-full bg-primary px-6  ">Login</Button>
              </Link>
            </div>
          )}

          {user && nameSplit && (
            <div className="flex items-center gap-6">
              <nav className="flex items-center ">
                <Link
                  to="/collections"
                  className={cn(
                    'text-foreground hover:text-primary transition-colors font-medium',
                    isActive('/collections') && 'dark:text-primary text-blue-600',
                  )}
                >
                  Collections
                </Link>
              </nav>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center">
                      {nameSplit[nameSplit.length - 1][0]}
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

                  <button
                    className="flex items-center hover:bg-accent rounded-md gap-2 p-2"
                    onClick={() => setIsEditUserInfoModalOpen(true)}
                  >
                    <User2Icon className="size-5" />
                    <Label htmlFor="airplane-mode">Change User Info</Label>
                  </button>

                  <button
                    className="flex items-center hover:bg-accent rounded-md gap-2 p-2"
                    onClick={() => setIsChangePasswordModalOpen(true)}
                  >
                    <Settings className="size-5" />
                    <Label htmlFor="airplane-mode">Change Password</Label>
                  </button>

                  <button
                    disabled={isPending}
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-accent rounded-md "
                  >
                    <LogOut className="size-5" />
                    <Label>Logout</Label>
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
      <EditUserInfoModal
        onChange={() => setIsEditUserInfoModalOpen(false)}
        open={isEditUserInfoModalOpen}
        initialData={{ name: user?.name ?? '', dob: user?.dob.substring(0, 10) ?? '' }}
      />
      <ChangePasswordModal
        onChange={() => setIsChangePasswordModalOpen(false)}
        open={isChangePasswordModalOpen}
      />
    </header>
  );
};

export default Header;
