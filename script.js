function redirectToGame() {
    const player1Name = document.getElementById("Lbox").value;
    const player2Name = document.getElementById("Lbox").value;

    if (!player1Name || !player2Name) {
        alert("Please enter your name for both players.");
        return;
    }

    window.location.href = "login.html";
}