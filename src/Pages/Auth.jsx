import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        isLogin
          ? "Login successful. Redirecting..."
          : "Account created. You’re now signed in."
      );
      setTimeout(() => navigate("/"), 1500);
    }

    setLoading(false);
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "Magic link sent. Check your email to continue."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-6">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md border border-zinc-800">
        <h1 className="text-3xl font-light mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleEmailPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 bg-black border border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-black border border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded hover:bg-blue-700 transition disabled:bg-zinc-700"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* MAGIC LINK */}
        <div className="my-6 text-center">
          <p className="text-sm text-gray-400 mb-3">
            Or continue without a password
          </p>
          <button
            onClick={handleMagicLink}
            disabled={!email || loading}
            className="w-full py-3 border border-zinc-600 rounded hover:border-blue-500 transition disabled:opacity-50"
          >
            Send Magic Link
          </button>
        </div>

        {/* FEEDBACK */}
        {error && (
          <p className="text-red-400 text-sm text-center mt-4">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-400 text-sm text-center mt-4">
            {message}
          </p>
        )}

        {/* TOGGLE */}
        <p
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setMessage("");
          }}
          className="text-sm text-gray-400 text-center mt-8 cursor-pointer hover:text-white transition"
        >
          {isLogin
            ? "Don’t have an account? Create one"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
