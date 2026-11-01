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
    String(value).replace(/[&<>"']/g, (character) => ({  
        "&": "&amp;",  
        "<": "&lt;",  
        ">": "&gt;",  
        '"': "&quot;",  
        "'": "&#39;"  
    })[character]);  

const safeText = (element, value) => {  
    if (element) element.textContent = value;  
};  

const announce = (message) => {  
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
            zIndex: "10000",  
            maxWidth: "90%",  
            padding: "12px 20px",  
            borderRadius: "12px",  
            background: "#33243c",  
            color: "#ffffff",  
            fontSize: "14px",  
            boxShadow: "0 8px 24px rgba(0,0,0,.2)",  
            display: "none"  
        });  

        document.body.appendChild(notice);  
    }  

    notice.textContent = message;  
    notice.style.display = "block";  

    // Avoid requiring external libraries or timers.  
    notice.setAttribute("data-visible", "true");  
};  

/* =====================================================  
   PROJECT INFORMATION  
   ===================================================== */  

const projectDetails = {  
    arthive: {  
        title: "ArtHive",  
        subtitle:  
            "Mobile Application for Preserving and Showcasing Art and Cultural Heritage",  
        description:  
            "ArtHive is a digital platform concept focused on preserving, organizing, and showcasing artworks and cultural heritage. It aims to help users discover creative works and learn about local art and traditions.",  
        role: "Developer",  
        type: "Web or Mobile Application Concept",  
        features: [  
            "Digital Art Gallery",  
            "Cultural Heritage Collection",  
            "Artwork Discovery",  
            "Art and Culture Information"  
        ],  
        technologies: "Not confirmed",  
        status:  
            "Project concept. Current development and prototype status must be verified.",  
        screenshots: "No project screenshots provided.",  
        liveDemo: null,  
        sourceCode: null  
    },  

    "sweet-delicacy": {  
        title: "Honeybunch Sweet Delicacy",  
        subtitle:  
            "Online Food Ordering and Digital Business Platform",  
        description:  
            "Honeybunch Sweet Delicacy is a food business website concept designed to present food products, display a digital menu, and organize the online ordering experience in one place.",  
        role: "Developer",  
        type: "E-commerce Website Concept",  
        features: [  
            "Digital Menu",  
            "Food Product Showcase",  
            "Shopping Cart",  
            "Online Order Interface",  
            "Business Information"  
        ],  
        technologies: "Not confirmed",  
        status:  
            "Project concept. Verify which features are implemented in the current version.",  
        screenshots: "No project screenshots provided.",  
        liveDemo: null,  
        sourceCode: null  
    },  

    feed: {  
        title: "FEED",  
        subtitle:  
            "Web-Based Emergency Food Assistance and Distribution System for Disaster-Prone Barangays in Catbalogan City",  
        description:  
            "FEED is a web application concept designed to support emergency food assistance and distribution. It focuses on organizing food resource information and helping authorized personnel coordinate distribution during emergencies.",  
        role: "Developer",  
        type: "Web Application",  
        features: [  
            "Food Resource Management",  
            "Distribution Information",  
            "Emergency Assistance Records",  
            "User Role Management",  
            "Barangay Distribution Coordination"  
        ],  
        technologies: "Not confirmed",  
        status:  
            "Project concept. Verify current implementation and prototype status.",  
        screenshots: "No project screenshots provided.",  
        liveDemo: null,  
        sourceCode: null  
    }  
};  

/* =====================================================  
   MOBILE NAVIGATION  
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
    menuToggle.setAttribute(  
        "aria-expanded",  
        menuToggle.getAttribute("aria-expanded") || "false"  
    );  

    menuToggle.addEventListener("click", () => {  
        const isExpanded =  
            menuToggle.getAttribute("aria-expanded") === "true";  

        menuToggle.setAttribute(  
            "aria-expanded",  
            String(!isExpanded)  
        );  

        menuToggle.setAttribute(  
            "aria-label",  
            isExpanded  
                ? "Open navigation menu"  
                : "Close navigation menu"  
        );  

        navLinks.classList.toggle("is-open", !isExpanded);  
    });  

    $$("a", navLinks).forEach((link) => {  
        link.addEventListener("click", closeNavigation);  
    });  

    document.addEventListener("click", (event) => {  
        if (  
            navLinks.classList.contains("is-open") &&  
            !navLinks.contains(event.target) &&  
            !menuToggle.contains(event.target)  
        ) {  
            closeNavigation();  
        }  
    });  

    document.addEventListener("keydown", (event) => {  
        if (event.key === "Escape") closeNavigation();  
    });  
}  

/* =====================================================  
   PREVENT PLACEHOLDER LINKS FROM RELOADING THE PAGE  
   ===================================================== */  

