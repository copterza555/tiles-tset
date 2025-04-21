import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import micOnImg from "../../../picture/micon.png";
import micOffImg from "../../../picture/micoff.png";
import Background from "../../../components/BackgroundKhloyB"; // พื้นหลังตามธีม

const NOTE_FREQUENCIES = {
  D: [565, 590],
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

export default function Khloylesson3testมี() {
  const [micOn, setMicOn] = useState(false);
  const [detectedNote, setDetectedNote] = useState("-");
  const [detected, setDetected] = useState([false, false, false, false, false]);
  const [showNextButton, setShowNextButton] = useState(false);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const micOnRef = useRef(false);
  const detectedRef = useRef([false, false, false, false, false]);
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
        console.error("❌ ไม่สามารถเปิดไมโครโฟนได้:", err);
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
      console.log(`🎧 ความถี่: ${mainFreq.toFixed(2)} Hz`);

      const [low, high] = NOTE_FREQUENCIES.D;
      if (mainFreq >= low && mainFreq <= high) {
        setDetectedNote("ด");
        const current = [...detectedRef.current];
        const idx = current.findIndex((d) => d === false);
        if (idx !== -1) {
          current[idx] = true;
          detectedRef.current = current;
          setDetected(current);
        }
      } else {
        setDetectedNote("-");
      }

      if (detectedRef.current.every((d) => d)) {
        console.log("✅ ตรวจจับครบ 5 ครั้งแล้ว");
        setShowNextButton(true); // 👈 เพิ่มตรงนี้
        return;
      }

      requestAnimationFrame(loop);
    };


    loop();
  };

  return (
    <Background>
      <div style={styles.page}>
        {/* หัวข้อ */}
        <div style={styles.titleContainer}>
          <img src="src/picture/ป้าย.png" alt="แบบทดสอบก่อนเรียน" style={styles.titleImage} />
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
              ม
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
          <button style={styles.nextButton} onClick={() => navigate("/Khloylesson3testฟา")}>
            ไปหน้าถัดไป
          </button>
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
