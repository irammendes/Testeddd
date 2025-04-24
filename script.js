// Matrix effect for the background
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Set font properties
    const fontSize = 14;
    ctx.font = fontSize + 'px monospace';
    
    // Calculate columns
    const columns = Math.floor(canvas.width / fontSize);
    
    // Create drops array
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    // Matrix characters
    const matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    
    // Draw the matrix
    function draw() {
        // Set semi-transparent black background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color
        ctx.fillStyle = '#00ff41';
        
        // Loop through drops
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop if it reaches bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.font = fontSize + 'px monospace';
    });
    
    // Animation loop
    setInterval(draw, 35);
    
    // Demo functions
    window.generateDemoGames = function() {
        const gamesContainer = document.getElementById('generated-games');
        gamesContainer.innerHTML = '';
        
        // Generate 3 random games
        for (let i = 0; i < 3; i++) {
            const game = generateRandomGame();
            const gameElement = document.createElement('div');
            gameElement.classList.add('game');
            gameElement.innerHTML = `Jogo ${i+1}: ${game.join(' - ')}`;
            gamesContainer.appendChild(gameElement);
        }
    };
    
    window.simulateTraining = function() {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const trainButton = document.getElementById('train-button');
        
        // Disable button during training
        trainButton.disabled = true;
        trainButton.textContent = 'Treinando...';
        
        // Reset progress
        let progress = 0;
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        
        // Simulate training progress
        const interval = setInterval(function() {
            progress += Math.random() * 5;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                trainButton.disabled = false;
                trainButton.textContent = 'Iniciar Treinamento';
            }
        }, 200);
    };
    
    // Helper function to generate random game
    function generateRandomGame() {
        const numbers = [];
        while (numbers.length < 15) {
            const num = Math.floor(Math.random() * 25) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers.sort((a, b) => a - b);
    }
});
