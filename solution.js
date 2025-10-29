// --- Communication en temps réel avec la page parent (dual_game.html)
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

// Appelle cette fonction quand une partie se termine
function onLose() {
  sendGameResult("lose");
}
function onWin() {
  sendGameResult("win");
}
