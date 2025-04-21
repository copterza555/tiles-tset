import { useLocation, useNavigate } from "react-router-dom";
import Background from "../../../components/BackgroundKhloyB"; 


export default function Resultestbeforekhloy() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  return (
    <Background>

    <div style={styles.resultContainer}>
      <div style={styles.resultBox}>
        <h2 style={styles.resultText}>ได้คะแนน</h2>
        <h2 style={styles.scoreText}>{score}/3</h2>
      </div>
      <button onClick={() => navigate("/Chapterkhloy1", { state: { score, total: 3 } })} style={styles.button}>
      ไปหน้าต่อไป
      </button>
      </div>
    </Background>
  );
}

const styles = {
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  resultBox: {
    backgroundColor: "#D9D9D9",
    borderRadius: "20px",
    width: "850px",
    height: "450px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  resultText: {
    fontSize: "80px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  scoreText: {
    fontSize: "150px",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#98FB98",
    border: "none",
    padding: "12px 55px",
    cursor: "pointer",
    fontSize: "25px",
    borderRadius: "8px",
    marginTop: "20px",
  },
};
