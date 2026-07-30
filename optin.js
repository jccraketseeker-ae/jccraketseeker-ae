"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("resourceModal");
    const dialog = modal?.querySelector(".resource-modal-dialog");
    const closeButton = document.getElementById("resourceModalClose");
    const skipButton = document.getElementById("skipOptinButton");
    const backdrop = modal?.querySelector("[data-close-resource-modal]");
    const serviceLinks = document.querySelectorAll(".services-optin-trigger");
    const form = document.getElementById("optinForm");
    const submitButton = document.getElementById("optinSubmitButton");
    const formMessage = document.getElementById("optinFormMessage");
    let lastFocusedElement = null;

    if (!modal) return;

    function scrollToServices() {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#services");
    }

    function openModal() {
        lastFocusedElement = document.activeElement;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("resource-modal-open");
        window.setTimeout(() => closeButton?.focus(), 50);
    }

    function closeModal({ goToServices = false } = {}) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("resource-modal-open");
        if (goToServices) window.setTimeout(scrollToServices, 180);
        else if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    }

    serviceLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openModal();
        });
    });

    closeButton?.addEventListener("click", () => closeModal());
    backdrop?.addEventListener("click", () => closeModal());
    skipButton?.addEventListener("click", () => closeModal({ goToServices: true }));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("active")) closeModal();
        if (event.key === "Tab" && modal.classList.contains("active") && dialog) {
            const focusable = [...dialog.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled);
            if (!focusable.length) return;
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });

    if (new URLSearchParams(window.location.search).get("open") === "services") openModal();

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        formMessage.textContent = "";
        formMessage.className = "form-message";

        if (form.action.includes("YOUR_FORM_ID")) {
            formMessage.textContent = "Add your Formspree form ID before publishing the signup form.";
            formMessage.classList.add("error");
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add("loading");
        try {
            const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            if (!response.ok) throw new Error("Form submission failed");
            localStorage.setItem("joyPortfolioSubscriber", "true");
            formMessage.textContent = "Thank you! Opening my services...";
            formMessage.classList.add("success");
            form.reset();
            window.setTimeout(() => closeModal({ goToServices: true }), 900);
        } catch (error) {
            formMessage.textContent = "The form could not be submitted. Please try again.";
            formMessage.classList.add("error");
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove("loading");
        }
    });
});
