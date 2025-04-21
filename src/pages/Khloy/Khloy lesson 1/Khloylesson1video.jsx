import { Link } from "react-router-dom";
import Background from "../../../components/BackgroundKhloyB";

export default function Khloylesson1video() {
  return (
    <Background>
      <div style={styles.page}>
        
        {/* ป้ายหัวข้อแบบทดสอบ */}
        <div style={styles.titleContainer}>
          <img src="src/picture/ป้าย.png" alt="แบบทดสอบก่อนเรียน" style={styles.titleImage} />
          <p style={styles.titleText}>บทเรียนที่ 1</p>
        </div>

        {/* กล่องข้อความบทเรียนที่ 1 สีทอง */}
        <div style={styles.lessonContainer}>
          <p style={styles.lessonText}>ประวัติความเป็นมา</p>
        </div>

        <div style={styles.videoContainer}>
          <video style={styles.video} controls autoPlay muted>
            <source src="src/video/lesson1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* ปุ่มเริ่มทำแบบทดสอบ */}
        
        <div style={styles.buttonContainer}>
          <Link to="/Khloylesson1test" style={styles.startButton}>
            เริ่มต้นการทดสอบ
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
    top: "-38%", 
    left: "-35%", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  titleImage: {
    width: "450px",
    zIndex: 2,
    
    

  },
  titleText: {
    position: "absolute",
    fontSize: "30px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    top: "44%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    zIndex: 2,
  },

  /* ✅ กล่องข้อความสีทอง */
  lessonContainer: {
    position: "absolute",
    top: "7%", 
    left: "5%",
    width: "90%",
    backgroundColor: "#D9CB86", // ✅ สีทอง
    padding: "15px 30px",
    borderRadius: "10px",
    fontSize: "40px",
    justifyContent: "center",  
    alignItems: "center",
    textAlign: "center",
    color: "black",
    
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)", // ✅ เงาเล็กน้อย
  },
  lessonText: {
    margin: 0,
    color: "black",
  },

  /* ✅ ปุ่มเริ่มต้นการเรียน */
  buttonContainer: {
    position: "absolute",
    bottom: "10%", 
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
    fontSize: "30px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    
  },

  video: {
    width: "100%",
    borderRadius: "10px", // ✅ มุมโค้งนิดหน่อย
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
  },

  videoContainer: {
    position: "absolute",
    top: "20%", // ✅ อยู่ใต้ป้ายสีทอง
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%", // ✅ กว้าง 70% ของหน้าจอ
    display: "flex",
    justifyContent: "center",
  },
};
