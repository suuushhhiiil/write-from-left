export const cookieOptions = (maxAgeMs) => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeMs,
  };
};

export const parseDurationToMs = (value, fallbackMs) => {
  if (!value) return fallbackMs;

  const match = /^(\d+)([smhd])$/.exec(String(value).trim());
  if (!match) return fallbackMs;

  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };

  return amount * multipliers[unit];
};
