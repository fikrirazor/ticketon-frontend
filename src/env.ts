import * as Yup from "yup";

// env schema
const envSchema = Yup.object({
  VITE_NODE_ENV: Yup.string().required(),
  VITE_API_URL: Yup.string().required(),
});

function loadEnv() {
  const env = envSchema.validateSync(import.meta.env, {
    abortEarly: false,
  });
  return env;
}

export const env = loadEnv();
