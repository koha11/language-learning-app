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
import { Mail as MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { CheckEmail } from '@/modules/auth/services/auth.services';
import z from 'zod';

const emailSchema = z.object({ email: z.string().email() });
type EmailForm = z.infer<typeof emailSchema>;

const UnverifyEmailPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: localStorage.getItem('email') || '' },
  });

  const { mutate, isPending } = useMutationWithToast(CheckEmail, {
    success: 'Verification check sent. Please check your email.',
    error: 'Failed to send verification check',
  });

  const onSubmit = (data: EmailForm) => {
    mutate(data, {
      onSuccess: () => {
        // optionally navigate or leave user on page
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MailIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            Please check your inbox and click the verification link to activate your account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="py-5"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <p className="text-sm text-muted-foreground">
              If you didn't receive an email, enter your address and press the button to resend the
              verification email.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button isPending={isPending} type="submit" className="w-full py-5">
              Send verification
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Back to{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UnverifyEmailPage;
