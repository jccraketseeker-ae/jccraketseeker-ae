"use strict";


document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");
    const navigationItems = document.querySelectorAll(
        ".nav-links a"
    );

    const profileImage = document.getElementById(
        "profileImage"
    );

    const changePhotoButton = document.getElementById(
        "changePhotoButton"
    );


    /* MOBILE MENU */

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const menuIsOpen =
                navLinks.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(menuIsOpen)
            );

        });

    }


    navigationItems.forEach((item) => {

        item.addEventListener("click", () => {

            if (navLinks) {
                navLinks.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* PHOTO SWITCHER */

    const portraitPhoto =
        "images/joy-profile.jpg";

    const workingPhoto =
        "images/joy-working-computer.jpg";

    let showingWorkingPhoto = false;


    if (profileImage && changePhotoButton) {

        changePhotoButton.addEventListener(
            "click",
            () => {

                profileImage.classList.add(
                    "photo-changing"
                );

                window.setTimeout(() => {

                    showingWorkingPhoto =
                        !showingWorkingPhoto;

                    if (showingWorkingPhoto) {

                        profileImage.src =
                            workingPhoto;

                        profileImage.alt =
                            "Joy Casinginan working at a computer";

                        changePhotoButton.textContent =
                            "View Profile Photo";

                    } else {

                        profileImage.src =
                            portraitPhoto;

                        profileImage.alt =
                            "Professional portrait of Joy Casinginan";

                        changePhotoButton.textContent =
                            "View Working Photo";

                    }


                    profileImage.classList.remove(
                        "photo-changing"
                    );

                }, 250);

            }
        );

    }


    /* SHOW A FRIENDLY ERROR IF AN IMAGE IS MISSING */

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                console.error(
                    "Profile image could not be loaded. Check the image filename and folder."
                );

                profileImage.alt =
                    "Image unavailable. Check the images folder and filename.";

            }
        );

    }

});
// =========================================
// BLOG SEARCH AND CATEGORY FILTER
// =========================================

const blogSearch = document.getElementById("blogSearch");
const blogCards = document.querySelectorAll(".blog-card");
const categoryButtons = document.querySelectorAll(".category-button");
const noBlogResults = document.getElementById("noBlogResults");

let selectedCategory = "all";

function filterBlogPosts() {
    if (!blogSearch || !blogCards.length) {
        return;
    }

    const searchText = blogSearch.value.toLowerCase().trim();
    let visiblePosts = 0;

    blogCards.forEach((card) => {
        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        card.style.display = shouldShow ? "" : "none";

        if (shouldShow) {
            visiblePosts++;
        }
    });

    if (noBlogResults) {
        noBlogResults.style.display =
            visiblePosts === 0 ? "block" : "none";
    }
}

if (blogSearch) {
    blogSearch.addEventListener("input", filterBlogPosts);
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        categoryButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterBlogPosts();
    });
});
/* ========================================
   VA TOOL INTERACTION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const vaToolCards =
        document.querySelectorAll(".va-dock-card");


    function closeAllVaTools(exceptCard = null) {

        vaToolCards.forEach((card) => {

            if (card !== exceptCard) {
                card.classList.remove("va-active");
            }

        });

    }


    vaToolCards.forEach((card) => {

        card.addEventListener("click", (event) => {

            event.stopPropagation();

            const wasActive =
                card.classList.contains("va-active");

            closeAllVaTools();

            if (!wasActive) {
                card.classList.add("va-active");
            }

        });

    });


    document.addEventListener("click", () => {
        closeAllVaTools();
    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeAllVaTools();
        }

    });

});
/* ==================================================
   PORTFOLIO TAB SWITCHING
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const portfolioTabs =
        document.querySelectorAll(".portfolio-tab");

    const portfolioCategories =
        document.querySelectorAll(".portfolio-category");

    portfolioTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const selectedCategory =
                this.getAttribute("data-category");

            portfolioTabs.forEach(function (button) {
                button.classList.remove("active");
            });

            portfolioCategories.forEach(function (category) {
                category.classList.remove("active");
            });

            this.classList.add("active");

            const selectedPortfolio =
                document.getElementById(selectedCategory);

            if (selectedPortfolio) {
                selectedPortfolio.classList.add("active");
            }

        });

    });

});
/* ==================================================
   PROJECT SAMPLE MODAL
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const projectButtons =
        document.querySelectorAll(".project-view-button");

    const projectModal =
        document.getElementById("projectModal");

    const projectModalImage =
        document.getElementById("projectModalImage");

    const projectModalTitle =
        document.getElementById("projectModalTitle");

    const projectModalClose =
        document.getElementById("projectModalClose");

    const projectModalBackdrop =
        document.querySelector("[data-close-project-modal]");


    function openProjectModal(button) {

        const imageSource =
            button.getAttribute("data-image");

        const projectTitle =
            button.getAttribute("data-title") || "Project Sample";


        projectModalImage.src = imageSource;
        projectModalImage.alt = projectTitle;
        projectModalTitle.textContent = projectTitle;

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        projectModalClose.focus();

    }


    function closeProjectModal() {

        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        projectModalImage.src = "";

    }


    projectButtons.forEach(function (button) {

        button.addEventListener("click", function () {
            openProjectModal(button);
        });

    });


    projectModalClose.addEventListener(
        "click",
        closeProjectModal
    );


    projectModalBackdrop.addEventListener(
        "click",
        closeProjectModal
    );


    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains("active")
        ) {
            closeProjectModal();
        }

    });

});