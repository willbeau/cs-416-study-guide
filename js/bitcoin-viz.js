// Bitcoin Visualizations Script
// This file contains all interactive visualizations for the Bitcoin study guide

// Utility function to create visualization containers
function createVizContainer(selector, html) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.outerHTML = html;
    });
}

// Initialize all visualizations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace remaining placeholders with actual visualizations
    replaceAllPlaceholders();
});

function replaceAllPlaceholders() {
    const placeholders = document.querySelectorAll('.visualization-placeholder');

    placeholders.forEach((placeholder, index) => {
        const title = placeholder.querySelector('h3')?.textContent || '';

        if (title.includes('Merkle Tree')) {
            placeholder.outerHTML = getMerkleTreeViz();
        } else if (title.includes('Proof of Work Mining')) {
            placeholder.outerHTML = getProofOfWorkViz();
        } else if (title.includes('SHA-256 Avalanche')) {
            placeholder.outerHTML = getSHAAvalancheViz();
        } else if (title.includes('Difficulty Adjustment')) {
            placeholder.outerHTML = getDifficultyAdjustmentViz();
        } else if (title.includes('Mining Process Flowchart')) {
            placeholder.outerHTML = getMiningProcessViz();
        } else if (title.includes('Halving Schedule')) {
            placeholder.outerHTML = getHalvingScheduleViz();
        } else if (title.includes('UTXO Model')) {
            placeholder.outerHTML = getUTXOModelViz();
        } else if (title.includes('Transaction Propagation')) {
            placeholder.outerHTML = getTransactionPropagationViz();
        } else if (title.includes('Confirmation Security')) {
            placeholder.outerHTML = getConfirmationSecurityViz();
        } else if (title.includes('Fork Resolution')) {
            placeholder.outerHTML = getForkResolutionViz();
        } else if (title.includes('51% Attack')) {
            placeholder.outerHTML = get51AttackViz();
        } else if (title.includes('Attack Vectors')) {
            placeholder.outerHTML = getAttackVectorsViz();
        } else if (title.includes('CAP Theorem')) {
            placeholder.outerHTML = getCAPTheoremViz();
        } else if (title.includes('Blockchain Trilemma')) {
            placeholder.outerHTML = getBlockchainTrilemmaViz();
        } else if (title.includes('Transaction Lifecycle')) {
            placeholder.outerHTML = getTransactionLifecycleViz();
        } else if (title.includes('Course Topics Concept Map')) {
            placeholder.outerHTML = getConceptMapViz();
        }
    });
}

// Merkle Tree Visualization
function getMerkleTreeViz() {
    return `
        <div class="visualization-container">
            <h3>📊 Visualization: Merkle Tree Verification</h3>
            <div id="merkleTree" style="position: relative; width: 100%; height: 550px; background: var(--background-color); border-radius: 8px; padding: 20px;">
                <canvas id="merkleCanvas" width="1000" height="500"></canvas>
                <div style="position: absolute; top: 20px; right: 20px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 200px;">
                    <h4 style="margin: 0 0 10px 0; font-size: 14px;">Proof Efficiency</h4>
                    <div id="merkleProofStats">Click a transaction to see its proof path</div>
                </div>
            </div>
            <script>
            (function() {
                const canvas = document.getElementById('merkleCanvas');
                const ctx = canvas.getContext('2d');
                let selectedTx = null;

                function drawMerkleTree() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw 8 transactions at bottom
                    for (let i = 0; i < 8; i++) {
                        const x = 100 + i * 110;
                        const y = 450;
                        const isSelected = selectedTx === i;

                        ctx.fillStyle = isSelected ? '#f39c12' : '#3498db';
                        ctx.fillRect(x - 30, y - 15, 60, 30);
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x - 30, y - 15, 60, 30);

                        ctx.fillStyle = 'white';
                        ctx.font = 'bold 12px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText('TX' + (i + 1), x, y + 5);
                    }

                    // Draw intermediate hashes
                    for (let level = 1; level <= 3; level++) {
                        const nodeCount = Math.pow(2, 3 - level);
                        const y = 450 - level * 120;
                        for (let i = 0; i < nodeCount; i++) {
                            const x = 155 + i * 220 * Math.pow(2, level - 1);

                            ctx.beginPath();
                            ctx.arc(x, y, 25, 0, Math.PI * 2);
                            ctx.fillStyle = level === 3 ? '#e74c3c' : '#95a5a6';
                            ctx.fill();
                            ctx.strokeStyle = 'white';
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            ctx.fillStyle = 'white';
                            ctx.font = 'bold 10px Arial';
                            ctx.textAlign = 'center';
                            ctx.fillText(level === 3 ? 'ROOT' : 'H', x, y + 5);
                        }
                    }

                    // Draw connecting lines
                    for (let level = 0; level < 3; level++) {
                        const nodeCount = Math.pow(2, 3 - level);
                        const y1 = 450 - level * 120;
                        const y2 = 450 - (level + 1) * 120;
                        for (let i = 0; i < nodeCount; i++) {
                            const x1 = level === 0 ? 100 + i * 110 : 155 + i * 220 * Math.pow(2, level - 1);
                            const x2 = 155 + Math.floor(i / 2) * 220 * Math.pow(2, level);

                            ctx.beginPath();
                            ctx.moveTo(x1, y1 - (level === 0 ? 15 : 25));
                            ctx.lineTo(x2, y2 + 25);
                            ctx.strokeStyle = '#bdc3c7';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    }
                }

                canvas.addEventListener('click', function(e) {
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    // Check if click is on a transaction
                    for (let i = 0; i < 8; i++) {
                        const txX = 100 + i * 110;
                        const txY = 450;
                        if (x >= txX - 30 && x <= txX + 30 && y >= txY - 15 && y <= txY + 15) {
                            selectedTx = i;
                            drawMerkleTree();
                            document.getElementById('merkleProofStats').innerHTML =
                                '<strong>Selected:</strong> TX' + (i + 1) + '<br>' +
                                '<strong>Proof size:</strong> 3 hashes<br>' +
                                '<strong>Savings:</strong> 99.93%';
                            break;
                        }
                    }
                });

                drawMerkleTree();
            })();
            </script>
        </div>
    `;
}

// Proof of Work Mining Visualization
function getProofOfWorkViz() {
    return `
        <div class="visualization-container">
            <h3>📊 Visualization: Proof of Work Mining Process</h3>
            <div id="powMining" style="position: relative; width: 100%; height: 400px; background: linear-gradient(to bottom, #2c3e50, #34495e); border-radius: 8px; padding: 20px;">
                <div id="powNonce" style="color: white; font-size: 24px; font-family: monospace; text-align: center; margin: 20px 0;">Nonce: 0</div>
                <div id="powHash" style="color: #f39c12; font-size: 16px; font-family: monospace; text-align: center; margin: 20px 0;">Hash: Computing...</div>
                <div id="powTarget" style="color: #2ecc71; font-size: 14px; font-family: monospace; text-align: center; margin: 10px 0;">Target: 0x0000FFFF...</div>
                <canvas id="powCanvas" width="800" height="200" style="display: block; margin: 20px auto;"></canvas>
                <button id="startMining" style="display: block; margin: 20px auto; padding: 12px 24px; background: #2ecc71; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;">Start Mining</button>
            </div>
            <script>
            (function() {
                let nonce = 0;
                let mining = false;
                let attempts = 0;
                const canvas = document.getElementById('powCanvas');
                const ctx = canvas.getContext('2d');
                const targetLine = 100;

                function simpleHash(n) {
                    return (n * 2654435761) % 4294967296;
                }

                function drawHashAttempt(hashValue, isValid) {
                    const x = (attempts % 100) * 8;
                    const normalized = (hashValue / 4294967296) * 200;

                    ctx.fillStyle = isValid ? '#2ecc71' : '#e74c3c';
                    ctx.fillRect(x, 200 - normalized, 6, 4);
                }

                function mine() {
                    if (!mining) return;

                    const hash = simpleHash(nonce);
                    const hashHex = '0x' + hash.toString(16).toUpperCase().padStart(8, '0');
                    const isValid = hash < (4294967296 * 0.0001); // Difficulty target

                    document.getElementById('powNonce').textContent = 'Nonce: ' + nonce.toLocaleString();
                    document.getElementById('powHash').textContent = 'Hash: ' + hashHex;
                    document.getElementById('powHash').style.color = isValid ? '#2ecc71' : '#f39c12';

                    drawHashAttempt(hash, isValid);

                    if (isValid) {
                        mining = false;
                        document.getElementById('powHash').textContent += ' ✓ VALID BLOCK!';
                        document.getElementById('startMining').textContent = 'Mine Again';
                        return;
                    }

                    nonce++;
                    attempts++;

                    if (nonce % 100 === 0) {
                        setTimeout(mine, 10);
                    } else {
                        mine();
                    }
                }

                // Draw target line
                ctx.strokeStyle = '#2ecc71';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(0, targetLine);
                ctx.lineTo(800, targetLine);
                ctx.stroke();
                ctx.font = '12px Arial';
                ctx.fillStyle = '#2ecc71';
                ctx.fillText('Target', 10, targetLine - 5);

                document.getElementById('startMining').addEventListener('click', function() {
                    if (!mining) {
                        nonce = 0;
                        attempts = 0;
                        mining = true;
                        ctx.clearRect(0, 0, 800, 200);
                        ctx.beginPath();
                        ctx.moveTo(0, targetLine);
                        ctx.lineTo(800, targetLine);
                        ctx.stroke();
                        this.textContent = 'Mining...';
                        mine();
                    }
                });
            })();
            </script>
        </div>
    `;
}

