import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle as CheckCircleIcon, XCircle as XCircleIcon } from 'lucide-react';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { VerifyEmail } from '@/modules/auth/services/auth.services';
import type { LoginResponse } from '../types/loginResponse';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') ?? '';
  const isSending = useRef(false);

  const { mutateAsync, isPending } = useMutationWithToast<LoginResponse, { token: string }>(
    VerifyEmail,
    {
      success: 'Email verified — signing you in...',
      error: 'Failed to verify email',
    },
  );

  useEffect(() => {
    if (!token) return;
    if (isSending.current) return;
    isSending.current = true;

    (async () => {
      try {
        const data = await mutateAsync({ token });
        // explicit handling after the request resolves
        console.log('Email verified (mutateAsync):', data);
        if (data && (data as any).token) {
          localStorage.setItem('token', (data as any).token);
          navigate('/');
        }
      } catch (err) {
        // mutation errors are already handled by useMutationWithToast (toast),
        // but log here for debugging
        console.error('VerifyEmail failed', err);
      }
    })();
  }, [token, mutateAsync, navigate]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <XCircleIcon className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-center">Missing token</CardTitle>
            <CardDescription className="text-center">
              No verification token was found in the URL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please check the link in your email and try again.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/login">
              <Button className="py-3">Back to login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Verifying</CardTitle>
          <CardDescription className="text-center">
            We are verifying your email — please wait.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If verification completes successfully you will be signed in and redirected to home.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button isPending={isPending} className="py-3">
            Verifying...
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
