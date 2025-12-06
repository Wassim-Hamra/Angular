import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product';

// Composant standalone permettant d'afficher et filtrer des produits de para-pharmacie
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Section sémantique du composant -->
    <section class="product-filter" aria-labelledby="products-title">
      <header class="pf-header">
        <div>
          <h2 id="products-title" class="pf-title">Produits</h2>
          <p class="pf-subtitle">Catalogue de para-pharmacie</p>
        </div>
        <div class="pf-count" aria-live="polite">{{ filteredProducts.length }} résultat(s)</div>
      </header>

      <!-- Barre de recherche liée en bi-directionnel via [(ngModel)] -->
      <div class="search-wrapper">
        <span class="search-icon" aria-hidden="true">🔎</span>
        <input
          type="text"
          [(ngModel)]="searchTerm"
          placeholder="Rechercher un produit..."
          aria-label="Recherche produit"
          class="search-input"
        />
      </div>

      <!--
        Utilisation de @if / @else pour gérer l'état vide (aucun résultat)
        et @for avec track p.id pour optimiser le rendu
      -->
      @if (filteredProducts.length > 0) {
        <ul class="product-grid" role="list">
          @for (p of filteredProducts; track p.id) {
            <li class="card" role="listitem">
              <!-- Ruban rupture si stock = 0 -->
              @if (p.stock === 0) { <span class="ribbon">Rupture</span> }

              <div class="card-body">
                <div class="card-head">
                  <span class="category" aria-label="Catégorie">{{ p.category }}</span>
                  <span
                    class="stock"
                    [class.stock--out]="p.stock === 0"
                    [class.stock--low]="p.stock > 0 && p.stock < 5"
                    [class.stock--ok]="p.stock >= 5"
                    aria-label="Stock"
                  >Stock: {{ p.stock }}</span>
                </div>
                <h3 class="name">{{ p.name }}</h3>
                <div class="card-footer">
                  <span class="price">{{ p.price | currency:'TND':'symbol':'1.2-2' }}</span>
                </div>
              </div>
            </li>
          }
        </ul>
      } @else {
        <p class="no-results" data-testid="no-results">Aucun produit ne correspond à "{{ searchTerm }}"</p>
      }
    </section>
  `,
  styles: [
    `
    :host { --pf-border: #e5e7eb; --pf-muted: #6b7280; --pf-bg: #ffffff; --pf-chip: #f3f4f6; --pf-shadow: 0 4px 16px rgba(0,0,0,.08); }

    /* Conteneur principal du composant */
    .product-filter { margin: 2rem auto 0; padding: 1.25rem; border: 1px solid var(--pf-border); border-radius: 12px; background: var(--pf-bg); max-width: 1100px; }

    /* En-tête */
    .pf-header { display: flex; align-items: end; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
    .pf-title { margin: 0; font-size: 1.6rem; line-height: 1.2; }
    .pf-subtitle { margin: .25rem 0 0; color: var(--pf-muted); }
    .pf-count { font-weight: 600; color: #374151; }

    /* Barre de recherche */
    .search-wrapper { position: relative; max-width: 420px; }
    .search-icon { position: absolute; left: .75rem; top: 50%; transform: translateY(-50%); font-size: .95rem; }
    .search-input { padding: .6rem .75rem .6rem 2rem; width: 100%; border: 1px solid #d1d5db; border-radius: 8px; outline: none; transition: box-shadow .2s, border-color .2s; }
    .search-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.15); }

    /* Grille des produits */
    .product-grid { list-style: none; padding: 0; margin: 1rem 0 0; display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }

    /* Carte produit */
    .card { position: relative; background: #fff; border: 1px solid var(--pf-border); border-radius: 12px; box-shadow: var(--pf-shadow); overflow: hidden; transition: transform .18s ease, box-shadow .18s ease; }
    .card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,.1); }
    .card-body { padding: .9rem; display: grid; gap: .6rem; }
    .card-head { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }

    .name { margin: 0; font-size: 1.05rem; line-height: 1.25; }
    .price { font-weight: 700; color: #111827; }
    .category { background: var(--pf-chip); padding: .1rem .5rem; border-radius: 999px; font-size: .78rem; color: #374151; }

    /* Indicateur de stock avec code couleur */
    .stock { padding: .1rem .5rem; border-radius: 999px; font-weight: 700; font-size: .78rem; }
    .stock--out { color: #991b1b; background: #fee2e2; border: 1px solid #fecaca; }
    .stock--low { color: #92400e; background: #ffedd5; border: 1px solid #fed7aa; }
    .stock--ok { color: #065f46; background: #d1fae5; border: 1px solid #a7f3d0; }

    .card-footer { display: flex; align-items: center; justify-content: space-between; }

    /* Ruban de rupture */
    .ribbon { position: absolute; right: -40px; top: 10px; background: #ef4444; color: white; font-weight: 700; font-size: .75rem; transform: rotate(45deg); padding: .2rem 2.2rem; box-shadow: 0 4px 10px rgba(0,0,0,.15); }

    /* État vide */
    .no-results { font-style: italic; color: var(--pf-muted); margin-top: .75rem; }

    @media (max-width: 520px) {
      .pf-header { align-items: start; flex-direction: column; }
      .pf-count { align-self: flex-start; }
      .search-wrapper { width: 100%; max-width: none; }
    }
    `
  ]
})
export class ProductFilterComponent {
  // Modèle de recherche lié au champ input
  searchTerm = '';

  // Données statiques (au moins 5 produits), avec catégories variées et un produit en rupture (stock = 0)
  products: Product[] = [
    { id: 1, name: 'Gel Hydroalcoolique', price: 4.99, category: 'Hygiène', stock: 12 },
    { id: 2, name: 'Vitamine C 1000mg', price: 9.5, category: 'Compléments', stock: 3 },
    { id: 3, name: 'Thermomètre Digital', price: 14.9, category: 'Matériel', stock: 0 },
    { id: 4, name: 'Crème Solaire SPF50', price: 17.99, category: 'Dermocosmétique', stock: 8 },
    { id: 5, name: 'Spray Nasal', price: 6.49, category: 'ORL', stock: 2 },
    { id: 6, name: 'Shampooing Doux', price: 7.99, category: 'Hygiène', stock: 15 },
    // Produits additionnels (ne pas inclure d'autre nom contenant "gel" pour garder les tests stables)
    { id: 7,  name: 'Baume à Lèvres', price: 3.99, category: 'Dermocosmétique', stock: 25 },
    { id: 8,  name: 'Complément Magnésium', price: 11.9, category: 'Compléments', stock: 6 },
    { id: 9,  name: 'Brosse à Dents Souple', price: 2.49, category: 'Hygiène', stock: 40 },
    { id: 10, name: 'Coussin Chauffant', price: 29.9, category: 'Matériel', stock: 4 },
    { id: 11, name: 'Tensiomètre Poignet', price: 39.9, category: 'Matériel', stock: 5 },
    { id: 12, name: 'Crème Hydratante Visage', price: 12.5, category: 'Dermocosmétique', stock: 9 },
    { id: 13, name: "Huile d'Amande Douce", price: 8.99, category: 'Dermocosmétique', stock: 18 },
    { id: 14, name: 'Bandes Élastiques', price: 5.49, category: 'Matériel', stock: 7 },
    { id: 15, name: 'Solution Micellaire', price: 6.99, category: 'Hygiène', stock: 13 }
  ];

  // Propriété calculée (getter): retourne la liste filtrée dynamiquement selon la recherche
  // - insensible à la casse via toLowerCase()
  // - ignore les espaces superflus via trim()
  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.products;
    return this.products.filter(p => p.name.toLowerCase().includes(term));
  }
}
