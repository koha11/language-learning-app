import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { ForgotPassword as forgotPasswordService } from '@/modules/auth/services/auth.services';

const forgotSchema = z.object({
    email: z.string().email(),
});

type ForgotForm = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
    const [message, setMessage] = useState<string | null>(null);

    const { mutate, isPending } = useMutationWithToast(forgotPasswordService, {
        success:
            'If the email exists, the system will send a reset password to mail. Please check this and change password soon as possible.',
        error: 'Failed to send reset email',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotForm>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = (data: ForgotForm) => {
        setMessage(null);
        mutate(data, {
            onSuccess: () => {
                setMessage(
                    'If the email exists, the system will send a reset password to mail. Please check this and change password soon as possible.',
                );
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
                    <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        The system will send a reset password to mail, please check this and change password soon as possible.
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" {...register('email')} className="py-5" />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 mt-6">
                        <Button isPending={isPending} type="submit" className="w-full py-5">
                            Send reset link
                        </Button>

                        {message && <p className="text-sm text-green-600 text-center">{message}</p>}

                        <p className="text-sm text-muted-foreground text-center">
                            Remembered your password?{' '}
                            <Link to="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ForgotPassword;