
/* =========================================================
   HONEYBUNCH — TUTORIALS.JS
   Interactive Tutorial Library
   Compatible with the uploaded tutorials.html

   FEATURES
   1. Search tutorials
   2. Filter by category
   3. Filter free and premium topics
   4. Sort tutorials
   5. Preview lesson content
   6. Read complete free written lessons
   7. Print / Save free lessons as PDF
   8. Close lesson dialog
   9. Mobile navigation
   10. Automatic footer year
   11. Keyboard accessibility

   Save as: tutorials.js
   ========================================================= */

(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", init);

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const lessons = {
        "va-tasks": {
            title: "Organizing a Virtual Assistant's Daily Task List",
            category: "Virtual Assistance",
            duration: "8 minutes",
            level: "Beginner",
            free: true,

            description:
                "Learn a simple way to organize daily responsibilities, arrange priorities, and keep client tasks easy to review.",

            objectives: [
                "Understand why task organization matters.",
                "Identify urgent and important responsibilities.",
                "Create a simple daily task list.",
                "Review completed and pending tasks."
            ],

            preview: `
                <p>This lesson introduces a practical approach to
                organizing a Virtual Assistant's daily responsibilities.</p>
                <p>You will learn how to list tasks, identify deadlines,
                and keep your work organized.</p>
            `,

            content: `
                <h3>1. Introduction</h3>
                <p>A Virtual Assistant may handle different responsibilities
                such as responding to emails, organizing files, preparing
                documents, managing schedules, and conducting online research.</p>

                <p>Without an organized task list, it can become difficult
                to remember deadlines and determine which task needs attention
                first.</p>

                <h3>2. Write Down Your Tasks</h3>
                <p>Start by listing the responsibilities assigned to you.
                Avoid depending only on memory.</p>

                <ul>
                    <li>Check and organize emails.</li>
                    <li>Prepare documents.</li>
                    <li>Update task records.</li>
                    <li>Research information requested by a client.</li>
                    <li>Review upcoming deadlines.</li>
                </ul>

                <h3>3. Identify Priorities</h3>
                <p>Arrange tasks according to their importance and deadlines.
                A simple priority system can help:</p>

                <ul>
                    <li><strong>High priority:</strong> Tasks with urgent
                    deadlines or important consequences.</li>
                    <li><strong>Medium priority:</strong> Tasks that should
                    be completed during the day.</li>
                    <li><strong>Low priority:</strong> Tasks that can be
                    scheduled after more urgent responsibilities.</li>
                </ul>

                <h3>4. Create a Daily Task List</h3>
                <p>Use a notebook, spreadsheet, or digital task manager.
                Include the task name, deadline, priority, and current status.</p>

                <p><strong>Example:</strong></p>

                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Check client email</td>
                            <td>High</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>Organize documents</td>
                            <td>Medium</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>Update task records</td>
                            <td>Low</td>
                            <td>Pending</td>
                        </tr>
                    </tbody>
                </table>

                <h3>5. Review Your Progress</h3>
                <p>At the end of your work period, review completed tasks
                and identify anything that needs to be continued.</p>

                <p>Update your task list so that your next working session
                starts with clear priorities.</p>

                <h3>Key Takeaway</h3>
                <p>A well-organized task list helps a Virtual Assistant
                manage responsibilities, communicate clearly, and keep
                work progress easy to monitor.</p>

                <h3>Practice Activity</h3>
                <p>Create a sample daily task list containing five tasks.
                Assign each task a priority and a deadline.</p>
            `
        },

        "folder-system": {
            title: "A Tidy Digital Folder System",
            category: "Digital Productivity",
            duration: "7 minutes",
            level: "Beginner",
            free: true,

            description:
                "Learn how to organize digital folders and use consistent file names to make documents easier to locate.",

            objectives: [
                "Understand the importance of file organization.",
                "Create a simple folder structure.",
                "Use consistent file naming.",
                "Maintain organized digital documents."
            ],

            preview: `
                <p>This lesson explains how to create a predictable
                folder structure and organize documents using meaningful
                file names.</p>
            `,

            content: `
                <h3>1. Introduction</h3>
                <p>Digital files can become difficult to locate when
                documents are saved in random folders or given unclear
                file names.</p>

                <p>A consistent folder system makes it easier to find,
                organize, and share important information.</p>

                <h3>2. Create Main Folders</h3>
                <p>Begin with a few main folders based on the type of
                information you regularly handle.</p>

                <ul>
                    <li>Documents</li>
                    <li>Projects</li>
                    <li>Images</li>
                    <li>Reports</li>
                    <li>Learning Materials</li>
                </ul>

                <h3>3. Create Subfolders</h3>
                <p>When a main folder contains many files, divide it into
                smaller groups.</p>

                <p><strong>Example folder structure:</strong></p>

                <pre>
Documents/
    School/
        Activities/
        Reports/
        Certificates/

    Personal/
        Records/
        Applications/

Projects/
    Website/
    Research/
                </pre>

                <h3>4. Use Meaningful File Names</h3>
                <p>A file name should describe what the document contains.</p>

                <p>Instead of using names such as:</p>

                <ul>
                    <li>document1</li>
                    <li>finalfile2</li>
                    <li>newdocument</li>
                </ul>

                <p>Use clearer names such as:</p>

                <ul>
                    <li>Project_Proposal_2026</li>
                    <li>Monthly_Report_November</li>
                    <li>Portfolio_Introduction</li>
                </ul>

                <h3>5. Maintain Your Folder System</h3>
                <p>Review your folders regularly. Move misplaced files,
                remove unnecessary duplicates, and keep important documents
                in their correct locations.</p>

                <h3>Key Takeaway</h3>
                <p>A tidy digital folder system saves time and makes
                document management more efficient.</p>

                <h3>Practice Activity</h3>
                <p>Create three main folders on your device. Add at least
                two subfolders to each and give your sample files
                descriptive names.</p>
            `
        },

        "semantic-html": {
            title: "Your First Semantic HTML Page",
            category: "IT and Web Development",
            duration: "10 minutes",
            level: "Beginner",
            free: true,

            description:
                "Understand the purpose of common HTML page landmarks and create a simple, meaningful webpage structure.",

            objectives: [
                "Understand what semantic HTML means.",
                "Identify common semantic HTML elements.",
                "Recognize the structure of a webpage.",
                "Create a basic HTML document."
            ],

            preview: `
                <p>This beginner lesson introduces semantic HTML elements
                and explains how they help organize webpage content.</p>
            `,

            content: `
                <h3>1. What Is HTML?</h3>
                <p>HTML stands for HyperText Markup Language. It is used
                to structure content on a webpage.</p>

                <p>HTML elements describe different parts of a page,
                such as headings, paragraphs, navigation links, and
                sections.</p>

                <h3>2. What Is Semantic HTML?</h3>
                <p>Semantic HTML uses elements that communicate the meaning
                and purpose of their content.</p>

                <p>Instead of using generic containers for everything,
                semantic elements help describe the structure of a page.</p>

                <h3>3. Common Semantic Elements</h3>

                <ul>
                    <li><strong>header:</strong> Introduces a page or section.</li>
                    <li><strong>nav:</strong> Contains navigation links.</li>
                    <li><strong>main:</strong> Contains the main page content.</li>
                    <li><strong>section:</strong> Groups related content.</li>
                    <li><strong>article:</strong> Represents independent content.</li>
                    <li><strong>aside:</strong> Contains related supporting content.</li>
                    <li><strong>footer:</strong> Contains footer information.</li>
                </ul>

                <h3>4. Basic HTML Document Structure</h3>

                <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport"
          content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Webpage&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;header&gt;
        &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
    &lt;/header&gt;

    &lt;nav&gt;
        &lt;a href="#home"&gt;Home&lt;/a&gt;
        &lt;a href="#about"&gt;About&lt;/a&gt;
    &lt;/nav&gt;

    &lt;main&gt;
        &lt;section id="home"&gt;
            &lt;h2&gt;Home&lt;/h2&gt;
            &lt;p&gt;This is my first webpage.&lt;/p&gt;
        &lt;/section&gt;
    &lt;/main&gt;

    &lt;footer&gt;
        &lt;p&gt;My Website&lt;/p&gt;
    &lt;/footer&gt;

&lt;/body&gt;
&lt;/html&gt;
                </code></pre>

                <h3>5. Why Semantic HTML Matters</h3>
                <p>Semantic elements make page structure easier to
                understand and maintain. They also help browsers and
                assistive technologies interpret webpage content.</p>

                <h3>Key Takeaway</h3>
                <p>Semantic HTML provides a meaningful structure for
                webpages and is an important foundation for learning
                web development.</p>

                <h3>Practice Activity</h3>
                <p>Create a simple personal webpage containing a header,
                navigation area, main section, and footer.</p>
            `
        },

        /* Premium topics are previews only.
           Their full lessons are not published. */

        "ai-rubric": {
            title: "Evaluating AI Responses with a Simple Rubric",
            category: "AI Tools and Digital Skills",
            free: false,
            description:
                "A guided learning path about checking relevance, accuracy, clarity, and instruction-following.",
            objectives: [
                "Understand response evaluation.",
                "Explore relevance and clarity.",
                "Learn why accuracy matters."
            ],
            preview: `
                <p>This planned topic introduces ways to evaluate AI-generated
                responses using relevance, accuracy, clarity, and
                instruction-following as review criteria.</p>
                <p><strong>Full lesson not published.</strong></p>
            `
        },

        "github-deploy": {
            title: "From GitHub Repository to Published Website",
            category: "GitHub and Website Deployment",
            free: false,
            description:
                "A planned deployment walkthrough covering repository preparation and hosting decisions.",
            objectives: [
                "Understand repository preparation.",
                "Explore website hosting.",
                "Understand deployment workflows."
            ],
            preview: `
                <p>This planned topic introduces the general process
                of preparing a website repository and publishing
                a website through a hosting platform.</p>
                <p><strong>Full lesson not published.</strong></p>
            `
        },

        "safe-ai": {
            title: "Choosing a Safe and Useful AI Tool",
            category: "Beginner-Friendly Technology",
            free: false,
            description:
                "A planned beginner activity about checking tool purpose, privacy, and fit before using a new digital service.",
            objectives: [
                "Identify the purpose of a digital tool.",
                "Consider privacy before sharing information.",
                "Evaluate whether a tool meets a learning need."
            ],
            preview: `
                <p>This planned topic introduces factors to consider
                when selecting an AI tool, including its purpose,
                privacy practices, and usefulness.</p>
                <p><strong>Full lesson not published.</strong></p>
            `
        }
    };

    /* =========================================================
       INITIALIZATION
       ========================================================= */

    function init() {
        setupNavigation();
        setupFooter();
        setupTutorialFilters();
        setupLessonButtons();
        setupLessonDialog();
        setupFreeFilter();

        console.info("Honeybunch Tutorials initialized.");
    }

    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */

    function setupNavigation() {
        const toggle = $(".menu-toggle");
        const menu = $("#primary-menu");

        if (!toggle || !menu) return;

        function closeMenu() {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation menu");
        }

        toggle.addEventListener("click", () => {
            const open = menu.classList.toggle("is-open");

            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute(
                "aria-label",
                open ? "Close navigation menu" : "Open navigation menu"
            );
        });

        $$(".nav-links a", menu).forEach(link => {
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
    }

    /* =========================================================
       FOOTER YEAR
       ========================================================= */

    function setupFooter() {
        const year = $("#year");

        if (year) {
            year.textContent = new Date().getFullYear();
        }
    }

    /* =========================================================
       TUTORIAL FILTERING AND SEARCH
       ========================================================= */

    function setupTutorialFilters() {
        const search = $("#tutorial-search");
        const category = $("#tutorial-category");
        const access = $("#tutorial-access");
        const sort = $("#tutorial-sort");

        [search, category, access, sort].forEach(control => {
            if (!control) return;

            control.addEventListener("input", filterTutorials);
            control.addEventListener("change", filterTutorials);
        });

        filterTutorials();
    }

    function filterTutorials() {
        const search = ($("#tutorial-search")?.value || "")
            .trim()
            .toLowerCase();

        const category = $("#tutorial-category")?.value || "all";
        const access = $("#tutorial-access")?.value || "all";
        const sort = $("#tutorial-sort")?.value || "recommended";

        const grid = $("#tutorial-grid");
        const result = $("#tutorial-results");
        const empty = $("#tutorial-empty");

        if (!grid) return;

        const cards = $$(".tutorial-card", grid);

        const orderedCards = [...cards];

        orderedCards.sort((a, b) => {
            if (sort === "title") {
                return getTitle(a).localeCompare(getTitle(b));
            }

            if (sort === "duration") {
                return getDuration(a) - getDuration(b);
            }

            if (sort === "difficulty") {
                return getLevelRank(a) - getLevelRank(b);
            }

            return cards.indexOf(a) - cards.indexOf(b);
        });

        orderedCards.forEach(card => grid.appendChild(card));

        let visibleCount = 0;

        cards.forEach(card => {
            const title = getTitle(card);
            const description = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category;
            const cardAccess = card.dataset.access;

            const matchesSearch =
                !search ||
                title.includes(search) ||
                description.includes(search);

            const matchesCategory =
                category === "all" ||
                cardCategory === category;

            const matchesAccess =
                access === "all" ||
                cardAccess === access;

            const visible =
                matchesSearch &&
                matchesCategory &&
                matchesAccess;

            card.hidden = !visible;

            if (visible) visibleCount++;
        });

        if (result) {
            result.textContent =
                `${visibleCount} tutorial${visibleCount === 1 ? "" : "s"} found`;
        }

        if (empty) {
            empty.hidden = visibleCount !== 0;
        }
    }

    function getTitle(card) {
       
