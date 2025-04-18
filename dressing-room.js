// Customization variables
let selectedPattern = 'white';
let selectedHat = 'none';
let selectedAccessory = 'none';

let previewCtx = null;

// Ensure preview canvas context is set up
document.addEventListener('DOMContentLoaded', () => {
    const previewCanvas = document.getElementById('preview-canvas');
    if (previewCanvas) {
        previewCtx = previewCanvas.getContext('2d');
    } else {
        console.error('Preview canvas not found');
    }
});

// Bunny preview function
function updateBunnyPreview() {
    // Verify canvas context
    if (!previewCtx) {
        console.error('Preview canvas context not found');
        return;
    }

    // Clear the preview canvas
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    
    // Draw ground
    previewCtx.fillStyle = '#8B4513';
    previewCtx.fillRect(0, previewCanvas.height - 50, previewCanvas.width, 50);
    
    previewCtx.fillStyle = '#7CFC00';
    previewCtx.fillRect(0, previewCanvas.height - 50, previewCanvas.width, 5);
    
    // Draw sky
    previewCtx.fillStyle = '#87CEEB';
    previewCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height - 50);
    
    // Bunny preview position
    const bunnyX = previewCanvas.width / 2;
    const bunnyY = previewCanvas.height - 50;
    
    // Body color based on pattern
    let bodyColor;
    switch (selectedPattern) {
        case 'brown':
            bodyColor = '#8B4513';
            break;
        case 'black':
            bodyColor = '#FFFFFF';
            break;
        case 'grey':
            bodyColor = '#A9A9A9';
            break;
        case 'spotted':
            bodyColor = '#FFFFFF';
            break;
        case 'golden':
            bodyColor = '#FFD700';
            break;
        default:
            bodyColor = '#FFFFFF';
    }
    
    // Draw bunny body
    previewCtx.fillStyle = bodyColor;
    
    // Body
    previewCtx.beginPath();
    previewCtx.ellipse(bunnyX, bunnyY - 15, 20, 15, 0, 0, Math.PI * 2);
    previewCtx.fill();
    
    // Head
    previewCtx.beginPath();
    previewCtx.ellipse(bunnyX + 10, bunnyY - 25, 12, 10, 0, 0, Math.PI * 2);
    previewCtx.fill();
    
    // Ears
    previewCtx.beginPath();
    previewCtx.ellipse(bunnyX + 5, bunnyY - 40, 5, 15, 0, 0, Math.PI * 2);
    previewCtx.fill();
    previewCtx.beginPath();
    previewCtx.ellipse(bunnyX + 15, bunnyY - 40, 5, 15, 0, 0, Math.PI * 2);
    previewCtx.fill();
    
    // Eye
    previewCtx.fillStyle = '#000000';
    previewCtx.beginPath();
    previewCtx.ellipse(bunnyX + 15, bunnyY - 27, 2, 2, 0, 0, Math.PI * 2);
    previewCtx.fill();
    
    // Tail
    previewCtx.fillStyle = (selectedPattern === 'grey' || selectedPattern === 'golden') ? bodyColor : '#FFFFFF';
    previewCtx.beginPath();
    previewCtx.ellipse(bunnyX - 15, bunnyY - 15, 5, 5, 0, 0, Math.PI * 2);
    previewCtx.fill();
    
    // Draw hat if selected
    drawPreviewHat(previewCtx, bunnyX, bunnyY);
    
    // Draw accessory if selected
    drawPreviewAccessory(previewCtx, bunnyX, bunnyY);
}

