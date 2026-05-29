"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { authService } from "@/apis/services/auth-service"
import { useRouter } from "next/navigation"
import { loadingStore } from "@/stores/loading"

const formSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters.")
        .max(32, "Email must be at most 32 characters."),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(100, "Password must be at most 100 characters."),
})

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const { setIsLoading } = loadingStore();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const payload = {
            "email": data.email,
            "password": data.password
        };

        try {
            setIsLoading(true);
            const res = await authService.login(payload);
            
            // If login success we redirect to the home page
            router.replace("/");
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        toast("ចូលប្រព័ន្ធបានជោគជ័យ", {
            description: (
                <pre className="mt-2 max-w-[320px] w-full overflow-x-auto rounded-md bg-blue-500 p-4 text-white">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>{"ចូលប្រព័ន្ធ"}</CardTitle>

                <CardDescription>
                    {"សូមបញ្ចូលលិខិតសម្គាល់របស់អ្នក។"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="login-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FieldGroup>
                        {/* EMAIL */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* PASSWORD */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                >
                    Reset
                </Button>

                <Button type="submit" form="login-form">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Login