import { useMemo, useState } from "react";
import RightArrow from "../../assets/RightArrow.svg";
import LoginIllustration from "../../assets/LoginIllustrationSection.png";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules = [
  { label: "At least 8 characters", test: (value) => value.length >= 8 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "One number", test: (value) => /\d/.test(value) },
  { label: "One special character", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const AdminLogin = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);

  const passwordChecks = useMemo(
    () => passwordRules.map((rule) => ({ ...rule, passed: rule.test(formValues.password) })),
    [formValues.password]
  );

  const emailError = useMemo(() => {
    if (!formValues.email) return "Email is required";
    if (!emailRegex.test(formValues.email)) return "Enter a valid email address";
    return "";
  }, [formValues.email]);

  const passwordError = useMemo(() => {
    if (!formValues.password) return "Password is required";
    const hasFailures = passwordChecks.some((rule) => !rule.passed);
    return hasFailures ? "Please satisfy all password requirements" : "";
  }, [formValues.password, passwordChecks]);

  const isFormValid = !emailError && !passwordError;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (!isFormValid) return;
    setSubmitting(true);
    // Placeholder submit handler; connect to auth service when available.
    setTimeout(() => setSubmitting(false), 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Mobile decorative arc */}
      <div className="absolute left-1/2 top-[-140px] z-0 h-[260px] w-[420px] -translate-x-1/2 rounded-b-[220px] bg-purple-500 sm:hidden" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-12 px-6 py-12 lg:flex-row lg:items-center lg:px-10">
        <section className="order-2 w-full lg:order-1 lg:w-[52%]">
          <h1 className="montserrat text-center text-4xl font-semibold text-purple-500 sm:text-left sm:text-5xl">
            Login
          </h1>

          <form className="mt-10 space-y-5 sm:space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border border-purple-300 px-4 py-3 text-base text-purple-600 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 sm:rounded-xl sm:text-lg"
                aria-invalid={Boolean(touched.email && emailError)}
                aria-describedby="email-error"
                required
              />
              {touched.email && emailError && (
                <p id="email-error" className="text-sm text-red-500">
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border border-purple-300 px-4 py-3 text-base text-purple-600 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 sm:rounded-xl sm:text-lg"
                aria-invalid={Boolean(touched.password && passwordError)}
                aria-describedby="password-error password-hint"
                required
              />
              <div className="flex items-start justify-between gap-3">
                {touched.password && passwordError ? (
                  <p id="password-error" className="text-sm text-red-500">
                    {passwordError}
                  </p>
                ) : (
                  <span className="sr-only" id="password-error">
                    Password validation helper
                  </span>
                )}
                <a className="text-xs text-neutral-600 transition hover:text-purple-500 sm:text-sm" href="#">
                  Forgot Password?
                </a>
              </div>
              <ul
                id="password-hint"
                className="grid grid-cols-1 gap-1 text-xs text-neutral-600 sm:grid-cols-2 sm:text-sm"
              >
                {passwordChecks.map((rule) => (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 ${rule.passed ? "text-green-600" : "text-neutral-500"}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${rule.passed ? "bg-green-500" : "bg-neutral-300"}`}
                    />
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full justify-center sm:justify-start">
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className="group inline-flex items-center gap-3 rounded-full bg-purple-500 px-8 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-lg"
              >
                Proceed
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-purple-500 transition group-hover:translate-x-0.5 sm:h-8 sm:w-8">
                  <img src={RightArrow} alt="" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </div>
          </form>
        </section>

        <section className="order-1 hidden w-full justify-center lg:order-2 lg:flex lg:w-[48%]">
          <div className="relative w-full max-w-[520px] rounded-3xl bg-[#ecd7ff] p-6 shadow-sm">
            <img
              src={LoginIllustration}
              alt="Illustration of two administrators"
              className="mx-auto h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;