$$("[data-placeholder-link]").forEach((link) => {  
    link.addEventListener("click", (event) => {  
        event.preventDefault();  
        announce("This link has not been configured yet.");  
    });  
});  

/* =====================================================  
   PROJECT DETAILS MODAL  
   ===================================================== */  

let projectDialog = $("#project-dialog");  
let projectDialogPanel = null;  
let projectDialogOpener = null;  
let previousBodyOverflow = "";  
let closeTransition = null;  

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

    Object.assign(projectDialog.style, {  
        position: "fixed",  
        inset: "0",  
        zIndex: "9998",  
        display: "none",  
        alignItems: "center",  
        justifyContent: "center",  
        padding: "20px",  
        background: "rgba(20, 13, 28, .75)",  
        overflowY: "auto"  
    });  

    projectDialog.innerHTML = `  
        <section  
            class="project-dialog-panel"  
            role="document"  
            tabindex="-1"  
            style="  
                position: relative;  
                width: 100%;  
                max-width: 720px;  
                max-height: 90vh;  
                overflow-y: auto;  
                padding: 28px;  
                border-radius: 20px;  
                background: #fffafc;  
                color: #33243c;  
            "  
        >  
            <button  
                type="button"  
                class="project-dialog-close"  
                aria-label="Close project details"  
                style="  
                    position: sticky;  
                    float: right;  
                    top: 0;  
                    cursor: pointer;  
                "  
            >✕</button>  

            <div class="project-dialog-content">  
                <h2 id="project-dialog-title">Project Details</h2>  
            </div>  
        </section>  
    `;  

    document.body.appendChild(projectDialog);  
    return projectDialog;  
};  

