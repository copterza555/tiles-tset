import { Link } from "react-router-dom";
import Background from "../../../components/BackgroundKhloyB";

export default function Startkhloy() {
  return (
    <Background>
      <div style={styles.page}>
        
        {/* ป้ายหัวข้อแบบทดสอบ */}
        <div style={styles.titleContainer}>
          <img src="src/picture/ป้าย.png" alt="แบบทดสอบก่อนเรียน" style={styles.titleImage} />
          <p style={styles.titleText}>แบบทดสอบก่อนเรียน</p>
        </div>

        {/* ปุ่มเริ่มทำแบบทดสอบ */}
        <div style={styles.buttonContainer}>
          <Link to="/Testbeforekhloy" style={styles.startButton}>
            เริ่มต้นการทำทดสอบ
          </Link>
        </div>

      </div>
    </Background>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  titleContainer: {
    position: "absolute",
    top: "-35%",  // ✅ ขยับป้ายไปด้านบน
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  titleImage: {
    width: "450px",
  },
  titleText: {
    position: "absolute",
    fontSize: "30px",
    fontWeight: "bold",
    color: "black", // ✅ สีขาวให้ตัดกับป้ายสีแดง
    textAlign: "center",
    top: "44%", // ✅ ให้ตัวหนังสืออยู่ตรงกลางป้าย
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "18%", // ✅ ให้ปุ่มอยู่ในตำแหน่งที่ถูกต้อง
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  startButton: {
    padding: "12px 25px",
    backgroundColor: "#B1FFC2",
    color: "black",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "24px",
    
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};
