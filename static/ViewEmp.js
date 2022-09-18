$(function () {
    $.ajax({
        url: "/api/get",
        method: "GET",
        success: (data, textStatus, jqXHR) => {
            $("#emptable tbody").html("");
            if (data.data.length == 0) {
                $("#emptable tbody").html(
                    `<tr><td colspan="6"><div style="text-align: center">No data</div></td></tr>`
                );
            }
            data.data.forEach((data, idx) => {
                $("#emptable tbody").append(`<tr>
                                            <td>${idx + 1}</td>
                                            <td>${data.emp_id}</td>
                                            <td>${data.first_name} ${
                    data.last_name
                }</td>
                                            <td>${data.pri_skill}</td>
                                            <td>${data.location}</td>
                                            <td>
                                                <button class="btn btn-primary"><i class="fa-solid fa-eye"></i>&nbsp;View</button>
                                                <a href="/edit/${
                                                    data.emp_id
                                                }"><button class="btn btn-success"><i
                                                            class="fa-solid fa-pencil"></i>&nbsp;Edit</button></a>
                                                <button onclick="deleteOnClick(event)" class="btn btn-danger"><i class="fa-solid fa-trash"></i>&nbsp;Delete</button>
                                            </td>
                                        </tr>`);
            });
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error(errorThrown);
        },
    });
});

function deleteOnClick(evt) {
    let emp_id = $(evt.target).parent().parent().children()[1].innerHTML;
    $("#empIdToDelete").val(emp_id);
    $("#deleteMsg").html(`Delete employee with ID "${emp_id}" ?`);
    $("#deleteModal").modal("show");
}

function deleteOperation() {
    // 1. Show loading on delete button
    // 2. Delete
    // 3. Close modal and refresh page
    let emp_id = $("#empIdToDelete").val();

    $("#deleteOptBtn").html(
        `<i class="fas fa-spinner fa-spin"></i>&nbsp;Deleting...`
    );
    $("#deleteOptBtn").prop("disabled", true);
    $.ajax({
        url: `/api/delete/${emp_id}`,
        method: "DELETE",
        success: (data, textStatus, jqXHR) => {
            if (data.status) {
                $("#deleteMsg").prepend(
                    `<div class="alert alert-danger" role="alert">Failed to delete employee.<br>${data.error}</div>`
                );
                $("#deleteOptBtn").html("Delete");
                $("#deleteOptBtn").prop("disabled", false);
                return;
            }
            window.location.href = "/view?lastaction=delete&empid=" + emp_id;
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error(errorThrown);
            $("#deleteMsg").prepend(
                `<div class="alert alert-danger" role="alert">Failed to delete employee. Please try again later</div>`
            );
            $("#deleteOptBtn").html("Delete");
            $("#deleteOptBtn").prop("disabled", false);
        },
    });
}
