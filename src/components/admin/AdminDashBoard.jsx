import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const AdminDashBoard = () => {

  const [showPopup, setShowPopup] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "adminDash";

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      setShowPopup(false);
      setError("");
    } else {
      setError("Mot de passe d'accès incorrect !");
    }
  };

  return (
    <div>
      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>Confirmation requise</h2>
            <p>Veuillez entrer le mot de passe pour accéder à cette page :</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Confirmer
              </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
          </div>
        </div>
      )}

      {!showPopup && <section className='mx-1 md:py-4 md:mx-48 lg:mx-64 md:text-xl mt-28'>
            <div className='border bg-[brown] text-white text-center py-2  '>
              <h1>Module d'administration</h1>
            </div>
            <div className='ml-24 font-bold text-[brown] text-lg py-2'>
              <h1>____Management___*</h1>
            </div>
            <ul className='flex flex-col  border text-center text-[brown] text-lg'>
              <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/user">Utilisateurs</Link>
              <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/plot">Parcelles</Link>
              <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/cooperative">Cooperatives</Link>
              <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/exporter">Exportateurs</Link>
              
            </ul>
          </section>}
    </div>
  )
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default AdminDashBoard
