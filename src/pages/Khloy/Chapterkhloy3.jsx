import { useLocation, useNavigate } from "react-router-dom";
import Background from "../../components/BackgroundKhloyB"; 
import Header from "../../components/header"; 
import lockIcon from "../../picture/Iconkhloylock.png"; 
import unlockIcon from "../../picture/Iconkhloyunlock.png"; 
import Iconpass from "../../picture/Iconkhloypass.png"; 

export default function Chapterkhloy3() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.Testbeforekhloy|| { score: 0, total: 3 }; // ✅ ดึงคะแนนจาก state

  return (
    <>
      <Background />
      <Header />

      {/* ✅ กล่องแสดงคะแนน */}
      <div style={styles.scoreBox}>
        <p style={styles.scoreText}>3 / {total}</p>
      </div>

      <div style={styles.clickableIcon} onClick={() => navigate("/Startkhloylesson1")}>
          <img src={Iconpass} alt="ปลดล็อค" style={styles.unlockIcon} />
      </div>

      {/* ✅ แสดงเครื่องดนตรีที่ล็อค (5 อัน) และ ปลดล็อค (1 อัน) */}
      <div style={styles.clickableIcon} onClick={() => navigate("/Startkhloylesson2")}>
        <img src={Iconpass} alt="ล็อค 1" style={styles.lockIcon1} />
      </div>

      <div style={styles.clickableIcon} onClick={() => navigate("/Startkhloylesson03")}>
        <img src={unlockIcon} alt="ล็อค 2" style={styles.lockIcon2} />
      </div>

      <div>
        <img src={lockIcon} alt="ล็อค 3" style={styles.lockIcon3} />
        <img src={lockIcon} alt="ล็อค 4" style={styles.lockIcon4} />
        <img src={lockIcon} alt="ล็อค 5" style={styles.lockIcon5} />
      </div>

      {/* ✅ ปุ่มย้อนกลับ */}
      <button onClick={() => navigate(-1)} style={styles.backButton}>ย้อนกลับ</button>
    </>
  );
}

const styles = {
  scoreBox: {
    position: "absolute",
    top: "45%",
    left: "8%",
    backgroundColor: "#F9E371",
    padding: "12px 20px",
    borderRadius: "10px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "black",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  scoreText: {
    margin: 0,
    fontSize: "50px",
  },
  instrumentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    position: "absolute",
    top: "50%",
    width: "80%",
  },

  /* ✅ ตำแหน่งของไอคอนล็อค 5 อัน */
  lockIcon1: {
    width: "250px",
    position: "absolute",
    top: "68%",
    left: "35%",
  },
  lockIcon2: {
    width: "250px",
    position: "absolute",
    top: "60%",
    left: "55%",
  },
  lockIcon3: {
    width: "250px",
    position: "absolute",
    top: "40%",
    left: "70%",
  },
  lockIcon4: {
    width: "250px",
    position: "absolute",
    top: "20%",
    left: "55%",
  },
  lockIcon5: {
    width: "250px",
    position: "absolute",
    top: "20%",
    left: "35%",
  },

  /* ✅ ตำแหน่งของไอคอนปลดล็อค 1 อัน */
  unlockIcon: {
    width: "250px",
    position: "absolute",
    top: "60%",
    left: "18%",
    cursor: "pointer",
  },

  backButton: {
    position: "absolute",
    bottom: "10%",
    left: "5%",
    backgroundColor: "#AEEEEE",
    padding: "12px 25px",
    fontSize: "34px",
    
    borderRadius: "10px",
    cursor: "pointer",
    
  },

  clickableIcon: {
    cursor: "pointer",
  },
};
