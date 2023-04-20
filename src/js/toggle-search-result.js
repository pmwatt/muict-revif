function showResult() {
    // should query for commission
    let found = true;

    // not found
    if (!found) {
        alert("Commission not found. Please try again.");
        return;
    }

    // found, ooga booga just unhide the results div
    const searchResult = document.getElementById("result");
    searchResult.setAttribute("style", "display: flex");
}