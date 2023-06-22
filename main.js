fetch('ascii.txt')
    .then(response => response.text())
    .then(data => {
        let asciiContainer = document.getElementById('ascii-art-container');
        let asciiLines = data.split('\n');

        // Start and end lines for the block you want to highlight.
        let startLine = Math.floor(asciiLines.length / 2) - 9; // 5 lines above the middle
        let endLine = Math.floor(asciiLines.length / 2) + 9; // 5 lines below the middle

        for (let i = startLine; i <= endLine; i++) {
            let line = asciiLines[i];

            // Start and end characters for the block you want to highlight on this line.
            let startChar = Math.floor(line.length / 2) - 19; // 10 characters before the middle
            let endChar = Math.floor(line.length / 2) + 19; // 10 characters after the middle

            let highlightedLine = line.slice(0, startChar) +
                '<span class="highlight">' +
                line.slice(startChar, endChar) +
                '</span>' +
                line.slice(endChar);

            asciiLines[i] = highlightedLine;
        }

        asciiContainer.innerHTML = asciiLines.join('\n');

        window.addEventListener('scroll', function() {
            let scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight));
            asciiContainer.style.fontSize = (16 + scrollPercentage * 50) + 'px';
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });