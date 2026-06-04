import z from "zod";

const loginSchema = z.object({
  email: z.email("Email not valid").min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password length must be at least 8 characters" }),
});

const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email("Email not valid").min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password length must be at least 8 characters" }),
    password_confirmation: z.string().min(8, {
      message: "Password confirmation length must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password don't match",
    path: ["password_confirmation"],
  });

export { loginSchema, registerSchema };
