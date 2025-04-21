import Header from "../components/header";  // ✅ มี Header
import Background from "../components/Background";  // ✅ มี Background
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />  {/* ✅ Header ใช้เฉพาะหน้านี้ */}
      <Background>      
        <Link to="/Selectinstrument" style={styles.button}>เริ่มต้นการเรียน</Link>
      </Background>
    </>
  );
}

const styles = {
  text: { color: "Black", fontSize: "24px"},
  button: {
    padding: "15px 25px",
    fontSize: "28px",
    backgroundColor: "#B1FFC2",
    color: "black",
    textDecoration: "none",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    marginTop: "20px",
    left: "0px",
    top: "300px",  // ✅ แก้เครื่องหมาย ";" เป็น ","
    position: "relative"  // ✅ ต้องกำหนด position เพื่อให้ top มีผล
  }
};
