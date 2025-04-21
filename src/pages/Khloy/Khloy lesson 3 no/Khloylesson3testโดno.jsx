import React, { useState, useEffect } from "react";

export default function Khloylesson3testโดno() {
  const [pressedKeys, setPressedKeys] = useState([]);
  const [blowType, setBlowType] = useState(null); // 'soft' | 'strong'
  const [showNext, setShowNext] = useState(false);

  const fluteKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
  const answerKeys = [...fluteKeys, "v"]; // โด = asdfjkl; + v (เป่าเบา)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (fluteKeys.includes(key) && !pressedKeys.includes(key)) {
        setPressedKeys((prev) => [...prev, key]);
      }

      if (key === "v") setBlowType("soft");
      if (key === "n") setBlowType("strong");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pressedKeys]);

  useEffect(() => {
    const allPressed = answerKeys.every((k) =>
      pressedKeys.includes(k) || (k === "v" && blowType === "soft")
    );
    if (allPressed) {
      setShowNext(true);
    }
  }, [pressedKeys, blowType]);

  const handleReset = () => {
    setPressedKeys([]);
    setBlowType(null);
    setShowNext(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>การเล่นโน้ตเสียงต่ำ ตัว โด (ด)</h2>
      <p style={styles.subtitle}>กดปุ่ม: a s d f j k l ; แล้วกด v (เป่าเบา)</p>

      <div style={styles.flute}>
        {fluteKeys.map((key, index) => (
          <div
            key={index}
            style={{
              ...styles.hole,
              backgroundColor: pressedKeys.includes(key) ? "red" : "black",
            }}
          ></div>
        ))}
      </div>

      <div style={styles.blowButtons}>
        <button
          style={{
            ...styles.blowButton,
            backgroundColor: blowType === "strong" ? "#f99" : "#eee",
          }}
        >
          เป่าแรง (N)
        </button>
        <button
          style={{
            ...styles.blowButton,
            backgroundColor: blowType === "soft" ? "#99d" : "#eee",
          }}
        >
          เป่าเบา (V)
        </button>
      </div>

      {showNext && (
        <button style={styles.nextButton} onClick={handleReset}>
          ไปหน้าถัดไป
        </button>
      )}
    </div>
  );
}

// ✅ CSS in JS
const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    padding: 30,
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    margin: "10px 0 30px 0",
  },
  flute: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  hole: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "black",
  },
  blowButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  blowButton: {
    padding: "10px 20px",
    fontSize: 18,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  nextButton: {
    marginTop: 20,
    padding: "15px 30px",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};
