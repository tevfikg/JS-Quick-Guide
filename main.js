
function toggleSolution(id) {
    const solution = document.getElementById(id);
    if (solution.style.display === "block") {
        solution.style.display = "none";
    } else {
        solution.style.display = "block";
    }
}

function runCode(playgroundId, outputId) {
    const code = document.getElementById(playgroundId).value;
    const output = document.getElementById(outputId);
    output.innerHTML = "";

    // Save original console.log
    const originalConsoleLog = console.log;

    // Override console.log to capture output
    console.log = function () {
        const args = Array.from(arguments);
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg);
            } else {
                return String(arg);
            }
        }).join(" ");

        output.innerHTML += message + "<br>";
    };

    try {
        // Execute the code
        eval(code);
    } catch (error) {
        output.innerHTML += `<span style="color: red;">Error: ${error.message}</span>`;
    } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
    }
}

function runDOMCode(playgroundId, outputId) {
    const code = document.getElementById(playgroundId).value;
    const output = document.getElementById(outputId);
    output.innerHTML = "";

    // Save original console.log
    const originalConsoleLog = console.log;

    // Override console.log to capture output
    console.log = function () {
        const args = Array.from(arguments);
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg);
            } else {
                return String(arg);
            }
        }).join(" ");

        output.innerHTML += message + "<br>";
    };

    try {
        // Add a function wrapper around the code to ensure it interacts with the output div
        const wrappedCode = `
            (function() {
                const outputDiv = document.getElementById('${outputId}');
                ${code}
                return true;
            })();
        `;

        // Execute the code
        const result = eval(wrappedCode);

        // Handle case where the code returns a string
        if (typeof result === 'string') {
            output.innerHTML += result;
        }
    } catch (error) {
        output.innerHTML += `<span style="color: red;">Error: ${error.message}</span>`;
    } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
    }
}

// Initialize all solutions to be hidden
window.onload = function () {
    const solutions = document.querySelectorAll('.solution');
    solutions.forEach(solution => {
        solution.style.display = 'none';
    });
};