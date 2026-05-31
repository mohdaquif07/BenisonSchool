(function () {
    const MANIFEST_URL = 'tc-pdfs/manifest.json';
    const PDF_BASE = 'tc-pdfs/';

    let manifestPromise = null;

    function normalizeName(value) {
        return value.replace(/[_\-\s]+/g, '').toLowerCase();
    }

    function loadManifest() {
        if (!manifestPromise) {
            manifestPromise = fetch(MANIFEST_URL)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Manifest not found');
                    }
                    return response.json();
                });
        }
        return manifestPromise;
    }

    function findTc(manifest, admissionNo, studentName) {
        const normalizedName = normalizeName(studentName);
        const entry = manifest.find(
            (item) => item.admissionNo === admissionNo && item.name === normalizedName
        );
        if (!entry) {
            return null;
        }
        return PDF_BASE + encodeURIComponent(entry.file);
    }

    function initTcSearch(formId, resultId) {
        const form = document.getElementById(formId);
        const resultDiv = document.getElementById(resultId);
        if (!form || !resultDiv) {
            return;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const admissionNo = document.getElementById('admno').value.trim();
            const studentName = document.getElementById('studentname').value.trim();

            if (!admissionNo || !studentName) {
                resultDiv.textContent = 'Please provide both admission number and name.';
                return;
            }

            resultDiv.textContent = 'Searching...';

            loadManifest()
                .then((manifest) => {
                    const url = findTc(manifest, admissionNo, studentName);
                    if (url) {
                        resultDiv.innerHTML =
                            `<a href="${url}" target="_blank" rel="noopener">Download TC PDF</a>`;
                    } else {
                        resultDiv.textContent =
                            'No matching TC found. Please check your details.';
                    }
                })
                .catch(() => {
                    resultDiv.textContent = 'Error loading TC records. Please try again later.';
                });
        });
    }

    window.initTcSearch = initTcSearch;
})();
