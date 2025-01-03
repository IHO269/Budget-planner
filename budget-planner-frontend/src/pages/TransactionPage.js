import React, { useState, useEffect } from "react";
import { createTransaction, getTransactions } from "../services/transactionService";

const TransactionPage = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Alimentation");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [transactions, setTransactions] = useState([]);
  const [feedback, setFeedback] = useState(null); // État pour stocker le message de retour

  // Charger les transactions à l'initialisation
  useEffect(() => {
    const fetchTransactions = async () => {
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    };

    fetchTransactions();
  }, []);

  // Gérer l'ajout d'une transaction
  const handleAddTransaction = async () => {
    try {
      const newTransaction = {
        userId: "votre_userId", // Remplacez par un ID utilisateur valide
        amount: parseFloat(amount),
        category,
        description,
        date,
      };
  
      console.log("Transaction envoyée :", newTransaction); // Ajoutez ce log
      const response = await createTransaction(newTransaction);
  
      setTransactions([...transactions, response]);
      setFeedback({ type: "success", message: "Transaction ajoutée avec succès !" });
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la transaction :", error.response?.data || error.message);
      setFeedback({ type: "error", message: "Échec de l'ajout de la transaction. Vérifiez vos données." });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestion des Transactions</h1>
      <div>
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Alimentation">Alimentation</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddTransaction}>Ajouter</button>
      </div>

      {/* Affichage du message de retour */}
      {feedback && (
        <p style={{ color: feedback.type === "success" ? "green" : "red" }}>
          {feedback.message}
        </p>
      )}

      <h2>Liste des Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.amount}€ - {transaction.category} - {transaction.description} - {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionPage;