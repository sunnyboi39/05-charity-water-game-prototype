const homeDrops = document.getElementById("drops");
const poppy=document.getElementById("pop");
poppy.setAttribute("src","img/poppysleepsun.png");

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

function readPoppyshirt(){
  const savedData = localStorage.getItem('poppyImageState');
  if(savedData){
    try{
      const data = JSON.parse(savedData);
      console.log(data.src);
      return data.src;
      
    }catch(error){
      console.log("Could not read saved shirt:", error);
    }
  }
  console.log("window poppy",window.poppyImage ?? 0);
  //return window.poppyImage ?? 0;
}

function updateDropsDisplay(){
  const totalDrops = readStoredDrops();
  if(homeDrops){
    homeDrops.textContent = `💧- ${totalDrops}`;
  }
}

function updatePoppyShirt(){
  const poppyShirt = readPoppyshirt();
  console.log("poppy shirt updating");
  if(poppy){
    if(poppyShirt==="img/can shirt poppy.png"){
      poppy.src="img/poppysleepcan.png";
      console.log("poppy shirt change  can");
    }else if(poppyShirt==="img/sun shirt poppy.png"){
      poppy.src="img/poppysleepsun.png";
      console.log("poppy shirt change sun");
    }else if(poppyShirt==="img/drop shirt poppy.png"){
      poppy.src="img/poppysleepdrop.png";
      console.log("poppy shirt change drop");
    }
    
  }
}
window.updateDropsDisplay = updateDropsDisplay;
window.updatePoppyShirt=updatePoppyShirt;
window.addEventListener("storage", updateDropsDisplay,updatePoppyShirt);
updateDropsDisplay();
updatePoppyShirt();



