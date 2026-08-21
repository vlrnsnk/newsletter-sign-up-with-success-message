export function initNewsletterSignup() {
  const form = document.querySelector('.sign-up-form');
  const emailInput = form.querySelector('#email');
  const emailError = form.querySelector('#email-error');
  const signUpSection = document.querySelector('.sign-up');
  const successSection = document.querySelector('.success-message');
  const emailSpan = successSection.querySelector('.success-message__email');
  const dismissButton = successSection.querySelector('.success-message__button');

  const EMAIL_REGEX =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  function showError() {
    emailInput.classList.add('text-input__input--invalid');
    emailError.hidden = false;
  }

  function hideError() {
    emailInput.classList.remove('text-input__input--invalid');
    emailError.hidden = true;
  }

  function showSuccess() {
    // Both sections visible, animate cross-fade
    signUpSection.hidden = false;
    successSection.hidden = false;

    requestAnimationFrame(() => {
      signUpSection.classList.remove('is-visible');
      successSection.classList.add('is-visible');
    });
  }

  function hideSuccess() {
    // Both sections visible, animate cross-fade back
    signUpSection.hidden = false;
    successSection.hidden = false;

    requestAnimationFrame(() => {
      signUpSection.classList.add('is-visible');
      successSection.classList.remove('is-visible');
    });

    function restoreForm() {
      successSection.hidden = true;
      signUpSection.hidden = false;
      form.reset();
      emailInput.focus();
      signUpSection.removeEventListener('transitionend', onTransitionEnd);
    }

    function onTransitionEnd(event) {
      if (event.target === signUpSection && event.propertyName === 'opacity') {
        restoreForm();
      }
    }

    signUpSection.addEventListener('transitionend', onTransitionEnd);
  }

  // Form submission handler
  function onFormSubmit(event) {
    event.preventDefault();

    if (!emailInput.checkValidity() || !EMAIL_REGEX.test(emailInput.value)) {
      showError();
      emailInput.focus();
      return;
    }

    hideError();
    showSuccess();
    emailSpan.textContent = emailInput.value;
  }

  // Dismiss button handler
  function onDismissClick() {
    hideSuccess();
  }

  // Clear errors as soon as the user starts typing
  function onInput() {
    hideError();
  }

  form.addEventListener('submit', onFormSubmit);
  emailInput.addEventListener('input', onInput);
  dismissButton.addEventListener('click', onDismissClick);

  return function destroy() {
    form.removeEventListener('submit', onFormSubmit);
    emailInput.removeEventListener('input', onInput);
    dismissButton.removeEventListener('click', onDismissClick);
  };
}
