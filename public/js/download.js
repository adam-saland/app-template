document.addEventListener('DOMContentLoaded', async () => {
    (async function downloadCSV() {
        let csv = await fetch("http://localhost:5555/data.csv");
        let data = await csv.text();
        const blob = new Blob([data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })();
})