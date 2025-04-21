import { Link } from "react-router-dom";
import Background from "../../components/Background";

export default function Khloyhavedonthave() {
  return (
    
    <Background>
      <div style={styles.page}>
        <div style={styles.container}>
          {/* เรียนแบบเดี่ยว */}
          <div style={styles.card}>
            <img src="/src/picture/ขลุ่ยมี.png" alt="มีขลุ่ย" style={styles.image} />
            <h2 style={styles.fontSize1}>มีเครื่องดนตี</h2>
            <Link to="/Khloylesson" style={{ ...styles.learnLink, backgroundColor: "#A9D2FF" }}>
              เริ่มต้นการเรียน
            </Link>
          </div>

          {/* เรียนแบบกลุ่ม */}
          <div style={styles.card}>
            <img src="/src/picture/ขลุ่ยไม่มี.png" alt="ไม่มีขลุ่ย" style={styles.image} />
            <h2 style={styles.fontSize1}>ไม่มีเครื่องดนตรี</h2>
            <Link to="/learn/group" style={{ ...styles.learnLink, backgroundColor: "#FFB6C1" }}>
              เริ่มต้นการเรียน
            </Link>
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
    gap: "200px",
  },
  card: {
    width: "400px",
    height: "500px",
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  image: {
    width: "500px",
    marginBottom: "10px",
  },
  learnLink: {
    marginTop: "10px",
    padding: "10px 20px",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "30px",
    display: "inline-block",
    textAlign: "center",
    zIndex: 10
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#95D4DA",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "30px",
    left: "-600px",
    top: "20px",  // ✅ แก้เครื่องหมาย ";" เป็น ","
    position: "relative"  // ✅ ต้องกำหนด position เพื่อให้ top มีผล
  },

  fontSize1 :{
    fontSize:"30px"
  }
};
