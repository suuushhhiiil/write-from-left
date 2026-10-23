import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err.response) {
        setError("The API is not running. Start the server, then try again.");
      } else {
        setError(err.response?.data?.message || "Unable to sign in. Check your credentials.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-secondary bg-light p-8 shadow-sm">
      <p className="text-xs font-medium tracking-wider text-accent uppercase">Admin</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Sign in</h1>
      <p className="mt-2 text-sm text-dark-accent">Access the blog editor and moderation tools.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm text-dark outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium tracking-wider text-dark-accent uppercase">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            className="rounded-lg border border-secondary bg-background px-4 py-3 text-sm text-dark outline-none focus:border-primary"
          />
        </label>

        {error && <p className="text-sm text-primary">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
