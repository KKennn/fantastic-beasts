var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyp2cGxIzzjbsuNo" }).base(
    "appf0DNHYoL48So1S"
);

base('Beasts').select().firstPage(onBeasts);

let cover = document.getElementById("cover");

function onBeasts(err, records) {
    if (err) { console.error(err); return; }
    console.log(records);
    getMenu(records);
}

function getMenu(records) {
    for (let i = 0; i < records.length; i++) {
        if (records[i].fields.Name) {
            let imageThumbnail = document.createElement("img");
            let imageDiv = document.createElement("div");
            let navBar = document.getElementById("nav-bar");
            imageThumbnail.setAttribute("src", records[i].fields.Image[0].thumbnails.small.url);
            imageDiv.appendChild(imageThumbnail);
            imageDiv.style.flex = 1;
            navBar.appendChild(imageDiv);
            getDetails(imageThumbnail, i, records);
        }
    }
}

function getDetails(imageThumbnail, i, records) {
    imageThumbnail.addEventListener("click", () => {
        if (cover.style.display != "none") cover.style.display = "none"
        let detailImage = document.getElementById("detail-image");
        detailImage.setAttribute("src", records[i].fields.Image[0].url);
        let detailName = document.getElementById("detail-name");
        detailName.innerHTML = records[i].fields.Name;
        let detailTable = document.getElementById("detail-table");
        detailTable.innerText = "";
        let keyNames = Object.keys(records[i].fields);
        keyNames.forEach(item => {
            if (item != "Image" && item != "Name") {
                let field = document.createElement("tr");
                let fieldKey = document.createElement("td");
                let fieldValue = document.createElement("td");
                fieldKey.innerText = item;
                fieldValue.innerText = records[i].fields[item];
                fieldKey.style.fontWeight = "bold";
                field.appendChild(fieldKey);
                field.appendChild(fieldValue);
                detailTable.appendChild(field);
            }
        })
    })
}