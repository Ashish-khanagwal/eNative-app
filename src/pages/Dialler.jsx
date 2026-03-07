import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700;800&family=Exo+2:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg: #050507; --surface: #08090d; --surface2: #0c0d12; --border: #111116; --border2: #181820; --accent: #c084fc; --accent2: #60d8fa; --accent3: #6ee7b7; --text: rgba(255,255,255,0.93); --mid: rgba(255,255,255,0.52); --dim: rgba(255,255,255,0.26); --red: #ff5f7e; }
  body { background: var(--bg); color: var(--text); font-family: 'Exo 2', sans-serif; margin: 0; }
  .app { display: flex; min-height: 100vh; }
  .sidebar { width: 68px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; padding: 22px 0; gap: 4px; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; }
  .sidebar-logo { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #c084fc, #60d8fa); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; font-family: 'Rajdhani', sans-serif; font-weight: 800; font-size: 16px; color: #fff; }
  .nav-btn { width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; background: transparent; color: var(--dim); font-size: 17px; transition: all 0.18s; }
  .nav-btn:hover { background: var(--surface2); color: var(--mid); }
  .nav-btn.active { background: rgba(192,132,252,0.1); color: var(--accent); }
  .sidebar-bottom { margin-top: auto; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #1a0a30, #0d0520); border: 1.5px solid rgba(192,132,252,0.25); display: flex; align-items: center; justify-content: center; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 12px; color: var(--accent); cursor: pointer; }
  .main { margin-left: 68px; flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
  .dialler-wrap { width: 100%; max-width: 340px; }
  .dial-title { font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 0.28em; color: var(--dim); margin-bottom: 20px; text-transform: uppercase; text-align: center; }
  .dial-display { background: var(--surface); border: 1px solid var(--border2); border-radius: 16px; padding: 24px 22px; margin-bottom: 24px; min-height: 80px; display: flex; flex-direction: column; justify-content: center; text-align: center; }
  .dial-number { font-family: 'Share Tech Mono', monospace; font-size: 28px; letter-spacing: 0.08em; color: var(--text); min-height: 36px; }
  .dial-sublabel { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: var(--dim); letter-spacing: 0.12em; margin-top: 6px; }
  .keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
  .key { height: 64px; border-radius: 14px; background: var(--surface); border: 1px solid var(--border2); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; gap: 2px; }
  .key:hover { background: rgba(192,132,252,0.08); border-color: rgba(192,132,252,0.2); }
  .key:active { transform: scale(0.95); background: rgba(192,132,252,0.15); }
  .key-num { font-family: 'Rajdhani', sans-serif; font-size: 24px; font-weight: 700; line-height: 1; color: var(--text); }
  .key-alpha { font-family: 'Share Tech Mono', monospace; font-size: 8px; letter-spacing: 0.12em; color: var(--dim); }
  .key-special { background: transparent; border-color: transparent; }
  .key-special:hover { background: rgba(255,255,255,0.04); border-color: var(--border2); }
  .dial-call-btn { width: 100%; height: 60px; border-radius: 16px; border: none; background: linear-gradient(135deg, #22c55e, #15803d); color: #fff; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 4px 20px rgba(34,197,94,0.3); transition: all 0.2s; margin-bottom: 12px; }
  .dial-call-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(34,197,94,0.4); }
  .dial-end-btn { width: 100%; height: 50px; border-radius: 14px; border: 1px solid rgba(255,95,126,0.2); background: rgba(255,95,126,0.06); color: var(--red); font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 1px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
  .dial-end-btn:hover { background: rgba(255,95,126,0.12); }
  .incall-panel { text-align: center; padding: 20px 0 24px; }
  .incall-av { width: 80px; height: 80px; border-radius: 50%; background: rgba(192,132,252,0.12); display: flex; align-items: center; justify-content: center; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 28px; color: var(--accent); margin: 0 auto 16px; animation: ring-pulse 2s ease-in-out infinite; }
  @keyframes ring-pulse { 0%,100%{box-shadow:0 0 0 6px rgba(192,132,252,0.08),0 0 0 12px rgba(192,132,252,0.04)} 50%{box-shadow:0 0 0 10px rgba(192,132,252,0.12),0 0 0 20px rgba(192,132,252,0.05)} }
  .incall-number { font-family: 'Share Tech Mono', monospace; font-size: 20px; color: var(--text); letter-spacing: 0.08em; margin-bottom: 6px; }
  .incall-timer { font-family: 'Share Tech Mono', monospace; font-size: 32px; color: var(--accent3); letter-spacing: 0.1em; margin-bottom: 8px; }
  .incall-status { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: var(--accent); letter-spacing: 0.2em; opacity: 0.7; animation: blink 1.5s infinite; margin-bottom: 20px; }
  @keyframes blink { 0%,100%{opacity:0.7} 50%{opacity:0.3} }
  .waveform { display: flex; align-items: center; justify-content: center; gap: 3px; height: 32px; margin-bottom: 24px; }
  .wbar { width: 4px; border-radius: 2px; background: var(--accent); }
`;

const NAV = [
  { icon: "⊞", path: "/" },
  { icon: "📞", path: "/dialler" },
  { icon: "👥", path: "/contacts" },
  { icon: "💬", path: "#" },
  { icon: "🏅", path: "#" },
  { icon: "⚙", path: "#" },
];

const KEYS = [
  ["1",""],["2","ABC"],["3","DEF"],
  ["4","GHI"],["5","JKL"],["6","MNO"],
  ["7","PQRS"],["8","TUV"],["9","WXYZ"],
  ["*",""],["0","+"],["#",""],
];

export default function Dialler() {
  const navigate = useNavigate();
  const [dialVal, setDialVal] = useState("");
  const [calling, setCalling] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!calling) { setTimer(0); return; }
    const iv = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, [calling]);

  const pressKey = (k) => {
    if (k === "⌫") { setDialVal(v => v.slice(0, -1)); return; }
    setDialVal(v => (v + k).slice(0, 12));
  };

  const m = String(Math.floor(timer / 60)).padStart(2, "0");
  const s = String(timer % 60).padStart(2, "0");

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="sidebar">
          <div className="sidebar-logo">en</div>
          {NAV.map((n, i) => (
            <button key={i}
              className={`nav-btn${n.path === "/dialler" ? " active" : ""}`}
              onClick={() => n.path !== "#" && navigate(n.path)}>
              {n.icon}
            </button>
          ))}
          <div className="sidebar-bottom"><div className="avatar">TO</div></div>
        </div>
        <div className="main">
          <div className="dialler-wrap">
            <div className="dial-title">Dialler</div>

            {calling ? (
              <div className="incall-panel">
                <div className="incall-av">📞</div>
                <div className="incall-number">{dialVal}</div>
                <div className="incall-timer">{m}:{s}</div>
                <div className="incall-status">● NVIDIA RIVA · AI ACTIVE</div>
                <div className="waveform">
                  {Array(20).fill(0).map((_, i) => (
                    <div key={i} className="wbar" style={{
                      height: Math.floor(Math.random() * 24) + 8,
                      animation: `waveAnim 0.8s ${(i * 0.06).toFixed(2)}s ease-in-out infinite alternate`
                    }} />
                  ))}
                  <style>{`@keyframes waveAnim{from{transform:scaleY(0.3);opacity:0.5}to{transform:scaleY(1);opacity:1}}`}</style>
                </div>
              </div>
            ) : (
              <>
                <div className="dial-display">
                  <div className="dial-number">{dialVal || ""}</div>
                  <div className="dial-sublabel">{dialVal ? "eNumber ready to call" : "Enter an eNumber"}</div>
                </div>
                <div className="keypad">
                  {KEYS.map(([num, alpha], i) => (
                    <div key={i} className="key" onClick={() => pressKey(num)}>
                      <span className="key-num">{num}</span>
                      {alpha && <span className="key-alpha">{alpha}</span>}
                    </div>
                  ))}
                  <div className="key key-special" />
                  <div className="key key-special" onClick={() => pressKey("⌫")}>
                    <span style={{ color: "var(--mid)", fontSize: 22 }}>⌫</span>
                  </div>
                </div>
              </>
            )}

            {calling ? (
              <button className="dial-end-btn" onClick={() => setCalling(false)}>✕ &nbsp; END CALL</button>
            ) : (
              <button className="dial-call-btn" onClick={() => dialVal && setCalling(true)}>📞 &nbsp; CALL</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
