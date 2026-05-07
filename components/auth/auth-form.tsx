"use client";

import { useState } from "react";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

type LoginForm = z.infer<typeof formSchema>;

function AuthForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<LoginForm> = async ({
    email,
    password,
  }) => {
    setIsSubmitting(true);

    const toastId = toast.loading("Signing in...");

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response.error) {
      toast.dismiss(toastId);
      toast.error("Invalid email or password");
      return;
    }

    toast.dismiss(toastId);
    toast.success("You are signed in now");
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <div className="max-w-xl w-full">
      <h4 className="text-xl text-gray-900 font-bold">Welcome back</h4>
      <form className="mt-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup className="gap-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter email"
                  disabled={isSubmitting}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter password"
                  disabled={isSubmitting}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal" className="-my-2">
            <Checkbox id="rememberMe" name="rememberMe" />
            <FieldLabel htmlFor="rememberMe" className="text-gray-500">
              Remember me
            </FieldLabel>
          </Field>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Sign in
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default AuthForm;
