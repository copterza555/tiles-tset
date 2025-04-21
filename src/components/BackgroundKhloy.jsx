export default function BackgroundKhloy({ children }) {
  return <div style={styles.background}>{children}</div>;
}
  
const styles = {
  background: {
    position: "absolute",  // ✅ ทำให้ background ครอบเต็มหน้าจอ
    top: 0,
    left: 0,
    width: "100vw",
    minHeight: "100vh", // ✅ ทำให้ขยายตามเนื้อหาได้
    backgroundImage: "url('/backgroundkhloy.png')", // ✅ Path ถูกต้อง (เอาออกจาก public)
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", // ✅ ป้องกันการซ้ำ
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: -1, // ✅ ส่งไปอยู่ข้างหลังเนื้อหา
  }
};
  