// Draw preview hat
function drawPreviewHat(ctx, bunnyX, bunnyY) {
    switch (selectedHat) {
        case 'cap':
            // Baseball cap
            ctx.fillStyle = '#3366CC';
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 32, 10, 5, 0, 0, Math.PI);
            ctx.fill();
            
            // Visor
            ctx.beginPath();
            ctx.moveTo(bunnyX, bunnyY - 32);
            ctx.lineTo(bunnyX + 20, bunnyY - 32);
            ctx.lineTo(bunnyX + 25, bunnyY - 29);
            ctx.lineTo(bunnyX - 5, bunnyY - 29);
            ctx.closePath();
            ctx.fill();
            break;
        
        case 'bow':
            // Bow
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 37, 5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 37, 3, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Center of bow
            ctx.fillStyle = '#FF1493';
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 37, 1.5, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        
        case 'tophat':
            // Top hat
            ctx.fillStyle = '#000000';
            
            // Brim
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 32, 12, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Top
            ctx.fillRect(bunnyX + 3, bunnyY - 52, 14, 20);
            
            // Top rim
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 52, 7, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        
        case 'crown':
            // Crown
            ctx.fillStyle = '#FFD700';
            
            // Base
            ctx.beginPath();
            ctx.rect(bunnyX, bunnyY - 42, 20, 8);
            ctx.fill();
            
            // Points
            ctx.beginPath();
            ctx.moveTo(bunnyX, bunnyY - 42);
            ctx.lineTo(bunnyX - 1, bunnyY - 47);
            ctx.lineTo(bunnyX + 4, bunnyY - 42);
            ctx.lineTo(bunnyX + 7, bunnyY - 49);
            ctx.lineTo(bunnyX + 10, bunnyY - 42);
            ctx.lineTo(bunnyX + 13, bunnyY - 49);
            ctx.lineTo(bunnyX + 16, bunnyY - 42);
            ctx.lineTo(bunnyX + 20, bunnyY - 47);
            ctx.lineTo(bunnyX + 21, bunnyY - 42);
            ctx.fill();
            
            // Jewels
            ctx.fillStyle = '#FF0000';
            ctx.beginPath();
            ctx.ellipse(bunnyX + 4, bunnyY - 38, 2, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#0000FF';
            ctx.beginPath();
            ctx.ellipse(bunnyX + 10, bunnyY - 38, 2, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#00FF00';
            ctx.beginPath();
            ctx.ellipse(bunnyX + 16, bunnyY - 38, 2, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
}

// Draw preview accessory
function drawPreviewAccessory(ctx, bunnyX, bunnyY) {
    switch (selectedAccessory) {
        case 'bowtie':
            // Bow tie
            ctx.fillStyle = '#FF0000';
            
            // Left wing
            ctx.beginPath();
            ctx.moveTo(bunnyX, bunnyY - 15);
            ctx.lineTo(bunnyX - 5, bunnyY - 20);
            ctx.lineTo(bunnyX - 8, bunnyY - 15);
            ctx.lineTo(bunnyX - 5, bunnyY - 10);
            ctx.closePath();
            ctx.fill();
            
            // Right wing
            ctx.beginPath();
            ctx.moveTo(bunnyX, bunnyY - 15);
            ctx.lineTo(bunnyX + 5, bunnyY - 20);
            ctx.lineTo(bunnyX + 8, bunnyY - 15);
            ctx.lineTo(bunnyX + 5, bunnyY - 10);
            ctx.closePath();
            ctx.fill();
            
            // Center knot
            ctx.fillStyle = '#AA0000';
            ctx.beginPath();
            ctx.ellipse(bunnyX, bunnyY - 15, 2, 2, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        
        case 'scarf':
            // Scarf
            ctx.fillStyle = '#9966CC';
            
            // Wrapped part
            ctx.beginPath();
            ctx.moveTo(bunnyX - 10, bunnyY - 15);
            ctx.lineTo(bunnyX + 20, bunnyY - 15);
            ctx.lineTo(bunnyX + 20, bunnyY - 10);
            ctx.lineTo(bunnyX - 10, bunnyY - 10);
            ctx.closePath();
            ctx.fill();
            
            // Hanging part
            ctx.beginPath();
            ctx.moveTo(bunnyX, bunnyY - 10);
            ctx.lineTo(bunnyX + 5, bunnyY - 10);
            ctx.lineTo(bunnyX + 10, bunnyY);
            ctx.lineTo(bunnyX + 5, bunnyY);
            ctx.closePath();
            ctx.fill();
            break;
        
        case 'glasses':
            // Glasses
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            
            // Left lens
            ctx.beginPath();
            ctx.ellipse(bunnyX + 6, bunnyY - 27, 3, 3, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Right lens
            ctx.beginPath();
            ctx.ellipse(bunnyX + 14, bunnyY - 27, 3, 3, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Bridge
            ctx.beginPath();
            ctx.moveTo(bunnyX + 9, bunnyY - 27);
            ctx.lineTo(bunnyX + 11, bunnyY - 27);
            ctx.stroke();
            
            // Temple arms
            ctx.beginPath();
            ctx.moveTo(bunnyX + 3, bunnyY - 27);
            ctx.lineTo(bunnyX - 2, bunnyY - 25);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(bunnyX + 17, bunnyY - 27);
            ctx.lineTo(bunnyX + 22, bunnyY - 25);
            ctx.stroke();
            break;
        
        case 'cape':
            // Cape
            ctx.fillStyle = '#CC0000';
            
            // Cape body
            ctx.beginPath();
            ctx.moveTo(bunnyX - 15, bunnyY - 25);
            ctx.lineTo(bunnyX + 15, bunnyY - 25);
            ctx.lineTo(bunnyX + 5, bunnyY + 10);
            ctx.lineTo(bunnyX - 25, bunnyY + 10);
            ctx.closePath();
            ctx.fill();
            break;
    }
}

// Customization option event listeners
function setupCustomizationListeners(selector, updateCallback) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            
            const value = this.getAttribute(`data-${updateCallback.name.replace('update', '').toLowerCase()}`);
            
            // Update selected item
            updateCallback(value);
            
            // Update selected item UI
            document.querySelectorAll(selector).forEach(i => {
                i.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Update preview
            updateBunnyPreview();
        });
    });
}

// Update selected pattern
function updatePattern(pattern) {
    selectedPattern = pattern;
}

// Update selected hat
function updateHat(hat) {
    selectedHat = hat;
}

// Update selected accessory
function updateAccessory(accessory) {
    selectedAccessory = accessory;
}

// Setup listeners
setupCustomizationListeners('#patterns-content .option-item', updatePattern);
setupCustomizationListeners('#hats-content .option-item', updateHat);
setupCustomizationListeners('#accessories-content .option-item', updateAccessory);

// Show dressing room
function showDressingRoom() {
    // Hide other screens
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('score-display').style.display = 'none';
    document.getElementById('how-to-play-screen').style.display = 'none';
    
    // Show dressing room
    document.getElementById('dressing-room').style.display = 'flex';
    
    // Update the preview
    updateBunnyPreview();
}

// Initial preview when dressing room opens
document.addEventListener('DOMContentLoaded', () => {
    // First, set first non-locked options as selected
    const firstPattern = document.querySelector('#patterns-content .option-item:not(.locked)');
    const firstHat = document.querySelector('#hats-content .option-item:not(.locked)');
    const firstAccessory = document.querySelector('#accessories-content .option-item:not(.locked)');
    
    if (firstPattern) {
        firstPattern.classList.add('selected');
        selectedPattern = firstPattern.getAttribute('data-pattern');
    }
    
    if (firstHat) {
        firstHat.classList.add('selected');
        selectedHat = firstHat.getAttribute('data-hat');
    }
    
    if (firstAccessory) {
        firstAccessory.classList.add('selected');
        selectedAccessory = firstAccessory.getAttribute('data-accessory');
    }
    
    // Trigger preview
    updateBunnyPreview();
});

// Attach show dressing room event
document.getElementById('dressing-room-button').addEventListener('click', showDressingRoom);