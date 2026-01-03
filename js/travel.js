/**
 * travel.js
 * Gère :
 * - le choix de destination
 * - l'algorithme de recommandation
 * - l'affichage du résultat
 * - la protection des pages
 */

const travelForm = document.getElementById("travelForm");

if (travelForm) {
  travelForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const budget = document.getElementById("budget").value;
    const type = document.getElementById("type").value;
    const duree = document.getElementById("duree").value;

    console.log("📋 Formulaire soumis:", { budget, type, duree });

    let destination = {};

    // ========== ALGORITHME DE RECOMMANDATION ==========

    // BUDGET FAIBLE
    if (budget === "faible") {
      if (type === "plage") {
        if (duree === "court") {
          destination = {
            name: "Tunisie - Djerba",
            img: "../assets/resultat/tn1.jpg",
            desc: "Week-end parfait sur les plages de Djerba, petit budget, soleil garanti.",
          };
        } else if (duree === "moyen") {
          destination = {
            name: "Maroc - Agadir",
            img: "../assets/resultat/maroc.jpg",
            desc: "Une semaine de détente sur les plages d'Agadir à petit prix.",
          };
        } else {
          destination = {
            name: "Égypte - Hurghada",
            img: "../assets/resultat/egypte.jpg",
            desc: "Deux semaines de plage et mer Rouge, budget maîtrisé.",
          };
        }
      } else if (type === "culture") {
        if (duree === "court") {
          destination = {
            name: "Portugal - Lisbonne",
            img: "../assets/resultat/lisbonne.jpg",
            desc: "City break culturel de 3-5 jours dans la capitale portugaise.",
          };
        } else {
          destination = {
            name: "Maroc - Marrakech",
            img: "../assets/resultat/marrakech.jpg",
            desc: "Immersion culturelle dans la magie de Marrakech, budget accessible.",
          };
        }
      } else if (type === "aventure") {
        destination = {
          name: "Croatie",
          img: "../assets/resultat/croatie.jpg",
          desc: "Randonnées, parcs nationaux et côtes magnifiques à petit budget.",
        };
      } else if (type === "luxe") {
        destination = {
          name: "Grèce - Mykonos",
          img: "../assets/resultat/mykonos.jpg",
          desc: "Luxe accessible sur les îles grecques, charme méditerranéen.",
        };
      }
    }
    // BUDGET MOYEN
    else if (budget === "moyen") {
      if (type === "plage") {
        if (duree === "court") {
          destination = {
            name: "Espagne - Baléares",
            img: "../assets/resultat/baleares.jpg",
            desc: "Week-end sur les magnifiques plages de Majorque ou Ibiza.",
          };
        } else {
          destination = {
            name: "Thaïlande - Phuket",
            img: "../assets/resultat/phuket.jpg",
            desc: "Plages paradisiaques, eaux turquoise et budget raisonnable.",
          };
        }
      } else if (type === "culture") {
        if (duree === "court") {
          destination = {
            name: "Turquie - Istanbul",
            img: "../assets/resultat/istanbul.jpeg",
            desc: "City break culturel entre Europe et Asie, 3-5 jours.",
          };
        } else {
          destination = {
            name: "Turquie - Circuit complet",
            img: "../assets/resultat/turquie.jpeg",
            desc: "Mélange incroyable de culture, gastronomie et paysages sur 7-15 jours.",
          };
        }
      } else if (type === "aventure") {
        if (duree === "court") {
          destination = {
            name: "Islande",
            img: "../assets/resultat/islande.jpeg",
            desc: "Aventure express : volcans, geysers et aurores boréales en 3-5 jours.",
          };
        } else {
          destination = {
            name: "Japon",
            img: "../assets/resultat/japon.jpg",
            desc: "Aventure complète, culture unique, modernité et tradition.",
          };
        }
      } else if (type === "luxe") {
        destination = {
          name: "Italie - Côte Amalfitaine",
          img: "../assets/resultat/italie.jpeg",
          desc: "Luxe italien, paysages à couper le souffle, dolce vita.",
        };
      }
    }
    // BUDGET ÉLEVÉ
    else if (budget === "eleve") {
      if (type === "plage") {
        if (duree === "court") {
          destination = {
            name: "Seychelles",
            img: "../assets/resultat/sychelles.jpeg",
            desc: "Escapade luxueuse de 3-5 jours dans un paradis tropical.",
          };
        } else {
          destination = {
            name: "Maldives",
            img: "../assets/resultat/maldives.jpeg",
            desc: "Un paradis pour un voyage luxueux et relaxant de 7-15 jours.",
          };
        }
      } else if (type === "culture") {
        if (duree === "court") {
          destination = {
            name: "Émirats Arabes Unis - Dubaï",
            img: "../assets/resultat/dubai.jpg",
            desc: "Luxe et modernité extrême, expérience culturelle unique.",
          };
        } else {
          destination = {
            name: "Japon - Circuit Premium",
            img: "../assets/resultat/japon.jpeg",
            desc: "Culture raffinée, temples, gastronomie étoilée, séjour d'exception.",
          };
        }
      } else if (type === "aventure") {
        if (duree === "court") {
          destination = {
            name: "Norvège - Fjords",
            img: "../assets/resultat/norvege.jpg",
            desc: "Aventure luxueuse dans les fjords norvégiens en 3-5 jours.",
          };
        } else {
          destination = {
            name: "Nouvelle-Zélande",
            img: "../assets/resultat/new-zealand.jpg",
            desc: "Aventure ultime : montagnes, volcans, paysages époustouflants.",
          };
        }
      } else if (type === "luxe") {
        if (duree === "court") {
          destination = {
            name: "Monaco - Monte-Carlo",
            img: "../assets/resultat/monaco.jpg",
            desc: "Week-end de luxe absolu sur la Côte d'Azur.",
          };
        } else {
          destination = {
            name: "Polynésie Française - Bora Bora",
            img: "../assets/resultat/borabora.jpg",
            desc: "Le summum du luxe dans un paradis sur terre, 10-15 jours.",
          };
        }
      }
    }

    // DESTINATION PAR DÉFAUT si aucune correspondance
    if (!destination.name) {
      destination = {
        name: "Paris, France",
        img: "../assets/resultat/paris.jpg",
        desc: "La ville lumière convient à tous les budgets, durées et styles de voyage !",
      };
    }

    // Afficher la destination trouvée dans la console
    console.log("🎯 Destination trouvée:", destination);

    // Enregistrer la destination dans localStorage
    try {
      localStorage.setItem("destination", JSON.stringify(destination));
      console.log("✅ Destination enregistrée dans localStorage");
    } catch (error) {
      console.error("❌ Erreur lors de l'enregistrement:", error);
      alert("Erreur lors de l'enregistrement de la destination");
      return;
    }

    // Redirection vers la page de résultat
    console.log("🔄 Redirection vers result.html...");
    window.location.href = "result.html";
  });
}

