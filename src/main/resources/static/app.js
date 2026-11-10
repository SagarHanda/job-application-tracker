
const API_URL = "/api/applications";

let applications = [];

const formSection = document.getElementById("formSection");
const applicationForm = document.getElementById("applicationForm");
const applicationTable = document.getElementById("applicationTable");

document.getElementById("addJobBtn").addEventListener("click", () => {
    resetForm();
    formSection.style.display = "block";
    formSection.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    formSection.style.display = "none";
});

document.getElementById("searchInput").addEventListener("input", renderApplications);

document.getElementById("statusFilter").addEventListener("change", renderApplications);

// Load all applications from backend
async function loadApplications() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load applications");
        }

        applications = await response.json();

        updateDashboard();
        renderApplications();

    } catch (error) {
        console.error(error);
        applicationTable.innerHTML =
            '<tr><td colspan="6">Could not load applications. Please try again.</td></tr>';
    }
}

// Update dashboard statistics
function updateDashboard() {
    document.getElementById("totalCount").textContent = applications.length;

    document.getElementById("appliedCount").textContent =
        applications.filter(app => app.status === "APPLIED").length;

    document.getElementById("interviewCount").textContent =
        applications.filter(app => app.status === "INTERVIEW").length;

    document.getElementById("offerCount").textContent =
        applications.filter(app => app.status === "OFFER").length;
}

// Display applications in table
function renderApplications() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedStatus = document.getElementById("statusFilter").value;

    const filteredApplications = applications.filter(app => {
        const matchesSearch =
            (app.jobTitle || "").toLowerCase().includes(searchText) ||
            (app.company || "").toLowerCase().includes(searchText);

        const matchesStatus =
            !selectedStatus || app.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    applicationTable.innerHTML = "";

    if (filteredApplications.length === 0) {
        applicationTable.innerHTML =
            '<tr><td colspan="6">No applications found.</td></tr>';
        return;
    }

    filteredApplications.forEach(app => {
        const row = document.createElement("tr");

        const values = [
            app.jobTitle,
            app.company,
            app.location || "-",
            app.status,
            app.appliedDate || "-"
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-btn edit-btn";
        editButton.addEventListener("click", () => editApplication(app.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-btn delete-btn";
        deleteButton.addEventListener("click", () => deleteApplication(app.id));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        applicationTable.appendChild(row);
    });
}

// Add or update application
applicationForm.addEventListener("submit", async event => {
    event.preventDefault();

    const id = document.getElementById("applicationId").value;

    const application = {
        jobTitle: document.getElementById("jobTitle").value.trim(),
        company: document.getElementById("company").value.trim(),
        location: document.getElementById("location").value.trim(),
        jobUrl: document.getElementById("jobUrl").value.trim(),
        status: document.getElementById("status").value,
        appliedDate: document.getElementById("appliedDate").value || null,
        notes: document.getElementById("notes").value.trim()
    };

    try {
        const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        });

        if (!response.ok) {
            throw new Error("Unable to save application");
        }

        alert(id ? "Application updated!" : "Application added!");

        resetForm();
        formSection.style.display = "none";
        await loadApplications();

    } catch (error) {
        alert("Something went wrong while saving the application.");
        console.error(error);
    }
});

// Edit an application
function editApplication(id) {
    const app = applications.find(item => item.id === id);

    if (!app) return;

    document.getElementById("applicationId").value = app.id;
    document.getElementById("jobTitle").value = app.jobTitle || "";
    document.getElementById("company").value = app.company || "";
    document.getElementById("location").value = app.location || "";
    document.getElementById("jobUrl").value = app.jobUrl || "";
    document.getElementById("status").value = app.status;
    document.getElementById("appliedDate").value = app.appliedDate || "";
    document.getElementById("notes").value = app.notes || "";

    document.getElementById("formTitle").textContent = "Edit Application";

    formSection.style.display = "block";
    formSection.scrollIntoView({ behavior: "smooth" });
}

// Delete an application
async function deleteApplication(id) {
    if (!confirm("Are you sure you want to delete this application?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete application");
        }

        await loadApplications();
        alert("Application deleted successfully!");

    } catch (error) {
        alert("Could not delete application.");
        console.error(error);
    }
}

// Reset form
function resetForm() {
    applicationForm.reset();
    document.getElementById("applicationId").value = "";
    document.getElementById("formTitle").textContent = "Add New Application";
}

// Load data when page opens
loadApplications();
