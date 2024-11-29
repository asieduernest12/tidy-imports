import z from "zod";

const envs = z
    .object({
        NODE_ENV: z.enum(["local", "production", "staging", "development"]).default("production"),
    })
    .parse({ NODE_ENV: process.env.NODE_ENV });

export { envs };
