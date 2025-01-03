import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";
import { useNavigate } from "react-router-dom";
import TransactionChart from "../components/TransactionChart";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [chartType, setChartType] = useState("pie");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const userId = JSON.parse(atob(token.split(".")[1])).id;
        const data = await getTransactions(userId);
        setTransactions(data);

        // Calculer le solde total
        const total = data.reduce((sum, transaction) => sum + transaction.amount, 0);
        setTotalBalance(total);
      } catch (err) {
        console.error("Erreur lors de la récupération des transactions :", err);
        setError("Impossible de récupérer les transactions. Veuillez réessayer.");
      }
    };

    fetchTransactions();
  }, [navigate]);

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Tableau de Bord</h1>

      {/* Carte principale affichant le solde total */}
      <div
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "20px",
        }}
      >
        Solde Total : {totalBalance.toLocaleString()} €
      </div>

      {/* Section des transactions */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Liste des Transactions</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {transactions.length === 0 ? (
          <p>Aucune transaction trouvée.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <p>
                  <strong>Montant :</strong> {transaction.amount} €
                </p>
                <p>
                  <strong>Catégorie :</strong> {transaction.category}
                </p>
                <p>
                  <strong>Description :</strong> {transaction.description}
                </p>
                <p>
                  <strong>Date :</strong> {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section des graphiques */}
      <section>
        <h2>Graphique des Transactions</h2>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ marginRight: "8px" }}>Type de Graphique :</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
        <TransactionChart transactions={transactions} chartType={chartType} />
      </section>
    </div>
  );
};

export default DashboardPage;