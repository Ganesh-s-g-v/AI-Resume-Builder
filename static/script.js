document.addEventListener('DOMContentLoaded', () => {
    // --- Get all necessary elements from the DOM ---
    const resumeForm = document.getElementById('resume-form');
    const loadingDiv = document.getElementById('loading');
    const outputDiv = document.getElementById('resume-output');

    // --- Modal elements ---
    const modal = document.getElementById('resume-modal');
    const maximizeBtn = document.getElementById('maximize-btn');
    const closeBtn = document.querySelector('.close-btn');
    const modalOutputDiv = document.getElementById('modal-resume-output');

    // --- PDF download button ---
    const downloadPdfBtn = document.getElementById('download-pdf-btn');

    // --- Handle Form Submission ---
    resumeForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Disable download button during generation
        downloadPdfBtn.disabled = true;

        const form = event.target;
        const userInfo = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            phone: form.elements.phone.value,
            linkedin: form.elements.linkedin.value,
            education: form.elements.education.value,
            experience: form.elements.experience.value,
            projects: form.elements.projects.value,
            skills: form.elements.skills.value,
        };

        loadingDiv.style.display = 'block';
        outputDiv.innerHTML = '';

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userInfo }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            outputDiv.innerHTML = data.resume;
            
            // Enable download button on success
            downloadPdfBtn.disabled = false;

        } catch (error) {
            outputDiv.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
        } finally {
            loadingDiv.style.display = 'none';
        }
    });

    // --- Modal Logic ---
    maximizeBtn.addEventListener('click', () => {
        if (outputDiv.innerHTML) {
            modalOutputDiv.innerHTML = outputDiv.innerHTML;
            modal.style.display = 'flex';
        }
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // --- PDF Download Logic ---
    downloadPdfBtn.addEventListener('click', () => {
        // This button is disabled if there's no content, so we don't need to check.
        const { jsPDF } = window.jspdf;
        const resumeContent = document.getElementById('resume-output');
        
        html2canvas(resumeContent, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    });
});