
const stoneType=["l shape","back l","wide","tall"];
 
const drops=document.getElementById("drops");
const well = document.getElementById("wellcontainer");
const wellimg = document.getElementById("well");
let stoneNum=0;
let wellwidth;
let container;
let spaces=[[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false]];
function makeStone(stone){
  stoneNum=stoneNum+1;
  const imgWrap=document.createElement("div");
  const stoneImg=document.createElement("img");
  imgWrap.style.width = "100%";
  imgWrap.style.height = "100%";
  imgWrap.id= "stone"+stoneNum;

  if(stone==stoneType[0]){
    stoneImg.src="img/Lstone.png";
    stoneImg.alt = 'l shape stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 3";
    imgWrap.style.gridColumn = "1 / 4";
  };
  /* add more elifs for different stones*/
  imgWrap.appendChild(stoneImg);
  well.appendChild(imgWrap);
  imgWrap.style.zIndex = "10"; 
  imgWrap.style.position = "absolute";
  return imgWrap;
};

function moveStone(stone){
  if(wellimg.complete){
    wellwidth=wellimg.width;
    console.log('Rendered Width:', wellimg.width);  
  }else{
    wellimg.addEventListener('load', function() {
    console.log('Rendered Width:', this.width);
    wellwidth=this.width;
  });
  };

};
container=makeStone(stoneType[0]);
console.log(container.id);
console.log(wellimg.width);