/**
 * Affiche la destination sur result.html
 */
function displayResult() {
  console.log("📄 Page result.html chargée");

  // Vérifier que les éléments existent
  const destNameEl = document.getElementById("destName");
  const destImgEl = document.getElementById("destImg");

  if (!destNameEl || !destImgEl) {
    console.error("❌ Éléments DOM non trouvés sur result.html");
    return;
  }

  // Récupérer la destination depuis localStorage
  let dest = null;
  try {
    const destData = localStorage.getItem("destination");
    console.log("📦 Données localStorage:", destData);

    if (!destData) {
      console.warn("⚠️ Aucune destination dans localStorage");
      destNameEl.innerText = "Aucune destination trouvée";
      destImgEl.style.display = "none";
      return;
    }

    dest = JSON.parse(destData);
    console.log("✅ Destination récupérée:", dest);
  } catch (error) {
    console.error("❌ Erreur lors de la lecture localStorage:", error);
    destNameEl.innerText = "Erreur lors du chargement";
    destImgEl.style.display = "none";
    return;
  }

  // Vérifier que la destination est valide
  if (!dest || !dest.name) {
    console.warn("⚠️ Destination invalide");
    destNameEl.innerText = "Aucune destination trouvée";
    destImgEl.style.display = "none";
    return;
  }

  // Afficher les données
  try {
    destNameEl.innerText = dest.name;
    destImgEl.src = dest.img;
    destImgEl.alt = dest.name;
    destImgEl.style.display = "block";

    console.log("✅ Destination affichée avec succès");

    // Si vous voulez aussi afficher la description (optionnel)
    const destDescEl = document.getElementById("destDesc");
    if (destDescEl && dest.desc) {
      destDescEl.innerText = dest.desc;
      console.log("✅ Description affichée");
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'affichage:", error);
  }
}

// Exécuter l'affichage si on est sur result.html
if (document.getElementById("destName")) {
  displayResult();
}

/**
 * Vérifie que l'utilisateur est connecté
 */
document.addEventListener("DOMContentLoaded", function () {
  const loggedUser = localStorage.getItem("loggedUser");
  const currentPage = window.location.pathname;

  // Vérifier si on est sur une page protégée
  if (
    currentPage.includes("choose.html") ||
    currentPage.includes("result.html")
  ) {
    if (!loggedUser) {
      console.warn("⚠️ Accès refusé : utilisateur non connecté");
      localStorage.setItem(
        "redirectMessage",
        "⚠️ Vous devez être connecté pour accéder aux destinations !"
      );
      window.location.href = "index.html";
    } else {
      console.log("✅ Utilisateur connecté:", loggedUser);
    }
  }
});