const initializeProjectDialog = () => {  
    createProjectDialog();  

    projectDialogPanel = $(  
        ".project-dialog-panel",  
        projectDialog  
    );  

    if (!projectDialogPanel) {  
        projectDialogPanel = projectDialog;  
    }  

    const closeButton = $(  
        ".project-dialog-close",  
        projectDialog  
    );  

    if (closeButton) {  
        closeButton.addEventListener("click", closeProjectDialog);  
    }  

    projectDialog.addEventListener("click", (event) => {  
        if (event.target === projectDialog) {  
            closeProjectDialog();  
        }  
    });  

    projectDialog.addEventListener("keydown", (event) => {  
        if (event.key === "Escape") {  
            event.preventDefault();  
            closeProjectDialog();  
            return;  
        }  

        if (event.key !== "Tab") return;  

        const focusable = $$(  
            'a[href], button:not([disabled]), ' +  
            'input:not([disabled]), textarea:not([disabled]), ' +  
            'select:not([disabled]), ' +  
            '[tabindex]:not([tabindex="-1"])',  
            projectDialogPanel  
        ).filter((element) => {  
            return element.getAttribute("aria-hidden") !== "true";  
        });  

        if (focusable.length === 0) {  
            event.preventDefault();  
            projectDialogPanel.focus();  
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
    });  
};  

const renderProjectDetails = (project) => {  
    if (!project) {  
        return `  
            <h2 id="project-dialog-title">Project Not Found</h2>  
            <p>The requested project details are unavailable.</p>  
        `;  
    }  

    const features = project.features  
        .map((feature) => `<li>${escapeHTML(feature)}</li>`)  
        .join("");  

    const liveDemo = project.liveDemo  
        ? `<a href="${escapeHTML(project.liveDemo)}"  
               target="_blank" rel="noopener noreferrer">  
               View Live Demo  
           </a>`  
        : "";  

    const sourceCode = project.sourceCode  
        ? `<a href="${escapeHTML(project.sourceCode)}"  
               target="_blank" rel="noopener noreferrer">  
               View Source Code  
           </a>`  
        : "";  

    return `  
        <h2 id="project-dialog-title">  
            ${escapeHTML(project.title)}  
        </h2>  

        <p><strong>${escapeHTML(project.subtitle)}</strong></p>  

        <p>${escapeHTML(project.description)}</p>  

        <h3>Project Information</h3>  

        <p>  
            <strong>Role:</strong>  
            ${escapeHTML(project.role)}  
        </p>  

        <p>  
            <strong>Type:</strong>  
            ${escapeHTML(project.type)}  
        </p>  

        <p>  
            <strong>Technologies:</strong>  
            ${escapeHTML(project.technologies)}  
        </p>  

        <p>  
            <strong>Status:</strong>  
            ${escapeHTML(project.status)}  
        </p>  

        <h3>Key Features</h3>  

        <ul>${features}</ul>  

        <p>  
            <strong>Screenshots:</strong>  
            ${escapeHTML(project.screenshots)}  
        </p>  

        <div class="project-dialog-links">  
            ${liveDemo}  
            ${sourceCode}  
        </div>  
    `;  
};  

const openProjectDialog = (project, card) => {  
    if (!project) {  
        announce("Project details are unavailable.");  
        return;  
    }  

    initializeProjectDialog();  

    projectDialogOpener = card || document.activeElement;  

    const content = $(  
        ".project-dialog-content",  
        projectDialog  
    );  

    if (!content) return;  

    content.innerHTML = renderProjectDetails(project);  

    previousBodyOverflow = document.body.style.overflow;  
    document.body.style.overflow = "hidden";  

    projectDialog.hidden = false;  
    projectDialog.style.display = "flex";  

    requestAnimationFrame(() => {  
        projectDialog.classList.add("is-open");  

        const closeButton = $(  
            ".project-dialog-close",  
            projectDialog  
        );  

        if (closeButton) {  
            closeButton.focus();  
        } else {  
            projectDialogPanel.focus();  
        }  
    });  
};  

const closeProjectDialog = () => {  
    if (!projectDialog || projectDialog.hidden) return;  

    if (closeTransition !== null) {  
        clearTimeout(closeTransition);  
    }  

    projectDialog.classList.remove("is-open");  
    projectDialog.style.display = "none";  
    projectDialog.hidden = true;  

    document.body.style.overflow = previousBodyOverflow;  

    if (  
        projectDialogOpener &&  
        projectDialogOpener.isConnected  
    ) {  
        projectDialogOpener.focus();  
    }  

    projectDialogOpener = null;  
    closeTransition = null;  
};  

initializeProjectDialog();  

$$("[data-project]").forEach((card) => {  
    card.addEventListener("click", (event) => {  
        const projectKey = card.dataset.project;  
        const project = projectDetails[projectKey];  

        if (!project) return;  

        event.preventDefault();  
        openProjectDialog(project, card);  
    });  

    if (  
        card.tagName !== "BUTTON" &&  
        card.tagName !== "A" &&  
        !card.hasAttribute("tabindex")  
    ) {  
        card.setAttribute("tabindex", "0");  
        card.setAttribute("role", "button");  
    }  

    if (  
        card.getAttribute("role") === "button" ||  
        card.tagName === "DIV"  
    ) {  
        card.addEventListener("keydown", (event) => {  
            if (event.target !== card) return;  

            if (  
                event.key === "Enter" ||  
                event.key === " "  
            ) {  
                event.preventDefault();  
                card.click();  
            }  
        });  
    }  
});  

/* =====================================================  
   TUTORIAL FILTERING  
     
   HTML example:  
   <button data-tutorial-filter="all">All</button>  
   <button data-tutorial-filter="html">HTML</button>  
   <article data-tutorial data-category="html">...</article>  
   ===================================================== */  

const tutorialFilters = $$("[data-tutorial-filter]");  
const tutorials = $$("[data-tutorial]");  

const filterTutorials = (category) => {  
    let visibleCount = 0;  

    tutorials.forEach((tutorial) => {  
        const categories = (  
            tutorial.dataset.category || "all"  
        )  
            .toLowerCase()  
            .split(",")  
            .map((item) => item.trim());  

        const matches =  
            category === "all" ||  
            categories.includes(category) ||  
            categories.includes("all");  

        tutorial.hidden = !matches;  

        if (matches) visibleCount++;  
    });  

    tutorialFilters.forEach((button) => {  
        const isActive =  
            button.dataset.tutorialFilter === category;  

        button.classList.toggle("is-active", isActive);  

        if (isActive) {  
            button.setAttribute("aria-pressed", "true");  
        } else {  
            button.setAttribute("aria-pressed", "false");  
        }  
    });  

    const resultCount = $("[data-tutorial-count]");  

    if (resultCount) {  
        resultCount.textContent =  
            `${visibleCount} tutorial${visibleCount === 1 ? "" : "s"} found`;  
    }  
};  

tutorialFilters.forEach((button) => {  
    button.addEventListener("click", () => {  
        filterTutorials(  
            (button.dataset.tutorialFilter || "all").toLowerCase()  
        );  
    });  
});  

/* =====================================================  
   LEARNING RESOURCE SEARCH  
     
   HTML example:  
   <input data-resource-search>  
   <article data-resource data-title="HTML Basics">...</article>  
   ===================================================== */  

const resourceSearch = $("[data-resource-search]");  
const resources = $$("[data-resource]");  

const searchResources = (query) => {  
    const normalizedQuery = query.trim().toLowerCase();  
    let visibleCount = 0;  

    resources.forEach((resource) => {  
        const searchableText = [  
            resource.dataset.title || "",  
            resource.dataset.category || "",  
            resource.textContent || ""  
        ]  
            .join(" ")  
            .toLowerCase();  

        const matches =  
            searchableText.includes(normalizedQuery);  

        resource.hidden = !matches;  

        if (matches) visibleCount++;  
    });  

    const resultCount =
