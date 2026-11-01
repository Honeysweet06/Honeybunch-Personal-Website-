/* =========================================================
   HONEYBUNCH — PERSONAL PORTFOLIO & LEARNING PLATFORM
   Brand: Honeybunch by Honeylyn A. Moreno

   FEATURES
   1. Responsive Mobile Navigation
   2. Interactive Project Gallery
   3. Project Details Modal
   4. Keyboard Accessibility
   5. Tutorial Filtering
   6. Learning Resource Search
   7. Certificate Gallery
   8. Subscriber Dashboard Demo
   9. Newsletter / Subscription Form Demo
   10. Footer Year
   11. Scroll Reveal Animations
   12. Back-to-Top Button
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const escapeHTML = (value = "") =>
        String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);

    const announce = message => {
        let notice = $("#hb-notice");

        if (!notice) {
            notice = document.createElement("div");
            notice.id = "hb-notice";
            notice.setAttribute("role", "status");
            notice.setAttribute("aria-live", "polite");

            Object.assign(notice.style, {
                position: "fixed",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "100000",
                maxWidth: "90%",
                padding: "12px 20px",
                borderRadius: "12px",
                background: "#6d3546",
                color: "#ffffff",
                fontSize: "14px",
                boxShadow: "0 8px 24px rgba(0,0,0,.2)"
            });

            document.body.appendChild(notice);
        }

        notice.textContent = message;
        notice.hidden = false;

        clearTimeout(notice.hideTimer);

        notice.hideTimer = setTimeout(() => {
            notice.hidden = true;
        }, 3000);
    };

    /* =====================================================
       PROJECT INFORMATION

       Update liveDemo and sourceCode when real URLs exist.
       ===================================================== */

    const projectDetails = {
        arthive: {
            title: "ART HIVE",

            subtitle:
                "Mobile Application for Preserving and Showcasing Art and Cultural Heritage",

            description:
                "ArtHive is a project focused on preserving and showcasing artworks and cultural heritage through a digital platform. It aims to make cultural resources more accessible while providing a space to explore and appreciate art.",

            role: "Developer",

            type: "Web App",

            technologies: "HTML, CSS, JavaScript — verify against your implementation",

            features: [
                "Mini Digital Museum",
                "Digital Art Gallery",
                "Cultural Heritage Collection",
                "Artwork Discovery"
            ],

            screenshots: "Vintage style",

            status: "Project concept / development status to be verified",

            liveDemo: "",

            sourceCode: ""
        },

        "sweet-delicacy": {
            title: "HONEYBUNCH SWEET DELICACY",

            subtitle:
                "Online Food Ordering and Digital Business Platform",

            description:
                "Honeybunch Sweet Delicacy is a food business website concept designed to showcase food products and support online browsing and ordering. It combines a sweet-inspired brand identity with a customer-friendly digital experience.",

            role: "Developer",

            type: "Website",

            technologies: "HTML, CSS, JavaScript — verify against your implementation",

            features: [
                "Mini Sweet Delicacy Kitchen",
                "Food Product Showcase",
                "Digital Menu",
                "Shopping Cart Interface",
                "Online Ordering Interface"
            ],

            screenshots: "Homemade with unique signature style",

            status: "Project concept / development status to be verified",

            liveDemo: "",

            sourceCode: ""
        },

        feed: {
            title: "FEED",

            subtitle:
                "Web-Based Emergency Food Assistance and Distribution System for Disaster-Prone Barangays in Catbalogan City",

            description:
                "FEED is a system concept designed to support emergency food assistance and distribution during disasters. It focuses on helping organize food resources and distribution-related information for participating personnel and communities.",

            role: "Developer",

            type: "Web Application",

            technologies: "To be confirmed",

            features: [
                "Interactive Map Concept",
                "Food Resource Management",
                "Distribution Information",
                "Emergency Assistance Records",
                "Barangay Distribution Coordination"
            ],

            screenshots: "Interactive map",

            status: "Academic project / development status to be verified",

            liveDemo: "",

            sourceCode: ""
        }
    };

    /* =====================================================
       RESPONSIVE MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = $(".menu-toggle");
    const navLinks = $(".nav-links");

    const closeNavigation = () => {
        if (!menuToggle || !navLinks) return;

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        navLinks.classList.remove("is-open");
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!expanded)
            );

            menuToggle.setAttribute(
                "aria-label",
                expanded
                    ? "Open navigation menu"
                    : "Close navigation menu"
            );

            navLinks.classList.toggle("is-open", !expanded);
        });

        $$("a", navLinks).forEach(link => {
            link.addEventListener("click", closeNavigation);
        });

        document.addEventListener("click", event => {
            if (
                navLinks.classList.contains("is-open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeNavigation();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeNavigation();
        });
    }

    /* =====================================================
       PLACEHOLDER LINKS
       ===================================================== */

    $$("[data-placeholder-link]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            announce("This link has not been configured yet.");
        });
    });

    /* =====================================================
       PROJECT DETAILS MODAL
       Cream background + burgundy text
       ===================================================== */

    let projectDialog = null;
    let projectDialogOpener = null;
    let previousBodyOverflow = "";

    const addProjectModalStyles = () => {
        if ($("#hb-project-modal-styles")) return;

        const style = document.createElement("style");
        style.id = "hb-project-modal-styles";

        style.textContent = `
            .project-dialog {
                position: fixed;
                inset: 0;
                z-index: 99998;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                background: rgba(35, 23, 31, .78);
                overflow-y: auto;
            }

            .project-dialog[hidden] {
                display: none !important;
            }

            .project-dialog-panel {
                box-sizing: border-box;
                position: relative;
                width: 100%;
                max-width: 650px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 28px;
                border-radius: 42px;
                background: #fffaf3;
                color: #3b2630;
                box-shadow: 0 18px 55px rgba(0,0,0,.25);
            }

            .project-dialog-eyebrow {
                margin: 8px 0 12px;
                letter-spacing: 3px;
                font-size: 13px;
                color: #744b59;
            }

            .project-dialog-close {
                float: right;
                margin-left: 12px;
                padding: 9px 20px;
                border: 2px solid #6d3546;
                border-radius: 28px;
                background: transparent;
                color: #6d3546;
                font: inherit;
                cursor: pointer;
            }

            .project-dialog-close:hover {
                background: #6d3546;
                color: #fff;
            }

            .project-dialog-content h2 {
                margin: 12px 0 22px;
                font-family: Georgia, serif;
                font-size: clamp(25px, 5vw, 34px);
                line-height: 1.3;
            }

            .hb-project-subtitle {
                color: #633447;
                font-size: 17px;
                line-height: 1.5;
            }

            .hb-project-description {
                font-size: 16px;
                line-height: 1.65;
            }

            .hb-project-field {
                margin-top: 20px;
            }

            .hb-project-label {
                display: block;
                margin-bottom: 8px;
                color: #795e68;
                font-size: 14px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
            }

            .hb-project-value {
                padding: 15px 18px;
                border: 2px dashed #b9a3a0;
                border-radius: 22px;
                color: #705b63;
                line-height: 1.6;
                overflow-wrap: anywhere;
            }

            .hb-project-value ul {
                margin: 0;
                padding-left: 20px;
            }

            .hb-project-value a {
                color: #7c2f50;
                overflow-wrap: anywhere;
            }

            @media (max-width: 480px) {
                .project-dialog {
                    padding: 12px;
                }

                .project-dialog-panel {
                    padding: 22px 18px;
                    border-radius: 32px;
                }
            }
        `;

        document.head.appendChild(style);
    };

    const createProjectDialog = () => {
        if (projectDialog) return projectDialog;

        projectDialog = document.createElement("div");
        projectDialog.id = "project-dialog";
        projectDialog.className = "project-dialog";
        projectDialog.hidden = true;

        projectDialog.setAttribute("role", "dialog");
        projectDialog.setAttribute("aria-modal", "true");
        projectDialog.setAttribute(
            "aria-labelledby",
            "project-dialog-title"
        );

        projectDialog.innerHTML = `
            <section
                class="project-dialog-panel"
                role="document"
                tabindex="-1"
            >
                <button
                    type="button"
                    class="project-dialog-close"
                    aria-label="Close project details"
                >
                    Close
                </button>

                <p class="project-dialog-eyebrow">
                    PROJECT DETAILS
                </p>

                <div class="project-dialog-content"></div>
            </section>
        `;

        document.body.appendChild(projectDialog);

        $(".project-dialog-close", projectDialog)
            .addEventListener("click", closeProjectDialog);

        projectDialog.addEventListener("click", event => {
            if (event.target === projectDialog) {
                closeProjectDialog();
            }
        });

        projectDialog.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeProjectDialog();
            }

            if (event.key === "Tab") {
                trapProjectFocus(event);
            }
        });

        return projectDialog;
    };

    const projectField = (label, content) => `
        <div class="hb-project-field">
            <span class="hb-project-label">
                ${escapeHTML(label)}
            </span>

            <div class="hb-project-value">
                ${content}
            </div>
        </div>
    `;

    const renderProjectDetails = project => {
        const features = project.features
            .map(feature => `<li>${escapeHTML(feature)}</li>`)
            .join("");

        const liveDemo = project.liveDemo
            ? `<a href="${escapeHTML(project.liveDemo)}"
                  target="_blank"
                  rel="noopener noreferrer">View Live Project</a>`
            : "Not added yet";

        const repository = project.sourceCode
            ? `<a href="${escapeHTML(project.sourceCode)}"
                  target="_blank"
                  rel="noopener noreferrer">View Repository</a>`
            : "Not added yet";

        return `
            <h2 id="project-dialog-title">
                ${escapeHTML(project.title)}
            </h2>

            <p class="hb-project-subtitle">
                ${escapeHTML(project.subtitle)}
            </p>

            <p class="hb-project-description">
                ${escapeHTML(project.description)}
            </p>

            ${projectField("Project Role",
                escapeHTML(project.role))}

            ${projectField("Technologies",
                escapeHTML(project.technologies))}

            ${projectField("Key Features",
                `<ul>${features}</ul>`)}

            ${projectField("Screenshots",
                escapeHTML(project.screenshots))}

            ${projectField("Project Status",
                escapeHTML(project.status))}

            ${projectField("Live Project", liveDemo)}

            ${projectField("Repository URL", repository)}
        `;
    };

    function openProjectDialog(projectKey, opener) {
        const project = projectDetails[projectKey];

        if (!project) {
            announce("Project details are unavailable.");
            return;
        }

        addProjectModalStyles();
        createProjectDialog();

        projectDialogOpener = opener || document.activeElement;

        $(".project-dialog-content", projectDialog).innerHTML =
            renderProjectDetails(project);

        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        projectDialog.hidden = false;

        $(".project-dialog-close", projectDialog).focus();
    }

    function closeProjectDialog() {
        if (!projectDialog || projectDialog.hidden) return;

        projectDialog.hidden = true;
        document.body.style.overflow = previousBodyOverflow;

        if (
            projectDialogOpener &&
            projectDialogOpener.isConnected
        ) {
            projectDialogOpener.focus();
        }

        projectDialogOpener = null;
    }

    function trapProjectFocus(event) {
        const focusable = $$(
            'button, a[href], input, select, textarea, ' +
            '[tabindex]:not([tabindex="-1"])',
            projectDialog
        ).filter(element => !element.disabled);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === first
        ) {
            event.preventDefault();
            last.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === last
        ) {
            event.preventDefault();
            first.focus();
        }
    }

    const connectProjectButtons = () => {
        $$("[data-project]").forEach(button => {
            if (button.dataset.projectConnected === "true") return;

            button.dataset.projectConnected = "true";

            button.addEventListener("click", event => {
                event.preventDefault();

                openProjectDialog(
                    button.dataset.project,
                    button
                );
            });

            if (
                button.tagName !== "BUTTON" &&
                button.tagName !== "A" &&
                !button.hasAttribute("tabindex")
            ) {
                button.setAttribute("tabindex", "0");
                button.setAttribute("role", "button");
            }
        });
    };

    /* =====================================================
       TUTORIAL FILTERING

       Example:
       <button data-tutorial-filter="html">HTML</button>
       <article data-tutorial data-category="html">...</article>
       ===================================================== */

    const tutorialFilters = $$("[data-tutorial-filter]");
    const tutorials = $$("[data-tutorial]");

    const filterTutorials = category => {
        let visibleCount = 0;

        tutorials.forEach(tutorial => {
            const categories = (
                tutorial.dataset.category || "all"
            )
                .toLowerCase()
                .split(",")
                .map(item => item.trim());

            const matches =
                category === "all" ||
                categories.includes(category) ||
                categories.includes("all");

            tutorial.hidden = !matches;

            if (matches) visibleCount++;
        });

        tutorialFilters.forEach(button => {
            const active =
                button.dataset.tutorialFilter === category;

            button.classList.toggle("is-active", active);

            button.setAttribute(
                "aria-pressed",
                String(active)
            );
        });

        const resultCount = $("[data-tutorial-count]");

        if (resultCount) {
            resultCount.textContent =
                `${visibleCount} tutorial${visibleCount === 1 ? "" : "s"} found`;
        }
    };

    tutorialFilters.forEach(button => {
        button.addEventListener("click", () => {
            filterTutorials(
                (button.dataset.tutorialFilter || "all").toLowerCase()
            );
        });
    });

    /* =====================================================
       LEARNING RESOURCE SEARCH
       ===================================================== */

    const resourceSearch = $("[data-resource-search]");
    const resources = $$("[data-resource]");

    const searchResources 
