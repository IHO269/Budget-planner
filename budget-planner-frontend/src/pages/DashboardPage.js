import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
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
      } catch (err) {
        console.error("Erreur lors de la récupération des transactions :", err);
        setError("Impossible de récupérer les transactions. Veuillez réessayer.");
      }
    };

    fetchTransactions();
  }, [navigate]);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Tableau de Bord</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Liste des Transactions</h2>
      {transactions.length === 0 ? (
        <p>Aucune transaction trouvée.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Montant (€)</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Catégorie</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{transaction.amount}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{transaction.category}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{transaction.description}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;