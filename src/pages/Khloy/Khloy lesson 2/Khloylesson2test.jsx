import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../../components/BackgroundKhloyB";

const questions = [
    {
      question: "ส่วนที่ลูกศรสีแดงชี้คืออะไร?",
      options: ["ข้อต่อ", "รูดั้งเสียง", "รูเร่งเสียง"],
      correct: 1,
      image: "src/picture/องค์ประกอบ1.png", // ✅ เพิ่มภาพที่เกี่ยวข้องกับคำถาม
    },
    {
      question: "ส่วนที่ลูกศรสีแดงชี้คืออะไร?",
      options: ["รูเป่า", "รูเร่งเสียง", "รูปากนกแก้ว"],
      correct: 2,
      image: "src/picture/องค์ประกอบ2.png", // ✅ เพิ่มภาพที่เกี่ยวข้องกับคำถาม
    },
    {
      question: "ส่วนที่ลูกศรสีแดงชี้คืออะไร?",
      options: ["รูเป่า", "รูเร่งเสียง", "รูปากนกแก้ว"],
      correct: 0,
      image: "src/picture/องค์ประกอบ3.png", // ✅ เพิ่มภาพที่เกี่ยวข้องกับคำถาม
    },
];

export default function Khloylesson2test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState(["", "", ""]);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0 && selectedOption === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, selectedOption]);

  const handleTimeout = () => {
    const correctAnswer = questions[currentQuestion].correct;
    let newColors = ["", "", ""];
    newColors[correctAnswer] = "green"; // ✅ ไฮไลต์คำตอบที่ถูกต้อง

    setButtonColors(newColors);
    setSelectedOption("timeout");

    setTimeout(() => moveToNextQuestion(false), 4000); // ❌ ไม่เพิ่มคะแนน
};

const moveToNextQuestion = (isCorrect) => {
    setSelectedOption(null);
    setButtonColors(["", "", ""]);
    setTimeLeft(10);

    if (isCorrect) {
        setScore((prevScore) => prevScore + 1); // ✅ เพิ่มคะแนนเมื่อถูก
    }

    if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
    } else {
        // ✅ ตรวจสอบคะแนนก่อนนำทาง
        setTimeout(() => {
          const finalScore = score + (isCorrect ? 1 : 0);
        
          if (finalScore === 3) {
            navigate("/Khloylesson2score3", { state: { score: finalScore } });
          } else if (finalScore === 2) {
            navigate("/Khloylesson2score2", { state: { score: finalScore } });
          } else if (finalScore === 1) {
            navigate("/Khloylesson2score1", { state: { score: finalScore } });
          } else {
            navigate("/Khloylesson2score0", { state: { score: finalScore } }); // ✅ เพิ่มกรณี 0 คะแนน
          }
        }, 500);
    }
};

const handleAnswerClick = (index) => {
    if (selectedOption !== null) return;

    const correctAnswer = questions[currentQuestion].correct;
    let newColors = ["", "", ""];

    if (index === correctAnswer) {
        newColors[index] = "green";
        setButtonColors(newColors);
        setSelectedOption(index);
        setTimeout(() => moveToNextQuestion(true), 4000); // ✅ ตอบถูก ได้ 1 คะแนน
    } else {
        newColors[index] = "red";
        newColors[correctAnswer] = "green";
        setButtonColors(newColors);
        setSelectedOption(index);
        setTimeout(() => moveToNextQuestion(false), 4000); // ❌ ตอบผิด ไม่เพิ่มคะแนน
    }
  };


  return (
    <Background>
      <div style={styles.page}>
        {/* หัวข้อ */}
        <div style={styles.titleContainer}>
          <img src="src/picture/ป้าย.png" alt="แบบทดสอบก่อนเรียน" style={styles.titleImage} />
          <p style={styles.titleText}>บทเรียนที่ 2</p>
        </div>

        <div style={styles.lessonContainer}>
          <p style={styles.lessonText}>องค์ประกอบ</p>
        </div>

        <div style={styles.quizContainer1}>
          <p style={styles.questionText}>
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </p>

          
          {/* ✅ เพิ่มภาพ */}
          <img src={questions[currentQuestion].image} alt="คำถามภาพ" style={styles.questionImage} />

          
          


          {/* ตัวจับเวลา */}
          <p style={styles.timerText}>เวลาที่เหลือ: {timeLeft} วินาที</p>

          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              style={{ ...styles.optionButton, backgroundColor: buttonColors[index] }}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          ))}
        </div>

        <div style={styles.yellowBox}>
          <p style={styles.yellowText}></p>
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

  quizContainer1: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "600px",
    height: "540px",
    position: "absolute",
    top: "26%", 
    left: "74%",
    transform: "translateX(-50%)",
    zIndex: 2,
  },

  questionText: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  timerText: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "red",
    marginBottom: "15px",
  },
  optionButton: {
    display: "block",
    width: "100%",
    height: "19%",
    padding: "20px",
    margin: "5px 0",
    borderRadius: "40px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "30px",
  },

  lessonContainer: {
    position: "absolute",
    top: "7%", 
    left: "5%",
    width: "90%",
    backgroundColor: "#D9CB86",
    padding: "15px 30px",
    borderRadius: "10px",
    fontSize: "40px",
    justifyContent: "center",  
    alignItems: "center",
    textAlign: "center",
    color: "black",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  lessonText: {
    margin: 0,
    color: "black",
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

  yellowBox: {
    position: "absolute",
    top: "23%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "1400px",
    height: "600px",
    backgroundColor: "#F6D682",
    padding: "15px",
    borderRadius: "30px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    
    zIndex: 0,
  },
  yellowText: {
    margin: 0,
    color: "black",
  },

  questionImage: {
    width: "1000px",
    height: "auto",
    objectFit: "contain", 
    position: "absolute",
    top: "0%",
    left: "-140%",
  },

  
};