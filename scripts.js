var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyp2cGxIzzjbsuNo" }).base(
    "appf0DNHYoL48So1S"
);

base('Beasts').select().firstPage(onBeasts);

function onBeasts(err, records) {
    if (err) { console.error(err); return; }
    console.log(records);
    getMenu(records);
}

function getMenu(records) {
    for (let i = 0; i < records.length; i++) {
        let image = document.createElement("img");
        let imageDiv = document.createElement("div");
        let navBar = document.getElementById("nav-bar");
        image.setAttribute("src", records[i].fields.Image[0].url);
        imageDiv.appendChild(image);
        imageDiv.style.flex = 1;
        navBar.appendChild(imageDiv);
        getDetails(image, i, records);
    }
}

function getDetails(image, i, records) {
    image.addEventListener("click", () => {
        let detailImage = document.getElementById("detail-image");
        detailImage.setAttribute("src", image.getAttribute("src"));
        let detailName = document.getElementById("detail-name");
        detailName.innerHTML = records[i].fields.Name;
        let detailText = document.getElementById("detail-text");
        detailText.innerText = "";
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
                detailText.appendChild(field);
            }
        })
    })
}