import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" }),
});

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username minimal 3 karakter" })
      .regex(/^[a-z0-9_-]+$/, {
        message: "Username harus berupa huruf kecil, angka, _ dan -",
      }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi" })
      .email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .refine(
        (val) =>
          val.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
          ),
        {
          message:
            "Password harus memiliki setidaknya satu huruf besar, satu angka, satu simbol, dan minimal 8 karakter",
        }
      ),
    password_confirmation: z.string().min(8, {
      message: "Konfirmasi password minimal 8 karakter",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi password tidak cocok",
    path: ["password_confirmation"],
  });

export { loginSchema, registerSchema };
