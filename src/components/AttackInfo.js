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
      width: "320px",
      padding: "20px",
      margin: "20px",
      backgroundColor: "#1a1a1a", // Darker background for cybersecurity theme
      color: "#e0e0e0", // Light grey text for contrast
      borderRadius: "8px",
      boxShadow: "rgba(0, 0, 0, 0.7) 0px 0px 15px",
      border: "1px solid #444", // Subtle border for definition
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "1em",
      textAlign: "left", // Align text to the left
      textTransform: "uppercase",
      color: "#00ff00", // Green color for cybersecurity theme
    },
    attackName: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#ff3333", // Red color for alert
      textAlign: "left", // Align text to the left
      marginBottom: "1em",
    },
    section: {
      marginBottom: "1em",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#00ccff", // Blue color for emphasis
      textAlign: "left", // Align text to the left
    },
    text: {
      fontSize: "1rem",
      color: "#b0b0b0", // Slightly lighter grey for text
      textAlign: "left", // Align text to the left
    },
    closeButton: {
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "10px",
      backgroundColor: "#ff3333",
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
      backgroundColor: "#ff3333",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      marginTop: "20px",
    },
  };
