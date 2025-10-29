// --- Communication avec dual_game.html pour affichage du résultat en temps réel
function sendGameResult(result) {
  if (window.parent !== window) {
    window.parent.postMessage({
      type: "gameResult",
      bones: bonesCount,
      chickens: howMuchChicken(),
      gain: gainDiv.textContent,
      solde: Solde,
      status: result
    }, "*");
  }
}

// Appel automatique après une victoire ou une défaite
function loseGame() {
  sendGameResult("lose");
}

function winGame() {
  sendGameResult("win");
}

// Exemple d’intégration : après avoir révélé tous les poulets ou cliqué sur un os
// Appelle loseGame() ou winGame() dans tes fonctions existantes selon le cas
