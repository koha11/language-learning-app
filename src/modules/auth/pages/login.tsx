import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogIn as LogInIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { LoginType } from '../types/auth';
import { loginSchema } from '../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { Login } from '@/modules/auth/services/auth.services';
import { email } from 'zod';
const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutationWithToast(Login, {
    success: 'Login success',
    error: 'Login failed',
    invalidateKeys: ['user'],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: LoginType) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data.isEmailVerified != undefined && !data.isEmailVerified) {
          localStorage.setItem('email', watch('email'));
          navigate('/unverify-email');
        } else if (data && data.token) {
          localStorage.setItem('token', data.token);
          navigate('/');
        }
      },
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <LogInIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="py-5"
                placeholder="Enter your email"
                {...register('email', {
                  required: true,
                })}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: true,
                })}
                className="py-5"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button isPending={isPending} type="submit" className="w-full py-5">
              Login
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
