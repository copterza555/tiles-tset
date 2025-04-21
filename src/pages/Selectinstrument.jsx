import { Link } from "react-router-dom";
import Background from "../components/Background";

export default function SelectInstrument() {
  return (
    <Background>
      <div style={styles.page}>
        <div style={styles.container}>
          {/* เครื่องดนตรี 1 */}
          <div style={styles.card}>
            <img src="/src/picture/ซึง.png" alt="เครื่องดนตรี 1" style={styles.instrumentImage1} />
            <Link to="/learn/instrument1" style={styles.learnLink}>เริ่มต้นการเรียน</Link>
          </div>

          {/* เครื่องดนตรี 2 */}
          <div style={styles.card}>
            <img src="/src/picture/สะล้อ.png" alt="เครื่องดนตรี 2" style={styles.instrumentImage2} />
            <Link to="/Khloy/Khloyaloneorgroup" style={styles.learnLink}>เริ่มต้นการเรียน</Link>
          </div>

          {/* เครื่องดนตรี 3 */}
          <div style={styles.card}>
            <img src="/src/picture/ขลุ่ย.png" alt="เครื่องดนตรี 3" style={styles.instrumentImage3} />
            <Link to="/Khloyaloneorgroup" style={styles.learnLink}>เริ่มต้นการเรียน</Link>
          </div>
        </div>

        {/* ปุ่มย้อนกลับ */}
        <Link to="/" style={styles.backButton}>ย้อนกลับ</Link>
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
  container: {
    display: "flex",
    gap: "20px",
  },
  card: {
    width: "300px",
    height: "500px",
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  instrumentImage1: {
    width: "600px",
    transform: "rotate(90deg)", // หมุนรูปที่ 1
    transition: "transform 0.3s ease-in-out",
  },
  instrumentImage2: {
    width: "600px",
    transform: "rotate(90deg)", // รูปนี้ไม่หมุน
    transition: "transform 0.3s ease-in-out",
  },
  instrumentImage3: {
    width: "600px",
    transform: "rotate(90deg)", // หมุนรูปที่ 3
    transition: "transform 0.3s ease-in-out",
  },
  learnLink: {
    marginTop: "50px",
    padding: "10px 20px",
    backgroundColor: "#B1FFC2",
    color: "black",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "30px",
    display: "inline-block",
    textAlign: "center",
    zIndex: 10
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#7BC4D9",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "30px",
    left: "-600px",
    top: "20px",  // ✅ แก้เครื่องหมาย ";" เป็น ","
    position: "relative"  // ✅ ต้องกำหนด position เพื่อให้ top มีผล
  }
};
