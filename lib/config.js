export const ironOptions = {
  cookieName: "rally_cookie",
  password: process.env.SESSION_PASS,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3030/' : 'tbd'