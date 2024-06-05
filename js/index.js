/**
 * Hides the first and last name input fields if an anonymous donation
 * was requested.
 */
function toggleNameInputs() {
  // If the number of times we've clicked the checkbox is even,
  // then set the fieldset to be disabled.
  const isDisabled = hiddenNameDonationEvent.timesClicked % 2 == 0;

  /**
   * This fieldset element wraps the first and last names fields.
   * @type {HTMLFieldSetElement}
   */
  let fieldset = document.getElementById("donation-name-fieldset");

  fieldset.disabled = isDisabled;
  hiddenNameDonationEvent.timesClicked += 1;

  /** @type {HTMLInputElement} */
  let firstNameInput = document.getElementById("donation-form-first-name");
  /** @type {HTMLInputElement} */
  let lastNameInput = document.getElementById("donation-form-last-name");

  // If the fieldset is disabled, clear the first and last name input
  // fields.
  if (isDisabled) {
    firstNameInput.value = "";
    lastNameInput.value = "";
  }
}

/**
 * Validates all the forms with the needs-validation class by adding
 * adding the was-validated class.
 */
function validateForms() {
  let forms = document.getElementsByClassName("needs-validation");
  Array.prototype.filter.call(forms, function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}

/**
 * An event where a donation is created with the first and last name
 * fields omitted.
 */
let hiddenNameDonationEvent = {
  /**
   * If this checkbox is checked (clicked), the user is requesting to
   * not fill in the first and last names fields.
   * @type {HTMLInputElement}
   */
  element: document.getElementById("donation-form-no-name"),
  /** The number of times `element` was clicked. */
  timesClicked: 0,
};

hiddenNameDonationEvent.element.addEventListener("click", toggleNameInputs);

/** @type {HTMLInputElement} */
let donationAmountInput = document.getElementById("donation-form-amount");

donationAmountInput.addEventListener("input", function () {
  /** @type {HTMLInputElement} */
  let validationMsg = document.getElementById(
    "donation-form-amount-invalid-feedback"
  );
  console.log(this.valueAsNumber);
  if (this.valueAsNumber < 0) {
    validationMsg.textContent = "Please enter a positive amount.";
  } else if (this.value === "") {
    validationMsg.textContent = "Please enter an amount.";
  }
});

validateForms();
