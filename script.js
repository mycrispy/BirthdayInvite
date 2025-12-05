document.addEventListener('DOMContentLoaded', () => {

    const loginView = document.getElementById('login-view');
    const inviteView = document.getElementById('invite-view');
    const proceedBtn = document.getElementById('proceed-btn');
    const exitBtn = document.getElementById('exit-btn');
    const inviteCodeInput = document.getElementById('invite-code');
    const errorMessage = document.getElementById('error-message');
    const errorTextSpan = document.getElementById('error-text');

    // The hardcoded key
    const SECRET_KEY = "bbqnationparty";

    // Allow Enter key to trigger proceed
    inviteCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    proceedBtn.addEventListener('click', handleLogin);

    function handleLogin() {
        const inputVal = inviteCodeInput.value.trim();

        if (inputVal === "") {
            // Empty Box Error
            errorTextSpan.textContent = "No Invitation code is entered";
            errorMessage.classList.remove('hidden');
            verifyErrorShake();
            return;
        }

        if (inputVal === SECRET_KEY) {
            // Success
            // Hide error if visible
            errorMessage.classList.add('hidden');

            // Transition
            loginView.classList.remove('fade-in');
            loginView.style.opacity = '0';

            setTimeout(() => {
                loginView.classList.add('hidden');
                inviteView.classList.remove('hidden');
                inviteView.classList.add('fade-in');

                // Initialize icons again just in case (Lucide usually handles it but if new DOM showed up)
                if (window.lucide) lucide.createIcons();
            }, 400); // Wait for opacity transition

        } else {
            // Invalid Key Error
            errorTextSpan.textContent = "Invalid Key. Please try again!";
            errorMessage.classList.remove('hidden');

            // Shake animation for visual feedback
            verifyErrorShake();
        }
    }

    function verifyErrorShake() {
        loginView.classList.add('shake');
        setTimeout(() => {
            loginView.classList.remove('shake');
        }, 500);
    }

    exitBtn.addEventListener('click', () => {
        // Reloads the page to reset everything
        location.reload();
    });

});

// Add shake animation style dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
.shake {
  animation: shake 0.4s ease-in-out;
}
`;
document.head.appendChild(styleSheet);
