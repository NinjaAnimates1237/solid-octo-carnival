// URL of your sb3 file on GitHub
const SB3_URL =
"https://raw.githubusercontent.com/NinjaAnimates1237/solid-octo-carnival/main/The%20title%20of%20this%20project%20is%20_ChatGPT%20Delete%20this%20and%20code%20to%20put%20the%20name%20in%20the%20quotes_.sb3";

async function renameProject() {
    const newName = document.getElementById("nameInput").value.trim();
    if (!newName) return alert("Enter a name!");

    // Fetch the SB3 file
    const response = await fetch(SB3_URL);
    const data = await response.arrayBuffer();

    // Load zip
    const zip = await JSZip.loadAsync(data);

    // Read project.json
    const projectJson = JSON.parse(await zip.file("project.json").async("string"));

    // CHANGE THE NAME INSIDE project.json
    if (!projectJson.meta) projectJson.meta = {};
    projectJson.meta.name = newName;

    // Write back project.json
    zip.file("project.json", JSON.stringify(projectJson));

    // Rebuild the new SB3
    const newSb3 = await zip.generateAsync({ type: "blob" });

    // Trigger download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(newSb3);
    a.download = newName + ".sb3";
    a.click();
}
