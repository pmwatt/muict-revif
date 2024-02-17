function openMenu(menu) {
    const menus = document.getElementsByClassName("menu");
    for (let index = 0; index < menus.length; index++) {
        const element = menus[index];
        element.setAttribute("style", "display: none");
    }
    document.getElementById(menu).setAttribute("style", "display: flex");
}