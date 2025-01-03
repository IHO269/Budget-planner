import React, { useState, useEffect } from "react";
//import axios from "axios";
import { getTransactions, createTransaction, deleteTransaction } from "../services/transactionService";
import { getCategories, createCategory, deleteCategory } from "../services/categoryService";
import { SketchPicker } from "react-color";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#cccccc");
  const [form, setForm] = useState({ amount: "", category: "", description: "", date: "" });
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  // Charger les catégories et transactions à partir du serveur
  useEffect(() => {
    const fetchTransactionsAndCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const userId = JSON.parse(atob(token.split(".")[1])).id;

        // Récupérer les transactions
        const transactionsData = await getTransactions(userId);
        setTransactions(transactionsData);

        // Récupérer les catégories
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };

    fetchTransactionsAndCategories();
  }, []);

  // Gestion du formulaire d'ajout de transactions
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async () => {
    if (!form.amount) {
      alert("Le montant est requis !");
      return;
    }
    if (!form.category) {
      alert("Veuillez sélectionner une catégorie !");
      return;
    }
    if (!form.description.trim()) {
      alert("La description est requise !");
      return;
    }
    if (!form.date) {
      alert("La date est requise !");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      const newTransaction = { ...form, amount: parseFloat(form.amount), userId };
      const addedTransaction = await createTransaction(newTransaction);
      setTransactions([...transactions, addedTransaction]);
      setForm({ amount: "", category: categories[0]?.name || "", description: "", date: "" });
    } catch (err) {
      console.error("Erreur lors de l'ajout de la transaction :", err.message);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      setTransactions(transactions.filter((t) => t._id !== transactionId));
      alert("Transaction supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression de la transaction :", err.message);
      alert("Impossible de supprimer la transaction. Veuillez réessayer.");
    }
  };
  

  // Gestion des catégories
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Le nom de la catégorie est requis !");
      return;
    }
  
    if (categories.some((cat) => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      alert("Cette catégorie existe déjà !");
      return;
    }
  
    try {
      const response = await createCategory({ name: newCategory.trim(), color: newCategoryColor });
      setCategories([...categories, response]);
  
      // Ajouter ou mettre à jour la couleur dans localStorage
      const existingColors = JSON.parse(localStorage.getItem("categoryColors")) || {};
      existingColors[newCategory.trim()] = newCategoryColor;
      localStorage.setItem("categoryColors", JSON.stringify(existingColors));
  
      setNewCategory("");
      setNewCategoryColor("#cccccc");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err.message);
      alert("Impossible d'ajouter la catégorie. Veuillez réessayer.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const categoryToDelete = categories.find((cat) => cat._id === categoryId);
      if (!categoryToDelete) return;
  
      await deleteCategory(categoryId);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
  
      // Supprimer la couleur de la catégorie du localStorage
      const existingColors = JSON.parse(localStorage.getItem("categoryColors")) || {};
      delete existingColors[categoryToDelete.name];
      localStorage.setItem("categoryColors", JSON.stringify(existingColors));
  
      alert("Catégorie supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression de la catégorie :", err.message);
      alert("Impossible de supprimer la catégorie. Veuillez réessayer.");
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Gestion des Transactions</h1>

      {/* Gestion des catégories */}
      <div style={{ marginBottom: "24px" }}>
        <h2>Gestion des Catégories</h2>
        <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
          {categories.map((category) => (
            <li key={category._id} style={{ marginBottom: "8px" }}>
              <span style={{ marginRight: "16px", color: category.color }}>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                style={{ backgroundColor: "#F44336", color: "white", border: "none", cursor: "pointer" }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            value={newCategory}
            placeholder="Nouvelle catégorie"
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={() => setColorPickerVisible(!colorPickerVisible)}>
            {colorPickerVisible ? "Fermer" : "Choisir une couleur"}
          </button>
          {colorPickerVisible && (
            <SketchPicker
              color={newCategoryColor}
              onChangeComplete={(color) => setNewCategoryColor(color.hex)}
            />
          )}
          <button onClick={handleAddCategory} style={{ backgroundColor: "#4CAF50", color: "white" }}>
            Ajouter
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout de transaction */}
      <div style={{ marginBottom: "24px" }}>
        <h2>Ajouter une Transaction</h2>
        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Montant"
          onChange={handleFormChange}
          style={{ marginRight: "8px" }}
        />
        {categories.length === 0 && (
            <p style={{ color: "red", marginBottom: "8px" }}>
            Veuillez ajouter une catégorie avant d'ajouter une transaction.
            </p>
        )}
        <select
         name="category"
         value={form.category}
         onChange={handleFormChange}
         style={{ marginRight: "8px" }}
         disabled={categories.length === 0} // Désactiver le select si aucune catégorie
        >
        {categories.length === 0 ? (
            <option value="">Aucune catégorie disponible</option>
        ) : (
            categories.map((category) => (
            <option key={category._id} value={category.name}>
                {category.name}
            </option>
            ))
        )}
        </select>
        <input
          type="text"
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleFormChange}
          style={{ marginRight: "8px" }}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleFormChange}
          style={{ marginRight: "8px" }}
        />
        <button
            onClick={handleAddTransaction}
            style={{
            backgroundColor: categories.length ? "#4CAF50" : "#ccc", // Griser le bouton si aucune catégorie
            color: "white",
            }}
            disabled={categories.length === 0} // Désactiver si aucune catégorie
        >
        Ajouter
        </button>
      </div>

      {/* Liste des transactions */}
      <h2>Liste des Transactions</h2>
      {transactions.length === 0 ? (
        <p>Aucune transaction trouvée.</p>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
            <button
              onClick={() => handleDeleteTransaction(transaction._id)}
              style={{ backgroundColor: "#F44336", color: "white", border: "none", cursor: "pointer" }}
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionPage;