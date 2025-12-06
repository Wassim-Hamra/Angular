// Modèle de données d'un produit de para-pharmacie
// - id: identifiant unique (utilisé pour trackBy et les opérations)
// - name: nom du produit
// - price: prix TTC en dinars
// - category: catégorie (ex. "Hygiène", "Compléments", "Matériel")
// - stock: quantité disponible (0 = rupture)
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

