
document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'totalDrops';
  const purchasedShirtsKey = 'purchasedShirts';
  const poppyImageKey = 'poppyImageState';
  const poppyImage = document.getElementById('popDresser');
  const canShirtButton = document.getElementById('canshirt');
  const dropShirtButton = document.getElementById('dropshirt');
  const sunShirtButton = document.getElementById('sunshirt');
  const dropsDisplay = document.getElementById('drops');


  function syncShirt(){
    window.poppyImage=poppyImage;
    if(typeof window.updatePoppyShirt ==="function"){
      window.updatePoppyShirt();
    }
  }

  if (dropsDisplay) {
    const currentDrops = readStoredDrops();
    dropsDisplay.textContent = `💧- ${currentDrops}`;
  }

  function readStoredDrops() {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        return parseInt(JSON.parse(savedData).drops, 10) || 0;
      } catch (error) {
        console.log('Could not read saved drops:', error);
      }
    }
    return window.gamedrops ?? 0;
  }

  function updateDrops() {
    const currentDrops = Math.max(0, readStoredDrops() - 1000);
    localStorage.setItem(storageKey, JSON.stringify({ drops: currentDrops }));
    window.gamedrops = currentDrops;

    if (dropsDisplay) {
      dropsDisplay.textContent = `💧- ${currentDrops}`;
    }

    if (typeof window.updateDropsDisplay === 'function') {
      window.updateDropsDisplay();
    }
  }

  function readPurchasedShirts() {
    const savedData = localStorage.getItem(purchasedShirtsKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return Array.isArray(parsedData) ? parsedData : [];
      } catch (error) {
        console.log('Could not read saved shirt purchases:', error);
      }
    }
    return [];
  }

  function savePurchasedShirts(shirts) {
    localStorage.setItem(purchasedShirtsKey, JSON.stringify(shirts));
  }

  function readSavedPoppyImage() {
    const savedData = localStorage.getItem(poppyImageKey);
    console.log(savedData);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData && typeof parsedData === 'object') {
          return parsedData;
        }
      } catch (error) {
        console.log('Could not read saved poppy image:', error);
      }
    }
    return null;
  }

  function savePoppyImage(imageName, altText) {
    localStorage.setItem(poppyImageKey, JSON.stringify({ src: imageName, alt: altText }));
  }

  if (poppyImage) {
    const savedPoppyImage = readSavedPoppyImage();
    if (savedPoppyImage) {
      poppyImage.src = savedPoppyImage.src || poppyImage.src;
      poppyImage.alt = savedPoppyImage.alt || poppyImage.alt;
    }
  }

  const handleShirtClick = (button, imageName, altText, shirtId) => {
    if (button && poppyImage) {
      const purchasedShirts = readPurchasedShirts();
      let hasPurchased = purchasedShirts.includes(shirtId);

      button.addEventListener('click', () => {
        if (hasPurchased) {
          poppyImage.src = imageName;
          poppyImage.alt = altText;
          savePoppyImage(imageName, altText);
          return;
        }

        const currentDrops = readStoredDrops();
        if (currentDrops < 1000) {
          return;
        }

        hasPurchased = true;
        const updatedShirts = [...readPurchasedShirts(), shirtId];
        savePurchasedShirts(updatedShirts);
        poppyImage.src = imageName;
        poppyImage.alt = altText;
        savePoppyImage(imageName, altText);
        syncShirt();
        updateDrops();
        
      });
    }
  };

  handleShirtClick(canShirtButton, 'img/can shirt poppy.png', 'Poppy wearing the charity water shirt', 'canshirt');
  handleShirtClick(dropShirtButton, 'img/drop shirt poppy.png', 'Poppy wearing the drop shirt', 'dropshirt');
  handleShirtClick(sunShirtButton, 'img/sun shirt poppy.png', 'Poppy wearing the sun shirt', 'sunshirt');
});
