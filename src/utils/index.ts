export type TokenBulk = {
  accessToken: string;
  refreshToken: string;
};

export const storeTokens = (tokenBulk: TokenBulk) => {
  localStorage.setItem("access_token", tokenBulk.accessToken);
  localStorage.setItem("refresh_token", tokenBulk.refreshToken);
};

export const getTokens = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  return { accessToken, refreshToken };
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getErrorMessage = (error: unknown) => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