// SHA-256 Avalanche Effect Visualization
function getSHAAvalancheViz() {
    return `
        <div class="visualization-container">
            <h3>📊 Visualization: SHA-256 Avalanche Effect</h3>
            <div style="padding: 20px; background: var(--background-color); border-radius: 8px;">
                <input type="text" id="shaInput" placeholder="Type something..." style="width: 100%; padding: 10px; font-size: 16px; margin-bottom: 15px; border: 2px solid #3498db; border-radius: 4px;">
                <div style="background: white; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                    <h4 style="margin: 0 0 10px 0;">Hash Output (256 bits):</h4>
                    <div id="hashBits" style="font-family: monospace; font-size: 10px; line-height: 1.5; word-break: break-all;"></div>
                </div>
                <div id="changeCounter" style="text-align: center; font-size: 18px; font-weight: bold; color: #e74c3c;"></div>
            </div>
            <script>
            (function() {
                let previousHash = null;

                function simpleHash256(str) {
                    // Simplified hash for visualization
                    let hash = '';
                    for (let i = 0; i < 256; i++) {
                        const bit = (str.charCodeAt(i % str.length) * (i + 1)) % 2;
                        hash += bit;
                    }
                    return hash;
                }

                function displayHash(hashBits) {
                    const container = document.getElementById('hashBits');
                    container.innerHTML = '';

                    for (let i = 0; i < hashBits.length; i++) {
                        const span = document.createElement('span');
                        span.textContent = hashBits[i];
                        span.style.padding = '2px';
                        span.style.margin = '1px';
                        span.style.display = 'inline-block';

                        if (previousHash && previousHash[i] !== hashBits[i]) {
                            span.style.background = '#e74c3c';
                            span.style.color = 'white';
                            span.style.fontWeight = 'bold';
                        } else {
                            span.style.background = '#ecf0f1';
                        }

                        container.appendChild(span);
                    }
                }

                document.getElementById('shaInput').addEventListener('input', function(e) {
                    const value = e.target.value || 'empty';
                    const hash = simpleHash256(value);

                    if (previousHash) {
                        let changes = 0;
                        for (let i = 0; i < 256; i++) {
                            if (hash[i] !== previousHash[i]) changes++;
                        }
                        const percentage = ((changes / 256) * 100).toFixed(1);
                        document.getElementById('changeCounter').textContent =
                            changes + ' bits changed (' + percentage + '%)';
                    }

                    displayHash(hash);
                    previousHash = hash;
                });

                // Initialize
                document.getElementById('shaInput').value = 'Hello';
                document.getElementById('shaInput').dispatchEvent(new Event('input'));
            })();
            </script>
        </div>
    `;
}

