
import { useState } from "react";
import {
  Smartphone,
  Store,
  IndianRupee,
  LogOut,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  function login() {
    if (mobile.length !== 10 || pin.length !== 6) {
      setMessage("Enter a valid 10-digit mobile number and 6-digit PIN.");
      return;
    }

    setMessage("Demo screen only. Merchant authentication is not connected yet.");
  }

  function requestPayment() {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Please enter a valid payment amount.");
      return;
    }

    setMessage("Payment request preview only. Gateway connection is not active yet.");
  }

  return (
    <main className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">T</div>
          <div>
            <h1>JAIDEV TAP PAY</h1>
            <p>SMART MERCHANT PAYMENTS</p>
          </div>
        </div>
        {loggedIn && (
          <button className="logout" onClick={() => setLoggedIn(false)}>
            <LogOut size={18} />
          </button>
        )}
      </header>

      {!loggedIn ? (
        <section className="login-card">
          <div className="hero-icon">
            <Smartphone size={32} />
          </div>
          <h2>Merchant Login</h2>
          <p className="muted">Sign in to manage your shop payments.</p>

          <label>Mobile Number</label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          />

          <label>6-Digit PIN</label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          />

          <button className="primary-button" onClick={login}>
            Login <ArrowRight size={18} />
          </button>

          <div className="secure-note">
            <ShieldCheck size={16} />
            Secure merchant access
          </div>
        </section>
      ) : (
        <section className="dashboard">
          <div className="welcome">
            <div>
              <p className="muted">MERCHANT DASHBOARD</p>
              <h2>Welcome, Merchant</h2>
            </div>
            <div className="shop-icon"><Store size={24} /></div>
          </div>

          <div className="shop-card">
            <p>YOUR SHOP</p>
            <h3>Merchant Shop</h3>
            <span>Shop ID: Pending registration</span>
          </div>

          <div className="request-card">
            <h2>Request Payment</h2>
            <p className="muted">Enter the amount to collect from your customer.</p>

            <label>Payment Amount (₹)</label>
            <div className="amount-input">
              <IndianRupee size={22} />
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button className="primary-button" onClick={requestPayment}>
              Request Payment <ArrowRight size={18} />
            </button>
          </div>

          <div className="info-card">
            <Smartphone size={22} />
            <div>
              <strong>NFC Payment Stand</strong>
              <p>Customer payment link will be connected after gateway setup.</p>
            </div>
          </div>
        </section>
      )}

      {message && (
        <div className="message" role="status">
          {message}
          <button onClick={() => setMessage("")}>OK</button>
        </div>
      )}

      <footer>JAIDEV TAP PAY · Merchant Platform</footer>
    </main>
  );
}
