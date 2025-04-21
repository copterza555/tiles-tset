import React, { useEffect, useRef } from 'react';

export default function FrequencyVisualizer() {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function setupAudio() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      // ⏱ Interval สำหรับแสดงค่าความถี่ทุก 500ms
      intervalRef.current = setInterval(() => {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const maxIndex = dataArrayRef.current.reduce((maxIdx, val, idx, arr) =>
          val > arr[maxIdx] ? idx : maxIdx, 0);
        const frequency = maxIndex * (audioContextRef.current.sampleRate / analyserRef.current.fftSize);
        console.log(`🔊 ความถี่โดยประมาณ: ${frequency.toFixed(2)} Hz`);
      }, 500);

      // 🎨 วาดกราฟทุกเฟรม
      draw();
    }

    function draw() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const drawLoop = () => {
        requestAnimationFrame(drawLoop);

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const bufferLength = dataArrayRef.current.length;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArrayRef.current[i];
          ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };
      drawLoop();
    }

    setupAudio();

    return () => {
      clearInterval(intervalRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>🎛️ Real-time Frequency Analyzer</h2>
      <canvas ref={canvasRef} width={800} height={300} style={{ border: '1px solid #888' }} />
      <p>กราฟแสดงระดับพลังงานของแต่ละความถี่ในเสียง</p>
    </div>
  );
}
