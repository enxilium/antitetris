import React from "react";

const AttackInfo = ({ attackName, attackDescription, gameDescription }) => {
    return (
        <div style={styles.panel}>
          <h2 style={styles.title}>Attack Activated!</h2>
          <h3 style={styles.attackName}>{attackName}</h3>
          <div style={styles.section}>
            <h4 style={styles.subtitle}>Attack Description</h4>
            <p style={styles.text}>{attackDescription}</p>
          </div>
          <div style={styles.section}>
            <h4 style={styles.subtitle}>Game Effect</h4>
            <p style={styles.text}>{gameDescription}</p>
          </div>
          {/* <button  style={styles.closeButton}>Close</button> */}
        </div>
      );
};

export default AttackInfo;


const styles = {
    panel: {
      width: "300px",
      padding: "20px",
      margin: "20px",
      backgroundColor: "#333",
      color: "#fff",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 20px",
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "1em",
      textAlign: "center",
      textTransform: "uppercase",
    },
    attackName: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#ff4c4c",
      textAlign: "center",
      marginBottom: "1em",
    },
    section: {
      marginBottom: "1em",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#ffd700",
    },
    text: {
      fontSize: "1rem",
      color: "#ccc",
    },
    closeButton: {
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "10px",
      backgroundColor: "#ff4c4c",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      marginTop: "10px",
      textAlign: "center"
    },
    attackButton: {
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "5px",
      backgroundColor: "#ff4c4c",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      marginTop: "20px",
    },
  };