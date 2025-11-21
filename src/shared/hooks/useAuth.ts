import { getMe } from '@/modules/user/services/user.services';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const token = localStorage.getItem('token');

  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
  });

  return {
    user: query.data?.user,
    account: query.data?.account,
    isLoggedIn: !!query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
