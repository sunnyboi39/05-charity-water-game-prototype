import { saveData, restoreData } from "laystones.js";
const storageKey="totalDrops";
const drops= document.getElementById("drops");
let gamedrops;
restoreData();
drops.textContent="&#128167;- "+ gamedrops;




saveData();

