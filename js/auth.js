/**
 * auth.js- GESTION DE L'AUTHENTIFICATION
 * Ce fichier gère l'inscription, la connexion et la déconnexion
 */

/**
 * Protège l'accès aux pages nécessitant une connexion
 */

function protectPage() {
  const currentPage = window.location.pathname;
  const loggedUser = localStorage.getItem("loggedUser");
  const protectedPages = ["choose.html", "result.html"];

  const isProtected = protectedPages.some((page) => currentPage.includes(page));

  if (isProtected && !loggedUser) {
    alert("Vous devez être connecté pour accéder à cette page !");
    window.location.href = "login.html";
  }
}

// Exécuter la protection au chargement
protectPage();

/**
 * Initialise le formulaire d'inscription
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  if (password.length < 6)
    return { valid: false, message: "Minimum 6 caractères" };
  if (!/[A-Z]/.test(password))
    return { valid: false, message: "Une majuscule requise" };
  if (!/[0-9]/.test(password))
    return { valid: false, message: "Un chiffre requis" };
  return { valid: true };
}

function initRegisterForm() {
  const registerForm = document.getElementById("registerForm");

  if (!registerForm) return;

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des valeurs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const pass = document.getElementById("password").value;
    const conf = document.getElementById("confirm").value;

    // Validation de l'email
    if (!validateEmail(email)) {
      alert("Format d'email invalide ! Exemple: nom@exemple.com !");
      return;
    }

    // Validation du mot de passe
    const passwordCheck = validatePassword(pass);
    if (!passwordCheck.valid) {
      alert("⚠️ " + passwordCheck.message);
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (pass !== conf) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Vérification si l'email existe déjà
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      alert("Cet email est déjà utilisé ! Essayez de vous connecter.");
      return;
    }

    // Enregistrement du nouvel utilisateur
    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Compte créé avec succès !");
    window.location.href = "login.html";
  });
}

/**
 * Initialise le formulaire de connexion
 */
function initLoginForm() {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des valeurs
    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();
    const pass = document.getElementById("loginPassword").value;

    // Validation de l'email
    if (!validateEmail(email)) {
      alert("Format d'email invalide !");
      return;
    }

    // Récupération de tous les utilisateurs
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Recherche de l'utilisateur
    const user = users.find((u) => u.email === email && u.pass === pass);

    if (!user) {
      alert("Email ou mot de passe incorrect !");
      return;
    }

    // Enregistrement de la session
    localStorage.setItem("loggedUser", user.name);
    localStorage.setItem("loggedEmail", user.email);

    alert("Connexion réussie ! Bienvenue " + user.name);
    window.location.href = "index.html";
  });
}

/**
 * Déconnecte l'utilisateur avec confirmation
 */
function logout() {
  const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

  if (confirmation) {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedEmail");
    alert("Vous êtes déconnecté !");
    window.location.href = "index.html";
  }
}

/**
 * Initialise les boutons de déconnexion
 */
function initLogoutButtons() {
  // Bouton de déconnexion spécifique (si existe)
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  // Bouton d'authentification dans la navbar
  const authBtn = document.getElementById("authBtn");
  const user = localStorage.getItem("loggedUser");

  if (authBtn && user) {
    authBtn.textContent = "Se déconnecter";
    authBtn.href = "#";

    authBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }
}

/**
 * Affiche le message de bienvenue sur la page d'accueil
 */
function displayWelcomeMessage() {
  const user = localStorage.getItem("loggedUser");

  if (!user) return;

  const header = document.querySelector(".hero-content");
  if (!header) return;

  // Vérifier si le message n'existe pas déjà
  if (document.getElementById("welcomeMessage")) return;

  // Créer et ajouter le message de bienvenue
  const welcomeMsg = document.createElement("p");
  welcomeMsg.id = "welcomeMessage";
  welcomeMsg.className = "mt-3 fs-4 text-white";
  welcomeMsg.innerHTML = "Bienvenue, <strong>" + user + "</strong> !";
  header.appendChild(welcomeMsg);
}

/**
 * Ajoute un indicateur utilisateur dans la navbar
 */
function addUserIndicator() {
  const user = localStorage.getItem("loggedUser");
  const navbar = document.querySelector(".navbar-nav");

  if (!user || !navbar) return;

  // Vérifier si l'indicateur n'existe pas déjà
  if (document.getElementById("userIndicator")) return;

  // Créer et ajouter l'indicateur
  const userIndicator = document.createElement("li");
  userIndicator.id = "userIndicator";
  userIndicator.className = "nav-item";
  userIndicator.innerHTML = `
    <span class="nav-link text-success fw-bold">
      👤 ${user}
    </span>
  `;
  navbar.appendChild(userIndicator);
}

/**
 * Initialise le lien "Mot de passe oublié"
 */
function initForgotPassword() {
  const link = document.getElementById("forgotLink");
  const notif = document.getElementById("notification");

  if (!link || !notif) return;

  link.addEventListener("click", function (e) {
    e.preventDefault();

    notif.classList.add("show");

    setTimeout(() => {
      notif.classList.remove("show");
    }, 3000);
  });
}
// bouton " Commencer l'aventure"
function initStartAdventureButton() {
  const startBtn = document.getElementById("startBtn");
  if (!startBtn) return;

  const user = localStorage.getItem("loggedUser");

  if (user) {
    startBtn.href = "choose.html";
  } else {
    startBtn.href = "login.html";
  }
}

/**
 * Initialise toutes les fonctionnalités au chargement de la page
 */
window.addEventListener("DOMContentLoaded", () => {
  // Initialiser les formulaires
  initRegisterForm();
  initLoginForm();

  // Initialiser la déconnexion
  initLogoutButtons();

  // Afficher les informations utilisateur
  displayWelcomeMessage();
  addUserIndicator();

  // Initialiser le mot de passe oublié
  initForgotPassword();
  initStartAdventureButton();
});
