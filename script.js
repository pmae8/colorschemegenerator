document.getElementById('generate-btn').addEventListener('click', function() {
    const seedColor = document.getElementById('seed-color').value;
    const schemeMode = document.getElementById('scheme-mode').value;
    const colorCount = schemeMode === 'mono' ? 10 : 5;

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.slice(1)}&mode=${schemeMode}&count=${colorCount}`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors;
            const colorDisplay = document.getElementById('color-display');
            colorDisplay.innerHTML = '';  // Clear previous colors

            colors.forEach(color => {
                const colorBox = document.createElement('div');
                colorBox.classList.add('color-box');
                colorBox.style.backgroundColor = color.hex.value;
                colorBox.textContent = color.hex.value;

                // Add click event to select color
                colorBox.addEventListener('click', function() {
                    // Remove 'selected' class from all color boxes
                    const allColorBoxes = document.querySelectorAll('.color-box');
                    allColorBoxes.forEach(box => box.classList.remove('selected'));

                    // Add 'selected' class to the clicked color box
                    colorBox.classList.add('selected');

                    // Copy hex to clipboard
                    navigator.clipboard.writeText(color.hex.value)
                        .then(() => {
                            const copyMsg = document.getElementById('copy-msg');
                            copyMsg.style.display = 'block';
                            setTimeout(() => {
                                copyMsg.style.display = 'none';
                            }, 2000);
                        });
                });

                colorDisplay.appendChild(colorBox);
            });
        })
        .catch(error => console.error('Error fetching color scheme:', error));
});
