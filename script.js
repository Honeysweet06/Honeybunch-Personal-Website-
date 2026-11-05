
/* =========================================================
   HONEYBUNCH — PERSONAL PORTFOLIO & LEARNING PLATFORM
   Complete Combined JavaScript
   File: script.js

   COMPATIBLE PAGES:
   1. index.html
   2. tutorials.html

   HOMEPAGE FEATURES:
   - Interactive project cards
   - ArtHive project details
   - FEED project details
   - Honeybunch Sweet Delicacy details
   - Project details modal
   - Modal close and keyboard support
   - Responsive navigation
   - Automatic footer year

   TUTORIAL FEATURES:
   - Tutorial search
   - Category filtering
   - Free / Premium filtering
   - Tutorial sorting
   - Lesson preview
   - Free lesson PDF reader
   - Open PDF in new tab
   - Download PDF
   - Responsive PDF viewer

   IMPORTANT:
   This code uses your existing HTML and CSS.
   It does not recreate or replace your page content.
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       1. GLOBAL HELPER FUNCTIONS
       ===================================================== */

    const $ = (selector, root = document) =>
        root.querySelector(selector);

    const $$ = (selector, root = document) =>
        Array.from(root.querySelectorAll(selector));

    function setText(selector, value, root = document) {
        const element = $(selector, root);

        if (element) {
            element.textContent = value || "Not provided";
        }
    }

    function lockPageScroll() {
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return previous;
    }

    function restorePageScroll(previous) {
        document.body.style.overflow = previous || "";
    }

    function trapFocus(event, container) {
        if (!container) return;

        const focusable = $$(
            'button:not([disabled]), a[href], input:not([disabled]), ' +
            'select:not([disabled]), textarea:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"])',
            container
        ).filter(element => element.offsetParent !== null);

        if (!focusable.length) {
            event.preventDefault();
            container.focus();
            return;
        }

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

    /* =====================================================
       2. PROJECT DATABASE
       ===================================================== */

    const PROJECTS = {
        arthive: {
            title: "ArtHive",

            subtitle:
                "Mobile Application for Preserving and Showcasing Art and Cultural Heritage",

            description:
                "ArtHive is a project focused on preserving and showcasing artworks and cultural heritage through a digital platform. It aims to make cultural resources more accessible while providing a space to explore and appreciate art.",

            role: "Developer",
            type: "Web App",
            features: "Mini Digital Museum",
            technologies: "Web App",
            status: "Project concept / development",
            screenshots: "Vintage style"
        },

        feed: {
            title: "FEED",

            subtitle:
                "Web-Based Emergency Food Assistance and Distribution System for Disaster-Prone Barangays in Catbalogan City",

            description:
                "FEED is a system concept designed to support emergency food assistance and distribution during disasters. It focuses on helping organize food resources and distribution-related information for participating personnel and communities.",

            role: "Developer",
            type: "Web App",
            features: "Map",
            technologies: "Web App",
            status: "Project concept / development",
            screenshots: "Interactive map"
        },

        "sweet-delicacy": {
            title: "Honeybunch Sweet Delicacy",

            subtitle:
                "Online Food Ordering and Digital Business Platform",

            description:
                "Honeybunch Sweet Delicacy is a food business website concept designed to showcase food products and support online browsing and ordering. It combines a sweet-inspired brand identity with a customer-friendly digital experience.",

            role: "Developer",
            type: "Website",
            features: "Mini Sweet Delicacy Kitchen",
            technologies: "Website",
            status: "Project concept / development",
            screenshots: "Homemade with unique signature style"
        }
    };

    /* =====================================================
       3. HOMEPAGE — PROJECT CARDS
       ===================================================== */

    let projectOpener = null;
    let projectPreviousOverflow = "";

    function initializeProjects() {
        const cards = $$("[data-project]");

        cards.forEach(card => {
            const projectId = card.dataset.project;

            if (!PROJECTS[projectId]) {
                console.warn("Unknown project:", projectId);
                return;
            }

            card.setAttribute("aria-haspopup", "dialog");
            card.setAttribute("aria-controls", "project-dialog");

            card.addEventListener("click", event => {
                event.preventDefault();
                openProject(projectId, card);
            });
        });

        initializeProjectDialog();
    }

    function initializeProjectDialog() {
        const dialog = $("#project-dialog");

        if (!dialog) return;

        $(".project-dialog-close", dialog)
            ?.addEventListener("click", closeProject);

        $$("[data-dialog-close]", dialog).forEach(element => {
            element.addEventListener("click", closeProject);
        });

        dialog.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeProject();
            }

            if (event.key === "Tab") {
                trapFocus(
                    event,
                    $(".project-dialog-panel", dialog)
                );
            }
        });
    }

    function openProject(projectId, opener) {
        const project = PROJECTS[projectId];
        const dialog = $("#project-dialog");

        if (!project || !dialog) {
            console.error("Project details modal unavailable.");
            return;
        }

        projectOpener = opener || document.activeElement;
        projectPreviousOverflow = lockPageScroll();

        // Populate the existing project modal.
        setText("#project-dialog-title", project.title);
        setText("#project-dialog-subtitle", project.subtitle);
        setText("#project-dialog-description", project.description);

        setText("#project-detail-role", project.role);
        setText("#project-detail-type", project.type);
        setText("#project-detail-features", project.features);
        setText("#project-detail-technologies", project.technologies);
        setText("#project-detail-status", project.status);
        setText("#project-detail-screenshots", project.screenshots);

        // Do not create fake repository links.
        const actions = $("#project-detail-actions");

        if (actions) {
            actions.replaceChildren();
            actions.hidden = true;
        }

        dialog.hidden = false;
        dialog.style.display = "grid";

        requestAnimationFrame(() => {
            dialog.classList.add("is-open");
        });

        $(".project-dialog-close", dialog)?.focus();
    }

    function closeProject() {
        const dialog = $("#project-dialog");

        if (!dialog || dialog.hidden) return;

        dialog.classList.remove("is-open");

        const finish = () => {
            if (dialog.classList.contains("is-open")) return;

            dialog.hidden = true;
            dialog.style.display = "";

            restorePageScroll(projectPreviousOverflow);

            if (projectOpener?.isConnected) {
                projectOpener.focus();
            }

            projectOpener = null;
        };

        dialog.addEventListener("transitionend", finish, {
            once: true
        });

        window.setTimeout(finish, 350);
    }

    /* =====================================================
       4. RESPONSIVE MOBILE NAVIGATION
       ===================================================== */

    function initializeNavigation() {
        const toggle = $(".menu-toggle");
        const menu = $("#primary-menu");

        if (!toggle || !menu) return;

        function closeMenu() {
            menu.classList.remove("is-open");
            toggle.classList.remove("is-active");

            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("is-open");

            toggle.classList.toggle("is-active", isOpen);

            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            toggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        $$("a", menu).forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (
                !menu.contains(event.target) &&
                !toggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });
    }

    /* =====================================================
       5. TUTORIAL PDF DATABASE

       Place the actual PDF files inside:
       assets/lessons/

       Change the filenames here if necessary.
       ===================================================== */

    const PDF_FILES = {
        "va-tasks": {
            title: "Organizing a Virtual Assistant's Daily Task List",
            file: "assets/lessons/va-tasks.pdf"
        },

        "folder-system": {
            title: "A Tidy Digital Folder System",
            file: "assets/lessons/folder-system.pdf"
        },

        "semantic-html": {
            title: "Your First Semantic HTML Page",
            file: "assets/lessons/semantic-html.pdf"
        }
    };

    /* =====================================================
       6. TUTORIAL SEARCH AND FILTERING
       ===================================================== */

    function initializeTutorialFilters() {
        const search = $("#tutorial-search");
        const category = $("#tutorial-category");
        const access = $("#tutorial-access");
        const sort = $("#tutorial-sort");

        [search, category, access, sort].forEach(control => {
            if (!control) return;

            control.addEventListener("input", filterTutorials);
            control.addEventListener("change", filterTutorials);
        });

        $$("[data-free-filter]").forEach(button => {
            button.addEventListener("click", () => {
                if (!access) return;

                access.value = "free";
                filterTutorials();
            });
        });

        filterTutorials();
    }

    function filterTutorials() {
        const grid = $("#tutorial-grid");

        if (!grid) return;

        const searchValue = (
            $("#tutorial-search")?.value || ""
        ).trim().toLowerCase();

        const selectedCategory =
            $("#tutorial-category")?.value || "all";

        const selectedAccess =
            $("#tutorial-access")?.value || "all";

        const selectedSort =
            $("#tutorial-sort")?.value || "recommended";

        const cards = $$(".tutorial-card", grid);

        const originalOrder = new Map(
            cards.map((card, index) => [card, index])
        );

        const sortedCards = [...cards].sort((a, b) => {
            if (selectedSort === "title") {
                return getTutorialTitle(a).localeCompare(
                    getTutorialTitle(b)
                );
            }

            if (selectedSort === "duration") {
                return getDuration(a) - getDuration(b);
            }

            if (selectedSort === "difficulty") {
                return getDifficulty(a) - getDifficulty(b);
            }

            return originalOrder.get(a) - originalOrder.get(b);
        });

        sortedCards.forEach(card => grid.appendChild(card));

        let visibleCount = 0;

        cards.forEach(card => {
            const cardCategory = card.dataset.category || "";
            const cardAccess = card.dataset.access || "";
            const cardText = card.textContent.toLowerCase();

            const matchesSearch =
                !searchValue || cardText.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;

            const matchesAccess =
                selectedAccess === "all" ||
                cardAccess === selectedAccess;

            const visible =
                matchesSearch &&
                matchesCategory &&
                matchesAccess;

            card.hidden = !visible;

            if (visible) visibleCount++;
        });

        const results = $("#tutorial-results");

        if (results) {
            results.textContent =
                `${visibleCount} tutorial${visibleCount === 1 ? "" : "s"} found`;
        }

        const empty = $("#tutorial-empty");

        if (empty) {
            empty.hidden = visibleCount !== 0;
        }
    }

    function getTutorialTitle(card) {
        return (
            card.dataset.title ||
            $("h3", card)?.textContent ||
            ""
        ).trim().toLowerCase();
    }

    function getDuration(card) {
        return Number(card.dataset.duration || 0);
    }

    function getDifficulty(card) {
        const levels = {
            beginner: 1,
            intermediate: 2,
            advanced: 3
        };

        return levels[
            (card.dataset.level || "").toLowerCase()
        ] || 99;
    }

    /* =====================================================
       7. TUTORIAL PREVIEW DIALOG
       ===================================================== */

    let lessonOpener = null;
    let lessonPreviousOverflow = "";

    function initializeLessonPreview() {
        const dialog = $("#lesson-dialog");

        if (!dialog) return;

        $(".lesson-close", dialog)
            ?.addEventListener("click", closeLessonPreview);

        $$("[data-lesson-close]", dialog).forEach(element => {
            element.addEventListener("click", closeLessonPreview);
        });

        // Event delegation supports all existing preview buttons.
        document.addEventListener("click", event => {
            const button = event.target.closest("[data-preview]");

            if (!button) return;

            event.preventDefault();

            openLessonPreview(
                button.dataset.preview,
                button
            );
        });

        dialog.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeLessonPreview();
            }

            if (event.key === "Tab") {
                trapFocus(
                    event,
                    $(".lesson-panel", dialog)
                );
            }
        });
    }

    function openLessonPreview(lessonId, opener) {
        const dialog = $("#lesson-dialog");
        const card = opener.closest(".tutorial-card");

        if (!dialog || !card) return;

        lessonOpener = opener;
        lessonPreviousOverflow = lockPageScroll();

        const title =
            $("h3", card)?.textContent.trim() ||
            "Tutorial Preview";

        const description =
            $(".tutorial-card-body > p", card)?.textContent.trim() ||
            "Explore this tutorial.";

        setText("#lesson-label", "TUTORIAL PREVIEW");
        setText("#lesson-title", title);
        setText("#lesson-description", description);

        // Do not invent original lesson content.
        const objectives = $("#lesson-objectives");

        if (objectives) {
            objectives.replaceChildren();
        }

        const content = $("#lesson-content");

        if (content) {
            content.replaceChildren();

            const message = document.createElement("p");

            message.textContent =
                "This is the tutorial preview. Use Read Free Lesson to open the complete PDF when the lesson file is available.";

            content.appendChild(message);
        }

        dialog.hidden = false;

        requestAnimationFrame(() => {
            dialog.classList.add("is-open");
        });

        $(".lesson-close", dialog)?.focus();
    }

    function closeLessonPreview() {
        const dialog = $("#lesson-dialog");

        if (!dialog || dialog.hidden) return;

        dialog.classList.remove("is-open");

        const finish = () => {
            if (dialog.classList.contains("is-open")) return;

            dialog.hidden = true;

            restorePageScroll(lessonPreviousOverflow);

            if (lessonOpener?.isConnected) {
                lessonOpener.focus();
            }

            lessonOpener = null;
        };

        dialog.addEventListener("transitionend", finish, {
            once: true
        });

        window.setTimeout(finish, 350);
    }

    /* =====================================================
       8. CREATE PDF READER
       ===================================================== */

    function initializePDFReader() {
        createPDFViewer();

        // Works with buttons containing data-watch="lesson-id".
        document.addEventListener("click", event => {
            const button = event.target.closest("[data-watch]");

            if (!button) return;

            event.preventDefault();

            openPDF(button.dataset.watch, button);
        });
    }

    function createPDFViewer() {
        if ($("#hb-tutorial-pdf")) return;

        const viewer = document.createElement("div");

        viewer.id = "hb-tutorial-pdf";
        viewer.hidden = true;

        viewer.setAttribute("role", "dialog");
        viewer.setAttribute("aria-modal", "true");
        viewer.setAttribute("aria-labelledby", "hb-pdf-title");

        viewer.innerHTML = `
            <div class="hb-pdf-backdrop" data-pdf-close></div>

            <section class="hb-pdf-panel" tabindex="-1">

                <header class="hb-pdf-header">
                    <div>
                        <p>HONEYBUNCH FREE LESSON</p>
                        <h2 id="hb-pdf-title">Lesson PDF</h2>
                    </div>

                    <button
                        type="button"
                        class="hb-pdf-close"
                        data-pdf-close
                        aria-label="Close PDF reader">
                        Close ×
                    </button>
                </header>

                <div class="hb-pdf-actions">

                    <a
                        id="hb-pdf-new-tab"
                       
