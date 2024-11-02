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
