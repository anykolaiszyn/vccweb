/**
 * Contact Form Handler
 * Handles form submission with validation and user feedback
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Create status message element
    const statusDiv = document.createElement('div');
    statusDiv.id = 'form-status';
    statusDiv.className = 'form-status';
    statusDiv.setAttribute('role', 'status');
    statusDiv.setAttribute('aria-live', 'polite');
    form.parentNode.insertBefore(statusDiv, form.nextSibling);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous status
        statusDiv.innerHTML = '';
        statusDiv.className = 'form-status';
        
        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            }
        });

        if (!isValid) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Submit form
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showStatus('Thanks for your message! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        }).catch(error => {
            console.error('Form submission error:', error);
            showStatus('Sorry, there was a problem sending your message. Please try the email link below or call us directly.', 'error');
        }).finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });

    function showStatus(message, type) {
        statusDiv.innerHTML = message;
        statusDiv.className = `form-status ${type}`;
        statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});