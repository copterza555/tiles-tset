import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header style={styles.header}>
        <img src="/src/picture/TILES logo.png" alt="Logo" style={styles.logo} />
        <nav style={styles.navbar}>
          <Link to="/" style={{ ...styles.navButton, backgroundColor: '#ADD8E6', flexDirection: 'row' }}>
            <img src="/src/picture/home.png" alt="Home" style={styles.icon1} />
            <span style={styles.text}>หน้าหลัก</span>
          </Link>
          <Link to="/ซึง" style={{ ...styles.navButton, backgroundColor: '#F4A6A6', flexDirection: 'row' }}>
            <img src="/src/picture/ซึง.png" alt="ซึง" style={styles.icon} />
            <span style={styles.text}>ซึง</span>
          </Link>
          <Link to="/สะล้อ" style={{ ...styles.navButton, backgroundColor: '#E6B98E', flexDirection: 'row' }}>
            <img src="/src/picture/สะล้อ.png" alt="สะล้อ" style={styles.icon} />
            <span style={styles.text}>สะล้อ</span>
          </Link>
          <Link to="/Khloyaloneorgroup" style={{ ...styles.navButton, backgroundColor: '#D9C07A', flexDirection: 'row' }}>
            <img src="/src/picture/ขลุ่ย.png" alt="ขลุ่ย" style={styles.icon} />
            <span style={styles.text}>ขลุ่ย</span>
          </Link>
        </nav>
      </header>
    );
}

const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '110px',
      
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    logo: {
      height: '130px',
      marginLeft: '20px'
    },
    navbar: {
      display: 'flex',
      gap: '8px',
      marginLeft: '2px'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '25px',
      padding: '12px',
      borderRadius: '12px',
      textDecoration: 'none',
      color: 'black',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.3s',
      width: '300px',
      height: '70px',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
      flexDirection: 'row'
    },
    icon: {
      height: '120px'
    },
    icon1: {
      height: '55px'
    },
    text: {
      fontSize: '25px',
      textAlign: 'center'
    }
};
