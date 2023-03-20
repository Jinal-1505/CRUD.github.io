var row = null;
function Submit() {
    //alert();
    const DataEntered = retreiveData();
    //console.log(DataEntered);
    const readData = readDataFromLocalStorage(DataEntered);
    if (DataEntered == false) {
        msg.innerHTML = "please Enter Data!";
    }
    else {
        if (row == null) {
            insert(readData);
            msg.innerHTML = "Data Ineserted";
        }
        else {
            update();
            msg.innerHTML = "Data Updated";
        }
    }
    //console.log(readData);
    document.getElementById("form").reset();

}

//create
//retreiving data from form
function retreiveData() {
    const category = document.getElementById("category").value;
    const product = document.getElementById("product").value;
    const price = document.getElementById("price").value;

    const arr = [category, product, price];
    if (arr.includes("")) {
        return false;
    }
    else {
        return arr;
    }

}

//read
//Data in LocalStorage
function readDataFromLocalStorage(DataEntered) {
    //storing data in localstorage
    const c = localStorage.setItem("Category", DataEntered[0]);
    const pro = localStorage.setItem("Product", DataEntered[1]);
    const pri = localStorage.setItem("Price", DataEntered[2]);



    //getting values from local storage to table
    const c1 = localStorage.getItem("Category", c);
    const pro1 = localStorage.getItem("Product", pro);
    const pri1 = localStorage.getItem("Price", pri);

    var arr = [c1, pro1, pri1];
    return arr;
}
//INSERT data in TABLE
function insert(readData) {
    var row = table.insertRow();
    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    var id = Math.random() * 100;
    row.insertCell(3).innerHTML = Math.ceil(id);
    row.insertCell(4).innerHTML = `<button onclick="edit(this)">EDIT</buton><button onclick="remove(this)">DELETE</buton>`;
}

//EDIT 
function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("category").value = row.cells[0].innerHTML;
    document.getElementById("product").value = row.cells[1].innerHTML;
    document.getElementById("price").value = row.cells[2].innerHTML;

}

//UPDATE
function update(td) {
    row.cells[0].innerHTML = document.getElementById("category").value;
    row.cells[1].innerHTML = document.getElementById("product").value;
    row.cells[2].innerHTML = document.getElementById("price").value;
    row = null;
}


//DELETE
function remove(td) {
    const ans = confirm("Are you sure you want to delete this record");
    if (ans == true) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
    }
}

function sortCategory() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortProduct() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortPrice() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}



document.getElementById("searchBar").addEventListener("keyup", function () {
    searchTable();
});


function searchTable() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


//clear Local storage
const clearStorageBtn = document.getElementById('clearStorageBtn');
clearStorageBtn.addEventListener('click', function () {
    // Clear local storage
    localStorage.clear();
    alert('Local storage has been cleared!');
});

//category wise total
function generateCategoryTable() {
    let categoryTable = document.getElementById("categoryTable");
    let tableBody = categoryTable.getElementsByTagName("tbody")[0];
    let rows = table.getElementsByTagName("tr");
    let totalsByCategory = {};
    let productCount;

    for (var i = 1; i < rows.length; i++) {
        var category = rows[i].cells[0].innerHTML;
        
        if (!totalsByCategory.hasOwnProperty(category)) {
            totalsByCategory[category] = 0;
            productCount = 0;
        }

        productCount += parseInt(rows[i].cells[2].innerHTML);

        totalsByCategory[category] = productCount;
    }

    // Iterate through the totals object and create a row for each category
    for (var category in totalsByCategory) {
        var row = tableBody.insertRow();
        var categoryCell = row.insertCell(0);
        var totalCell = row.insertCell(1);

        categoryCell.innerHTML = category;
        totalCell.innerHTML = totalsByCategory[category];
    }
}

generateCategoryTable();
