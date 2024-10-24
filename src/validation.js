import { z } from "zod";


export const LoginSchema = z.object({
    email: z.string().min(2, "Email is required").email("Email address is invalid"),
    password: z.string().min(8, "password should be 8 characters and above").max(20),
});