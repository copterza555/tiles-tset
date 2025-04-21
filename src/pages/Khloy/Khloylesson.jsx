import { Link } from "react-router-dom";
import Background from "../../components/Background";
import Header from "../../components/header";

export default function Khloylesson() {
  return (
    <>
      <Header />
      <Background>
        <div style={styles.page}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 style={styles.title}>บทเรียนของขลุ่ย</h1>

          {/* Grid ของบทเรียน */}
          <div style={styles.lessonGrid}>
            <div style={{ ...styles.lessonBlock, backgroundColor: "#FFD1D1" }}>
              <h2 style={styles.text1}>บทเรียนที่ 1</h2>
              <p style={styles.text2}>ประวัติและความเป็นมา</p>
            </div>
            <div style={{ ...styles.lessonBlock, backgroundColor: "#FFE0B2" }}>
              <h2 style={styles.text1}>บทเรียนที่ 2</h2>
              <p style={styles.text2}>องค์ประกอบ</p>
            </div>
            <div style={{ ...styles.lessonBlock, backgroundColor: "#FFF9B2" }}>
              <h2 style={styles.text1}>บทเรียนที่ 3</h2>
              <p style={styles.text2}>การเล่นโน้ตต่ำ</p>
            </div>
            <div style={{ ...styles.lessonBlock, backgroundColor: "#D1FFC6" }}>
              <h2 style={styles.text1}>บทเรียนที่ 4</h2>
              <p style={styles.text2}>การเล่นโน้ตสูง</p>
            </div>
            <div style={{ ...styles.lessonBlock, backgroundColor: "#B2E6FF" }}>
              <h2 style={styles.text1}>บทเรียนที่ 5</h2>
              <p style={styles.text2}>การตัดลม</p>
            </div>
            <div style={{ ...styles.lessonBlock, backgroundColor: "#C6B2FF" }}>
              <h2 style={styles.text1}>บทเรียนที่ 6</h2>
              <p style={styles.text2}>เล่นเป็นเพลง</p>
            </div>
          </div>

          {/* ปุ่มย้อนกลับ และ เริ่มต้นการเรียน */}
          <div style={styles.buttonContainer}>
            <Link to="/" style={styles.backButton}>ย้อนกลับ</Link>
            <Link to="/Startkhloy" style={styles.startButton}>เริ่มต้นการเรียน</Link>
          </div>
        </div>
      </Background>
    </>
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
    gap: "px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    backgroundColor: "white",
    padding: "8px 20px",
    borderRadius: "8px",
    marginTop: "2px",
    width: "97%",  // ✅ ปรับให้ยืดกว้างขึ้น
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // ✅ เพิ่มเงาให้ดูเด่นขึ้น
  },
  lessonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
  lessonBlock: {
    width: "200px",
    height: "165px",
    textAlign: "center",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  buttonContainer: {
    display: "flex",
    gap: "980px",
    marginTop: "20px",
  },
  backButton: {
    padding: "15px 25px",
    backgroundColor: "#7BC4D9",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "30px",
  },
  startButton: {
    padding: "15px 25px",
    backgroundColor: "#B1FFC2",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "30px",
    left: "60px",
    top: "0px",  // ✅ แก้เครื่องหมาย ";" เป็น ","
    position: "relative"  // ✅ ต้องกำหนด position เพื่อให้ top มีผล
  },

  text1: {
    fontSize: "25px"
  },

  text2: {
    fontSize: "25px"
  }
};
