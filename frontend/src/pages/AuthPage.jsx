import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebase"; // adjust path

import { useLoading } from "./LoadingContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx"; // adjust path

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const AuthPage = () => {
  const { loading, setLoading } = useLoading(); // <-- use loading context

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [error, setError] = useState("");
  const alertRef = useRef(null);
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  // Save user data in Firestore
  const saveUserRole = async (uid, role, name, email, mobile) => {
    await setDoc(doc(db, "users", uid), { role, name, email, mobile });
  };

  // Get user role
  const getUserRole = async (uid) => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data().role : null;
  };

  // Redirect
  const redirectToDashboard = (role) => {
    if (role === "volunteer") window.location.href = "/volunteer-dashboard";
    if (role === "ngo") window.location.href = "/ngo-dashboard";
    if (role === "restaurant") window.location.href = "/restaurant-dashboard";
  };

  // Email/Password Auth
  const handleAuth = async () => {
    if (!isLogin && !mobileVerified) {
      setError("Please verify your mobile number first!");
      return;
    }

    setLoading(true); // start loading

    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const role = await getUserRole(userCred.user.uid);
        redirectToDashboard(role);
      } else {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await saveUserRole(
          userCred.user.uid,
          role,
          name || email.split("@")[0],
          email,
          mobile
        );
        redirectToDashboard(role);
      }
    } catch (err) {
      console.log("Auth error:", err.code);
      if (err.code === "auth/email-already-in-use")
        setError("Email Already in use !!");
      else if (err.code === "auth/wrong-password")
        setError("Invalid password.");
      else if (err.code === "auth/user-not-found")
        setError("No account found with this email.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const uid = userCred.user.uid;
      const role = await getUserRole(uid);

      if (role) {
        redirectToDashboard(role);
      } else {
        setGoogleUser(userCred.user);
        setShowRoleSelect(true);
      }
    } catch (err) {
      console.error(err.message);
      setError("Something went wrong with Google Sign-In.");
    } finally {
      setLoading(false);
    }
  };

  // Save role for Google user
  const handleRoleSelection = async (selectedRole) => {
    if (!googleUser) return;
    setLoading(true);
    await saveUserRole(
      googleUser.uid,
      selectedRole,
      googleUser.displayName,
      googleUser.email,
      ""
    );
    setShowRoleSelect(false);
    redirectToDashboard(selectedRole);
    setLoading(false);
  };

  // GSAP fade for errors
  useEffect(() => {
    if (error && alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      const timer = setTimeout(() => {
        gsap.to(alertRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => setError(""),
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Mobile verification
  const handleVerifyMobile = async () => {
    if (!mobile) {
      setError("Please enter your mobile number");
      return;
    }

    setLoading(true);
    // Enable testing mode for localhost
    if (window.location.hostname === "localhost") {
      const testOtp = "123456";
      const otp = prompt(
        `Enter OTP for test number ${mobile}: (use ${testOtp})`
      );
      if (otp === testOtp) {
        setMobileVerified(true);
        setError("Mobile Verified Successfully!");
      } else {
        setError("Incorrect OTP for test number!");
      }
      setLoading(false);
      return;
    }

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
        window.recaptchaVerifier.render();
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + mobile,
        window.recaptchaVerifier
      );
      const otp = prompt("Enter the OTP sent to your mobile:");
      if (!otp) {
        setLoading(false);
        return;
      }

      await confirmationResult.confirm(otp);
      setMobileVerified(true);
      setError("Mobile Verified Successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to verify mobile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-slate-900 text-white">
      {loading && <LoadingSpinner />} {/* Show spinner when loading */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-96 border border-orange-500 z-10 relative">
        <h2 className="text-2xl font-bold text-orange-400 mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <Stack sx={{ width: "100%", mb: 2 }} ref={alertRef}>
            <Alert variant="filled" severity="warning">
              {error}
            </Alert>
          </Stack>
        )}

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 mb-3 bg-slate-700 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex mb-3">
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full p-2 bg-slate-700 rounded-l"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <button
                onClick={handleVerifyMobile}
                className={`p-2 rounded-r font-bold ${
                  mobileVerified ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {mobileVerified ? "Verified" : "Verify"}
              </button>
            </div>
            <div id="recaptcha-container"></div>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <select
            className="w-full p-2 mb-3 bg-slate-700 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
            <option value="restaurant">Restaurant</option>
          </select>
        )}

        <button
          onClick={handleAuth}
          disabled={!isLogin && !mobileVerified}
          className={`w-full ${
            !isLogin && !mobileVerified
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-400"
          } text-white font-bold p-2 rounded-lg transition`}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-center text-sm text-orange-300 cursor-pointer hover:underline"
        >
          {isLogin
            ? "New user? Register here"
            : "Already have an account? Login"}
        </p>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white font-bold p-2 rounded-lg hover:bg-red-400 transition"
          >
            <GoogleIcon /> <br /> Continue with Google
          </button>
        </div>
      </div>
      {showRoleSelect && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-orange-500 w-80">
            <h3 className="text-lg font-bold text-orange-400 mb-4 text-center">
              Select Your Role
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelection("restaurant")}
                className="w-full bg-orange-500 text-slate-900 font-bold p-2 rounded-lg hover:bg-orange-400 transition"
              >
                Restaurant
              </button>
              <button
                onClick={() => handleRoleSelection("ngo")}
                className="w-full bg-orange-500 text-slate-900 font-bold p-2 rounded-lg hover:bg-orange-400 transition"
              >
                NGO
              </button>
              <button
                onClick={() => handleRoleSelection("volunteer")}
                className="w-full bg-orange-500 text-slate-900 font-bold p-2 rounded-lg hover:bg-orange-400 transition"
              >
                Volunteer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
