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
