// Shorthand for $( document ).ready()
$(function () {
    let pathname = window.location.pathname;
    switch (pathname) {
        case "/":
            $("#homeNavItem").addClass("active");
            break;
        case "/view":
            $("#viewNavItem").addClass("active");
            break;
        case "/add":
            $("#addNavItem").addClass("active");
            break;
    }
});

function toggle_btn(element, state) {
    if (!state) {
        element.prop("disabled", true);
        element.html(`<i class="fas fa-spinner fa-spin"></i>&nbsp;Adding...`);
    } else {
        element.prop("disabled", false);
        element.html(`<i class="fa-solid fa-plus"></i>&nbsp;Add`);
    }
}
