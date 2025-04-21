import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import micOnImg from "../../../picture/micon.png";
import micOffImg from "../../../picture/micoff.png";
import Background from "../../../components/BackgroundKhloyB";

const NOTE_FREQUENCIES = {
  D: [450, 470],
};

function getMainFrequency(timeDomainData, sampleRate) {
  const bufferSize = timeDomainData.length;
  const realPart = new Float32Array(bufferSize);
  const imagPart = new Float32Array(bufferSize);

  for (let i = 0; i < bufferSize; i++) {
    realPart[i] = timeDomainData[i];
    imagPart[i] = 0;
  }

  for (let k = 0; k < bufferSize; k++) {
    let sumReal = 0;
    let sumImag = 0;
    for (let n = 0; n < bufferSize; n++) {
      const angle = (2 * Math.PI * k * n) / bufferSize;
      sumReal += timeDomainData[n] * Math.cos(angle);
      sumImag -= timeDomainData[n] * Math.sin(angle);
    }
    realPart[k] = sumReal;
    imagPart[k] = sumImag;
  }

  let maxMag = -1;
  let peakIndex = -1;
  for (let i = 0; i < bufferSize / 2; i++) {
    const mag = Math.sqrt(realPart[i] ** 2 + imagPart[i] ** 2);
    if (mag > maxMag) {
      maxMag = mag;
      peakIndex = i;
    }
  }

  const freqResolution = sampleRate / bufferSize;
  return peakIndex * freqResolution;
}

function speakMessage(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.lang = 'th-TH';
  synth.speak(utterThis);
}

export default function KhloyLesson3Test() {
  const [micOn, setMicOn] = useState(false);
  const [detectedNote, setDetectedNote] = useState("-");
  const [detected, setDetected] = useState([false, false, false, false, false]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const micOnRef = useRef(false);
  const detectedRef = useRef([false, false, false, false, false]);
  const lastSpokenRef = useRef("");
  const navigate = useNavigate();

  const toggleMic = async () => {
    if (micOn) {
      micOnRef.current = false;
      setMicOn(false);
      stopStream();
      audioContextRef.current?.close();
    } else {
      micOnRef.current = true;
      setMicOn(true);
      setDetected([false, false, false, false, false]);
      detectedRef.current = [false, false, false, false, false];
      setDetectedNote("-");
      setFeedbackText("");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 8192;
        source.connect(analyser);

        listenLoop(analyser, audioCtx);
      } catch (err) {
        console.error("\u274C \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E21\u0E42\u0E04\u0E23\u0E42\u0E1F\u0E19\u0E44\u0E14\u0E49:", err);
        setMicOn(false);
        micOnRef.current = false;
      }
    }
  };

  const stopStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const listenLoop = (analyser, audioCtx) => {
    const bufferLength = analyser.fftSize;
    const timeDomainData = new Float32Array(bufferLength);

    const loop = () => {
      if (!micOnRef.current) return;

      analyser.getFloatTimeDomainData(timeDomainData);
      const mainFreq = getMainFrequency(timeDomainData, audioCtx.sampleRate);
      console.log(`\uD83C\uDFA7 \u0E04\u0E27\u0E32\u0E21\u0E16\u0E35\u0E48: ${mainFreq.toFixed(2)} Hz`);

      const [low, high] = NOTE_FREQUENCIES.D;
      let message = "";
      if (mainFreq >= low && mainFreq <= high) {
        setDetectedNote("ด");
        const current = [...detectedRef.current];
        const idx = current.findIndex((d) => d === false);
        if (idx !== -1) {
          current[idx] = true;
          detectedRef.current = current;
          setDetected(current);
        }
        message = "เป่าถูกต้องแล้วค่ะ เก่งมาก!";
      } else {
        setDetectedNote("-");
        message = "ยังไม่ใช่เสียงโดนะคะ ลองใหม่อีกครั้งค่ะ";
      }

      if (message !== lastSpokenRef.current) {
        setFeedbackText(message);
        speakMessage(message);
        lastSpokenRef.current = message;
      }

      if (detectedRef.current.every((d) => d)) {
        console.log("\u2705 \u0E15\u0E23\u0E27\u0E08\u0E08\u0E1A\u0E04\u0E23\u0E1A 5 \u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E25\u0E49\u0E27");
        setShowNextButton(true);
        return;
      }

      requestAnimationFrame(loop);
    };

    loop();
  };

  return (
    <Background>
      <div style={styles.page}>
        <div style={styles.titleContainer}>
          <img src="src/picture/\u0E1B\u0E49\u0E32\u0E22.png" alt="แบบทดสอบก่อนเรียน" style={styles.titleImage} />
          <p style={styles.titleText}>บทเรียนที่ 3</p>
        </div>

        <div style={styles.KhloyContainer}></div>

        <div style={styles.lessonContainer}>
          <p style={styles.lessonText}>การเล่นโน้ตเสียงต่ำ</p>
        </div>

        <h2 style={styles.subTitle}>วิธีการกดโน้ตตัวโด</h2>
        <img src="src/picture/Khloyโด.png" alt="การกดโน้ตโด" style={styles.image} />

        <div style={styles.boxContainer}>
          {detected.map((isGreen, i) => (
            <div
              key={i}
              style={{
                ...styles.box,
                backgroundColor: isGreen ? "#90EE90" : "#D3D3D3",
              }}
            >
              ด
            </div>
          ))}
        </div>

        <button onClick={toggleMic} style={styles.micButton}>
          <img
            src={micOn ? micOnImg : micOffImg}
            alt={micOn ? "เปิดไมค์" : "ปิดไมค์"}
            style={styles.micIcon}
          />
        </button>

        {showNextButton && (
          <button style={styles.nextButton} onClick={() => navigate("/Khloylesson3Testเร")}>ไปหน้าถัดไป</button>
        )}

        {feedbackText && (
          <div style={{ position: "absolute", bottom: 20, fontSize: 24, color: "#333" }}>{feedbackText}</div>
        )}
      </div>
    </Background>
  );
}

const styles = {

  KhloyContainer: {
    position: "absolute",
    top: "25%", 
    left: "39%",
    width: "45%",
    height: "20%",
    backgroundColor: "#F6D682",
    padding: "15px 30px",
    borderRadius: "10px",
    fontSize: "40px",
    justifyContent: "center",  
    alignItems: "center",
    textAlign: "center",
    color: "black",
    opacity: 0.7,
    
  },

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
    textAlign: "center",
    paddingTop: "40px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginBottom: "10px",
  },
  lessonBox: {
    backgroundColor: "#D11E1E",
    color: "white",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  title: {
    backgroundColor: "#E8D098",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "26px",
    margin: 0,
  },
  subTitle: {
    
    fontSize: "30 px",
    color: "#444",
    position: "absolute",
    top: "25%", 
    left: "45%",
  },
  image: {
    position: "absolute",
    top: "30%", 
    left: "34%",
    width: "900px",
    margin: "px 0",
  },
  micButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  micIcon: {
    width: "300px",
    height: "200px",
    position: "absolute",
    top: "75%", 
    left: "55%",
  },
  boxContainer: {
    
    top: "55%",
    left: "41%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    
  },
  box: {
    width: 120,
    height: 160,
    fontSize: 80,
    fontWeight: "bold",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"  ,
    
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
    top: "-36.8%", 
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

  nextButton: {
    position: "absolute",
    top: "85%",
    left: "87%",
    transform: "translateX(-50%)",
    padding: "15px 30px",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    
    zIndex: 4,
  },

};
