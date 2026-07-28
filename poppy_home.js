const homeDrops = document.getElementById("drops");

function readStoredDrops(){
  const savedData = localStorage.getItem(storageKey);
  if(savedData){
    try{
      const data = JSON.parse(savedData);
      return parseInt(data.drops, 10) || 0;
    }catch(error){
      console.log("Could not read saved drops:", error);
    }
  }
  return window.gamedrops ?? 0;
}

function updateDropsDisplay(){
  const totalDrops = readStoredDrops();
  if(homeDrops){
    homeDrops.textContent = `💧- ${totalDrops}`;
  }
}

window.updateDropsDisplay = updateDropsDisplay;
window.addEventListener("storage", updateDropsDisplay);
updateDropsDisplay();


