import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../../components/BackgroundKhloyB"; 
import fluteImage from "../../../picture/ขลุ่ย note.png"; 
import signImage from "../../../picture/ป้าย.png"; 

const questions = [
  { note: "โด", correctFingers: [true, true, true, true, true, true, true, true], correctBlow: "เบา" },
  { note: "เร (สูง)", correctFingers: [false, true, true, true, true, true, true, true], correctBlow: "แรง" },
  { note: "ที", correctFingers: [false, false, false, false, false, false, true, true], correctBlow: "เบา" },
];

export default function FluteQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedFingers, setSelectedFingers] = useState(Array(8).fill(false));
  const [selectedBlow, setSelectedBlow] = useState(null);
  const [score, setScore] = useState(0);

  const holePositions = [
    { top: "25%", left: "21.3%" },
    { top: "25%", left: "28%" },
    { top: "25%", left: "34.5%" },
    { top: "25%", left: "40.8%" },
    { top: "25%", left: "47.2%" },
    { top: "25%", left: "53.3%" },
    { top: "57%", left: "59.1%" },
    { top: "25%", left: "64.5%" },
  ];

  const handleFingerToggle = (index) => {
    const newFingers = [...selectedFingers];
    newFingers[index] = !newFingers[index];
    setSelectedFingers(newFingers);
  };

  const handleSubmit = () => {
    const { correctFingers, correctBlow } = questions[currentQuestion];

    const isCorrect =
      selectedFingers.every((val, i) => val === correctFingers[i]) &&
      selectedBlow === correctBlow;

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedFingers(Array(8).fill(false));
      setSelectedBlow(null);
    } else {
      navigate("/ResultTestBeforeKhloy", { state: { score: isCorrect ? score + 1 : score, total: questions.length } });
      
      
    }
  };

  return (
    <Background>
      <div style={styles.quizContainer}>
        
        {/* ✅ กล่องอธิบายวิธีการเล่น */}
        <div style={styles.descriptionBox}>
          <div style={styles.descriptionRow}>
            <div style={{ ...styles.colorIndicator, backgroundColor: "red" }}></div>
            <p style={styles.descriptionText}>รูที่ขึ้นสีแดงต้องปิดเวลาเล่นโน้ต</p>
          </div>
          <div style={styles.descriptionRow}>
            <div style={{ ...styles.colorIndicator, backgroundColor: "black" }}></div>
            <p style={styles.descriptionText}>รูที่ขึ้นสีดำไม่ต้องปิด</p>
          </div>
        </div>

        {/* ✅ หัวข้อด้านบน */}
        <div style={styles.header}>
          <div style={styles.redSignContainer}>
            <img src={signImage} alt="ป้ายข้อความ" style={styles.redSignImage} />
            <p style={styles.redSignText}>แบบทดสอบก่อนเรียน</p>
          </div>
          <div style={styles.yellowBar}>
            <span style={styles.noteText}>กดโน้ตตัว {questions[currentQuestion].note}</span>
            <span style={styles.subText}>กดที่รูที่ต้องปิดเวลาเล่นโน้ตและเลือกวิธีการเป่า</span>
          </div>
        </div>

        <div style={styles.testContainer}>
          <div style={styles.fluteBox}>
            <img src={fluteImage} alt="ขลุ่ย" style={styles.fluteImage} />
            {selectedFingers.map((isPressed, i) => (
              <div
                key={i}
                style={{
                  ...styles.hole,
                  ...holePositions[i],
                  backgroundColor: isPressed ? "red" : "black",
                }}
                onClick={() => handleFingerToggle(i)}
              />
            ))}
          </div>

          {/* ✅ ตัวเลือกเป่า (เบา/แรง) กลับมาแล้ว */}
          <div style={styles.blowOptions}>
            <label style={styles.radioLabel}>
              <input type="radio" name="blow" value="เบา" onChange={() => setSelectedBlow("เบา")} />
              <span style={styles.radioText}>เป่าเบา</span>
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="blow" value="แรง" onChange={() => setSelectedBlow("แรง")} />
              <span style={styles.radioText}>เป่าแรง</span>
            </label>
          </div>

          <button onClick={handleSubmit} style={styles.button}>
            ไปหน้าต่อไป
          </button>
        </div>
      </div>
    </Background>
  );
}

const styles = {
    quizContainer: {
      textAlign: "center",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      zIndex: 1,
    },
    header: {
      position: "absolute",
      top: "-13%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      zIndex: 2,
    },
    redSignContainer: {
      position: "relative",
    },
    redSignImage: {
      width: "380px",
    },
    redSignText: {
      position: "absolute",
      fontSize: "21px",
      color: "white",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
    yellowBar: {
      backgroundColor: "#E8D098",
      padding: "30px 20px",
      borderRadius: "10px",
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      zIndex: 2,
    },
    noteText: {
      fontSize: "35px",
      fontWeight: "bold",
      marginRight: "10px",
    },
    subText: {
      fontSize: "24px",
      color: "#333",
    },
    descriptionBox: {
      position: "absolute",
      top: "20%",
      left: "20%",
      transform: "translateX(-50%)",
      backgroundColor: "#F8EADF",
      padding: "10px 20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "540px",
      textAlign: "left",
      zIndex: 3,
    },
    descriptionRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
    },
    colorIndicator: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      marginRight: "10px",
    },
    descriptionText: {
      fontSize: "22px",
      color: "#333",
    },
    // ✅ ปรับขนาดของ testContainer ให้เหมาะสมกับขลุ่ย
    testContainer: {
      backgroundColor: "#FFF5EC",
      padding: "20px",
      borderRadius: "15px",
      width: "1450px", // ✅ ลดขนาดลงให้เหมาะสมกับขลุ่ย
      height: "auto",
      marginTop: "300px", // ✅ เลื่อนกล่องลงมา
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    // ✅ ปรับตำแหน่งขลุ่ยให้อยู่ตรงกลาง
    fluteBox: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    fluteImage: {
      width: "90%", // ✅ ปรับขนาดขลุ่ยให้พอดีกับกล่อง
    },
    hole: {
      position: "absolute",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      cursor: "pointer",
      transition: "background-color 0.3s",
      zIndex: 3,
    },
    // ✅ ลดช่องว่างระหว่างตัวเลือกเป่าและปุ่มกด
    blowOptions: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    radioLabel: {
      fontSize: "20px",
    },
    radioText: {
      fontSize: "25px",
    },
    // ✅ ลดระยะห่างของปุ่ม
    button: {
      backgroundColor: "#98FB98",
      border: "none",
      padding: "12px 55px",
      cursor: "pointer",
      fontSize: "25px",
      borderRadius: "8px",
      marginTop: "10px",
    },
  };