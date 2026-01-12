const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const glider = document.getElementById('glider');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const formsFrame = document.querySelector('.forms-frame');

signupToggle.addEventListener('click', () => {
    // Move Glider Right
    glider.style.transform = 'translateX(100%)';
    
    // Text Color Updates
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');

    // Switch Forms
    loginForm.classList.remove('active-form');
    loginForm.style.transform = 'translateX(-20px)'; // Exit left
    
    setTimeout(() => {
        signupForm.classList.add('active-form');
        signupForm.style.transform = 'translateX(0)';
    }, 100);
    
    // Optional: Adjust height if forms differ significantly
    // formsFrame.style.height = '420px'; 
});

loginToggle.addEventListener('click', () => {
    // Move Glider Left
    glider.style.transform = 'translateX(0)';
    
    // Text Color Updates
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');

    // Switch Forms
    signupForm.classList.remove('active-form');
    signupForm.style.transform = 'translateX(20px)'; // Exit right
    
    setTimeout(() => {
        loginForm.classList.add('active-form');
        loginForm.style.transform = 'translateX(0)';
    }, 100);

    // Optional: Reset height
    // formsFrame.style.height = '380px';
});