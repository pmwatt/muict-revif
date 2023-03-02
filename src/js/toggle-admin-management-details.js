
function showRemoveTable() {
    // should query for record with the same user ID
    let found = true;

    // not found
    if (!found) {
        alert("User ID not found. Please try again.");
        return;
    }

    // found
    const modifyTable = document.getElementById("remove-details");
    modifyTable.setAttribute("style", "visibility: visible");
}

function showModifyTable() {
    // should query for record with the same user ID
    let found = true;

    // not found
    if (!found) {
        alert("User ID not found. Please try again.");
        return;
    }

    // found
    const modifyTable = document.getElementById("modify-details");
    modifyTable.setAttribute("style", "visibility: visible");
}