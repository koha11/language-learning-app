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
import type { UserInfoType } from '../types/user';
import { userInfoSchema } from '../schemas/user.schema';

type UserInfoFormProps = {
    onSubmit: (data: UserInfoType) => void;
    onCancel: () => void;
    initialData: Partial<UserInfoType>;
    isPending?: boolean;
};

const UserInfoForm = ({
    onSubmit,
    onCancel,
    initialData,
    isPending,
}: UserInfoFormProps) => {
    const form = useForm<UserInfoType>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: {
            name: initialData.name,
            dob: initialData.dob
        },
    });
    const { reset } = form;

    React.useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                dob: initialData.dob
            });
        }
    }, [reset, initialData]);

    const handleSubmit = (data: UserInfoType) => {
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter name" {...field} className="text-base py-5" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>D.O.B</FormLabel>
                                <FormControl>
                                    <Input type='date' {...field} className="text-base py-5" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button isPending={isPending} type="submit">
                        Edit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UserInfoForm;
