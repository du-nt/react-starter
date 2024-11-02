import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "../../App";
import { useQuery } from "../../hooks/useQuery";
import {
  LoginFormSchema,
  LoginFormValues,
} from "../../schemas/login_form_schema";
import useBoundStore from "../../stores";
import { useForm } from "react-hook-form";
import useMutation from "../../hooks/useMutation";
import { storeTokens, TokenBulk } from "../../utils";
import { DefaultError, useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const authenticate = useBoundStore((state) => state.authenticate);
  const queryClient = useQueryClient();

  const { refetch } = useQuery<Profile>({
    queryKey: ["profile"],
    enabled: false,
    onSuccess: () => {
      authenticate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { isPending, mutate } = useMutation<
    TokenBulk,
    DefaultError,
    LoginFormValues
  >({
    endpoint: "login",
    onSuccess: async (tokens) => {
      storeTokens(tokens);
      await refetch();
      // Show toast message
    },
  });

  const onSubmit = (formValues: LoginFormValues) => {
    queryClient.removeQueries();
    mutate(formValues);
  };

  if (isPending)
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(240, 255, 255, 0.527)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Submitting
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