// Add more visualization functions as needed...
// (Continuing with simplified versions for remaining visualizations)

function getDifficultyAdjustmentViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Difficulty Adjustment Over Time</h3><p>This visualization shows Bitcoin difficulty increasing over time in a step pattern every 2,016 blocks (approximately 2 weeks).</p><canvas id="difficultyChart" width="800" height="400" style="width: 100%; background: white; border-radius: 8px;"></canvas><script>(function(){const canvas=document.getElementById("difficultyChart");if(!canvas)return;const ctx=canvas.getContext("2d");ctx.strokeStyle="#3498db";ctx.lineWidth=2;ctx.beginPath();let y=350;for(let x=0;x<800;x+=40){ctx.lineTo(x,y);ctx.lineTo(x+40,y);y-=10;}ctx.stroke();ctx.fillStyle="#2c3e50";ctx.font="12px Arial";ctx.fillText("Difficulty increases every 2016 blocks",20,30);ctx.fillText("Time →",750,390);ctx.fillText("Difficulty ↑",10,50);})();</script></div>';
}

function getMiningProcessViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Mining Process Flowchart</h3><p>The mining process follows these steps: Collect → Validate → Construct → Hash → Publish → Broadcast</p><svg width="800" height="400" style="width: 100%; background: white; border-radius: 8px;"><circle cx="100" cy="200" r="50" fill="#3498db"/><text x="100" y="205" text-anchor="middle" fill="white" font-weight="bold">Collect</text><circle cx="250" cy="200" r="50" fill="#2ecc71"/><text x="250" y="205" text-anchor="middle" fill="white" font-weight="bold">Validate</text><circle cx="400" cy="200" r="50" fill="#f39c12"/><text x="400" y="205" text-anchor="middle" fill="white" font-weight="bold">Hash</text><circle cx="550" cy="200" r="50" fill="#9b59b6"/><text x="550" y="205" text-anchor="middle" fill="white" font-weight="bold">Publish</text><line x1="150" y1="200" x2="200" y2="200" stroke="#95a5a6" stroke-width="3"/><line x1="300" y1="200" x2="350" y2="200" stroke="#95a5a6" stroke-width="3"/><line x1="450" y1="200" x2="500" y2="200" stroke="#95a5a6" stroke-width="3"/></svg></div>';
}

function getHalvingScheduleViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Bitcoin Halving Schedule</h3><p>Block rewards halve every 210,000 blocks (approximately 4 years)</p><canvas id="halvingChart" width="800" height="400" style="width: 100%; background: white; border-radius: 8px;"></canvas><script>(function(){const canvas=document.getElementById("halvingChart");if(!canvas)return;const ctx=canvas.getContext("2d");const rewards=[50,25,12.5,6.25,3.125];ctx.strokeStyle="#f39c12";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(50,350);for(let i=0;i<rewards.length;i++){const x=50+i*150;const y=350-(rewards[i]*5);ctx.lineTo(x,y);ctx.lineTo(x+150,y);ctx.fillStyle="#3498db";ctx.font="bold 12px Arial";ctx.fillText(rewards[i]+" BTC",x+50,y-10);}ctx.stroke();})();</script></div>';
}

function getUTXOModelViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: UTXO Model vs Account Model</h3><p><strong>Traditional Account:</strong> Balance gets updated directly (Alice: $100 → $70)</p><p><strong>Bitcoin UTXO:</strong> Existing coins are "spent" and new coins are created (1 BTC → 0.3 BTC + 0.69 BTC + 0.01 fee)</p><div style="display: flex; gap: 20px; padding: 20px;"><div style="flex: 1; background: #ecf0f1; padding: 15px; border-radius: 8px;"><h4>Account Model</h4><div style="background: #3498db; color: white; padding: 10px; margin: 10px 0; border-radius: 4px;">Alice: $100</div><div style="text-align: center; font-size: 24px;">↓</div><div style="background: #2ecc71; color: white; padding: 10px; margin: 10px 0; border-radius: 4px;">Alice: $70</div></div><div style="flex: 1; background: #ecf0f1; padding: 15px; border-radius: 8px;"><h4>UTXO Model</h4><div style="background: #e74c3c; color: white; padding: 10px; margin: 10px 0; border-radius: 4px; text-decoration: line-through;">Alice: 1 BTC</div><div style="text-align: center; font-size: 24px;">↓</div><div style="background: #2ecc71; color: white; padding: 8px; margin: 5px 0; border-radius: 4px; font-size: 12px;">→ Bob: 0.3 BTC</div><div style="background: #3498db; color: white; padding: 8px; margin: 5px 0; border-radius: 4px; font-size: 12px;">→ Alice: 0.69 BTC</div></div></div></div>';
}

function getTransactionPropagationViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Transaction Propagation Network</h3><p>Transactions spread exponentially across the network via gossip protocol</p><div style="background: var(--background-color); padding: 20px; border-radius: 8px;"><canvas id="propCanvas" width="800" height="400"></canvas></div><script>(function(){const canvas=document.getElementById("propCanvas");if(!canvas)return;const ctx=canvas.getContext("2d");function drawNetwork(){ctx.clearRect(0,0,800,400);for(let i=0;i<30;i++){const x=100+Math.random()*600;const y=50+Math.random()*300;ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fillStyle="#95a5a6";ctx.fill();}ctx.beginPath();ctx.arc(400,200,15,0,Math.PI*2);ctx.fillStyle="#f39c12";ctx.fill();ctx.fillStyle="white";ctx.font="bold 10px Arial";ctx.textAlign="center";ctx.fillText("TX",400,205);}drawNetwork();})();</script></div>';
}

function getConfirmationSecurityViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Confirmation Security Graph</h3><p>Reversal probability decreases exponentially with confirmations</p><canvas id="confirmChart" width="800" height="400" style="width: 100%; background: white; border-radius: 8px;"></canvas><script>(function(){const canvas=document.getElementById("confirmChart");if(!canvas)return;const ctx=canvas.getContext("2d");ctx.strokeStyle="#e74c3c";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(50,50);for(let i=0;i<=10;i++){const x=50+i*70;const y=50+Math.exp(-i*0.5)*250;ctx.lineTo(x,y);}ctx.stroke();ctx.strokeStyle="#2ecc71";ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(470,50);ctx.lineTo(470,350);ctx.stroke();ctx.fillStyle="#2c3e50";ctx.font="12px Arial";ctx.fillText("6 confirmations",480,200);ctx.fillText("Confirmations →",700,380);ctx.fillText("Risk ↑",10,50);})();</script></div>';
}

function getForkResolutionViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Fork Resolution Process</h3><p>When two blocks are found simultaneously, miners build on both chains until one becomes longer</p><svg width="800" height="300" style="width: 100%; background: white; border-radius: 8px;"><rect x="50" y="120" width="80" height="60" fill="#3498db" stroke="white" stroke-width="2"/><text x="90" y="155" text-anchor="middle" fill="white" font-weight="bold">Block 99</text><rect x="170" y="80" width="80" height="60" fill="#2ecc71" stroke="white" stroke-width="2"/><text x="210" y="115" text-anchor="middle" fill="white" font-weight="bold">Block A</text><rect x="170" y="160" width="80" height="60" fill="#e74c3c" stroke="white" stroke-width="2"/><text x="210" y="195" text-anchor="middle" fill="white" font-weight="bold">Block B</text><rect x="290" y="80" width="80" height="60" fill="#2ecc71" stroke="white" stroke-width="2"/><text x="330" y="115" text-anchor="middle" fill="white" font-weight="bold">Block A2</text><line x1="130" y1="150" x2="170" y2="110" stroke="#2ecc71" stroke-width="2"/><line x1="130" y1="150" x2="170" y2="190" stroke="#e74c3c" stroke-width="2"/><line x1="250" y1="110" x2="290" y2="110" stroke="#2ecc71" stroke-width="2"/><text x="400" y="115" fill="#2ecc71" font-weight="bold" font-size="16">WINNER!</text><text x="400" y="195" fill="#e74c3c">Orphaned</text></svg></div>';
}

