import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import type { ChangePasswordType } from '../types/user';
import { changePasswordSchema } from '../schemas/user.schema';

type ChangePasswordFormProps = {
  onSubmit: (data: ChangePasswordType) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: string;
};

const ChangePasswordForm = ({ onSubmit, onCancel, isPending, error }: ChangePasswordFormProps) => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const { reset } = form;

  React.useEffect(() => {
    reset({ oldPassword: '', newPassword: '' });
  }, [reset]);

  const handleSubmit = (data: ChangePasswordType) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between mb-4"></div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter old password"
                    {...field}
                    className="text-base py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    className="text-base py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button isPending={isPending} type="submit">
            Change
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
