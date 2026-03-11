/**
 * Contact Form Handler
 * Handles form submission with validation and user feedback
 */
document.addEventListener('DOMContentLoaded', function() {
    const forms = Array.from(document.querySelectorAll('form[data-async-form], #contact-form'));
    if (!forms.length) return;

    forms.forEach(function(form, index) {
        let statusDiv = form.nextElementSibling;
        if (!statusDiv || !statusDiv.classList.contains('form-status')) {
            statusDiv = document.createElement('div');
            statusDiv.id = form.id ? `${form.id}-status` : `form-status-${index}`;
            statusDiv.className = 'form-status';
            statusDiv.setAttribute('role', 'status');
            statusDiv.setAttribute('aria-live', 'polite');
            form.parentNode.insertBefore(statusDiv, form.nextSibling);
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            statusDiv.innerHTML = '';
            statusDiv.className = 'form-status';

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(function(field) {
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
                showStatus(form, statusDiv, 'Please fill in all required fields.', 'error');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton ? submitButton.textContent : '';
            const loadingText = form.dataset.loadingText || 'Sending...';

            if (submitButton) {
                submitButton.textContent = loadingText;
                submitButton.disabled = true;
            }

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                if (response.ok) {
                    showStatus(
                        form,
                        statusDiv,
                        form.dataset.successMessage || 'Thanks for your message! We\'ll get back to you soon.',
                        'success'
                    );
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(function(error) {
                console.error('Form submission error:', error);
                showStatus(
                    form,
                    statusDiv,
                    form.dataset.errorMessage || 'Sorry, there was a problem sending your message. Please try the email link below or call us directly.',
                    'error'
                );
            }).finally(function() {
                if (submitButton) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        });
    });

    function showStatus(form, statusDiv, message, type) {
        statusDiv.innerHTML = message;
        statusDiv.className = `form-status ${type}`;
        if (form.dataset.scrollStatus !== 'false') {
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});