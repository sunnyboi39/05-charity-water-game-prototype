
const stoneType=["l shape","back l","wide","tall"];
const drops=document.getElementById("drops");
const well=document.getElementById("wellcontainer");

let spaces=[[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false]];
function makeStone(stone){
  const imgWrap=document.createElement("div");
  const stoneImg=document.createElement("img");
  imgWrap.style.width = "100%";
  imgWrap.style.height = "100%";

  if(stone==stoneType[0]){
    stoneImg.src="img/Lstone.png";
    stoneImg.alt = 'l shape stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
  };
  /* add more elifs*/
  imgWrap.appendChild(stoneImg);
  well.appendChild(imgWrap);
  imgWrap.style.zIndex = "10"; 
  imgWrap.style.gridRow = "1 / 3";
  imgWrap.style.gridColumn = "1 / 4";
  imgWrap.style.position = "absolute";

};

makeStone(stoneType[0]);