function get51AttackViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: 51% Attack Scenario</h3><p><strong>Attacker creates secret chain with double-spend, then broadcasts when longer</strong></p><div style="display: flex; gap: 20px; padding: 20px;"><div style="flex: 1; background: #ecf0f1; padding: 15px; border-radius: 8px;"><h4 style="color: #2ecc71;">Public Chain</h4><div style="background: #3498db; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 100</div><div style="background: #2ecc71; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 101: Alice → Bob</div><div style="background: #2ecc71; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 102</div><div style="color: #e74c3c; font-weight: bold; padding: 10px;">↓ REPLACED</div></div><div style="flex: 1; background: #ffe6e6; padding: 15px; border-radius: 8px;"><h4 style="color: #e74c3c;">Secret Chain (Attacker)</h4><div style="background: #3498db; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 100</div><div style="background: #e74c3c; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 101: Alice → Alice</div><div style="background: #e74c3c; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 102</div><div style="background: #e74c3c; color: white; padding: 10px; margin: 5px 0; border-radius: 4px;">Block 103</div><div style="color: #2ecc71; font-weight: bold; padding: 10px;">↑ BROADCAST</div></div></div></div>';
}

function getAttackVectorsViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Attack Vectors Overview</h3><div style="padding: 20px; background: var(--background-color); border-radius: 8px;"><canvas id="radarChart" width="500" height="500" style="display: block; margin: 0 auto;"></canvas></div><script>(function(){const canvas=document.getElementById("radarChart");if(!canvas)return;const ctx=canvas.getContext("2d");const attacks=["51% Attack","Selfish Mining","Eclipse","Double-Spend","Timejacking"];const difficulty=[9,7,5,3,4];const centerX=250,centerY=250,maxRadius=200;ctx.strokeStyle="#3498db";ctx.lineWidth=1;for(let i=1;i<=10;i++){ctx.beginPath();ctx.arc(centerX,centerY,maxRadius*i/10,0,Math.PI*2);ctx.stroke();}ctx.beginPath();ctx.fillStyle="rgba(52,152,219,0.3)";for(let i=0;i<5;i++){const angle=(Math.PI*2*i/5)-Math.PI/2;const r=maxRadius*difficulty[i]/10;const x=centerX+r*Math.cos(angle);const y=centerY+r*Math.sin(angle);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);ctx.fillStyle="#2c3e50";ctx.font="12px Arial";ctx.fillText(attacks[i],centerX+(maxRadius+20)*Math.cos(angle)-30,centerY+(maxRadius+20)*Math.sin(angle));}ctx.closePath();ctx.fill();})();</script></div>';
}

function getCAPTheoremViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: CAP Theorem Triangle</h3><p>Bitcoin chooses Availability + Partition Tolerance, sacrificing strong Consistency (eventually consistent)</p><svg width="600" height="500" style="width: 100%; background: white; border-radius: 8px;"><polygon points="300,50 100,400 500,400" fill="none" stroke="#3498db" stroke-width="3"/><text x="300" y="40" text-anchor="middle" fill="#3498db" font-weight="bold" font-size="16">Consistency</text><text x="80" y="420" text-anchor="middle" fill="#2ecc71" font-weight="bold" font-size="16">Availability</text><text x="520" y="420" text-anchor="middle" fill="#f39c12" font-weight="bold" font-size="16">Partition Tolerance</text><circle cx="350" cy="300" r="15" fill="#e74c3c"/><text x="350" y="340" text-anchor="middle" fill="#2c3e50" font-weight="bold">Bitcoin (AP)</text><circle cx="200" cy="150" r="10" fill="#95a5a6"/><text x="200" y="140" text-anchor="middle" fill="#2c3e50" font-size="12">Traditional DB (CA)</text></svg></div>';
}

function getBlockchainTrilemmaViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Blockchain Trilemma</h3><p>Bitcoin optimizes for Decentralization + Security at the cost of Scalability</p><svg width="600" height="500" style="width: 100%; background: white; border-radius: 8px;"><polygon points="300,50 100,400 500,400" fill="none" stroke="#3498db" stroke-width="3"/><text x="300" y="40" text-anchor="middle" fill="#3498db" font-weight="bold" font-size="16">Decentralization</text><text x="80" y="420" text-anchor="middle" fill="#2ecc71" font-weight="bold" font-size="16">Security</text><text x="520" y="420" text-anchor="middle" fill="#f39c12" font-weight="bold" font-size="16">Scalability</text><circle cx="200" cy="300" r="15" fill="#f39c12"/><text x="200" y="340" text-anchor="middle" fill="#2c3e50" font-weight="bold">Bitcoin</text><circle cx="500" cy="350" r="10" fill="#95a5a6"/><text x="520" y="350" text-anchor="middle" fill="#2c3e50" font-size="12">Visa</text></svg></div>';
}

function getTransactionLifecycleViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Transaction Lifecycle Timeline</h3><svg width="1000" height="200" style="width: 100%; background: white; border-radius: 8px;"><line x1="50" y1="100" x2="950" y2="100" stroke="#3498db" stroke-width="3"/><circle cx="50" cy="100" r="10" fill="#f39c12"/><text x="50" y="130" text-anchor="middle" font-size="11">Create (t=0)</text><circle cx="200" cy="100" r="10" fill="#3498db"/><text x="200" y="130" text-anchor="middle" font-size="11">Propagate (10s)</text><circle cx="400" cy="100" r="10" fill="#f39c12"/><text x="400" y="130" text-anchor="middle" font-size="11">Mempool (600s)</text><circle cx="600" cy="100" r="10" fill="#2ecc71"/><text x="600" y="130" text-anchor="middle" font-size="11">1st Confirm (600s)</text><circle cx="800" cy="100" r="10" fill="#27ae60"/><text x="800" y="130" text-anchor="middle" font-size="11">6 Confirms (3600s)</text></svg></div>';
}

function getConceptMapViz() {
    return '<div class="visualization-container"><h3>📊 Visualization: Course Topics Concept Map</h3><p>Bitcoin relates to multiple distributed systems concepts covered in the course</p><svg width="800" height="600" style="width: 100%; background: white; border-radius: 8px;"><circle cx="400" cy="300" r="60" fill="#e74c3c"/><text x="400" y="305" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Bitcoin</text><circle cx="200" cy="150" r="50" fill="#3498db"/><text x="200" y="155" text-anchor="middle" fill="white" font-weight="bold" font-size="12">Raft/Paxos</text><circle cx="600" cy="150" r="50" fill="#2ecc71"/><text x="600" y="155" text-anchor="middle" fill="white" font-weight="bold" font-size="12">PBFT</text><circle cx="200" cy="450" r="50" fill="#f39c12"/><text x="200" y="455" text-anchor="middle" fill="white" font-weight="bold" font-size="12">Chord DHT</text><circle cx="600" cy="450" r="50" fill="#9b59b6"/><text x="600" y="455" text-anchor="middle" fill="white" font-weight="bold" font-size="12">Vector Clocks</text><line x1="350" y1="260" x2="245" y2="185" stroke="#3498db" stroke-width="2"/><line x1="450" y1="260" x2="555" y2="185" stroke="#2ecc71" stroke-width="2"/><line x1="350" y1="340" x2="245" y2="415" stroke="#f39c12" stroke-width="2"/><line x1="450" y1="340" x2="555" y2="415" stroke="#9b59b6" stroke-width="2"/></svg></div>';
}
