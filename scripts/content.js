const MAX_O2_LEVEL = 225;

const body = document.querySelector('body');

const depthDisplay = document.createElement('div');
depthDisplay.textContent = '0px';
depthDisplay.style.position = 'fixed';
depthDisplay.style.top = '20px';
depthDisplay.style.left = '50%';
depthDisplay.style.transform = 'translateX(-50%)';
depthDisplay.style.zIndex = '9999';
depthDisplay.style.backgroundColor = 'rgba(62, 147, 193, 0.5)';
depthDisplay.style.color = 'white';
depthDisplay.style.textAlign = 'center';
depthDisplay.style.fontSize = '20px';
depthDisplay.style.fontWeight = 'bold';
depthDisplay.style.width = '150px';
depthDisplay.style.padding = '10px 40px';
depthDisplay.style.borderRadius = '5px';
depthDisplay.style.fontFamily = 'Arial, sans-serif';
body.appendChild(depthDisplay);

depthDisplay.textContent = `${Math.round(window.scrollY)}px`;
window.addEventListener('scroll', () => {
  depthDisplay.textContent = `${Math.round(window.scrollY)}px`;
});

const o2DisplayBackground = document.createElement('div');
o2DisplayBackground.style.position = 'fixed';
o2DisplayBackground.style.bottom = '50px';
o2DisplayBackground.style.left = '50px';
o2DisplayBackground.style.zIndex = '9999';
o2DisplayBackground.style.backgroundColor = 'rgb(59, 173, 169)';
o2DisplayBackground.style.height = '60px';
o2DisplayBackground.style.width = '60px';
o2DisplayBackground.style.padding = '40px';
o2DisplayBackground.style.borderRadius = '50%';
o2DisplayBackground.style.boxSizing = 'unset';
body.appendChild(o2DisplayBackground);

const o2DisplayBackgroundOverlay = document.createElement('div');
o2DisplayBackgroundOverlay.style.position = 'fixed';
o2DisplayBackgroundOverlay.style.bottom = '50px';
o2DisplayBackgroundOverlay.style.left = '50px';
o2DisplayBackgroundOverlay.style.zIndex = '9999';
o2DisplayBackgroundOverlay.style.backgroundColor = 'rgb(96, 193, 125)';
o2DisplayBackgroundOverlay.style.height = '60px';
o2DisplayBackgroundOverlay.style.width = '60px';
o2DisplayBackgroundOverlay.style.padding = '40px';
o2DisplayBackgroundOverlay.style.borderRadius = '50%';
o2DisplayBackgroundOverlay.style.boxSizing = 'unset';
o2DisplayBackgroundOverlay.style.clipPath = 'inset(0 0 0 0)';
o2DisplayBackgroundOverlay.id = 'o2DisplayBackgroundOverlay';
body.appendChild(o2DisplayBackgroundOverlay);

const o2Display = document.createElement('div');
o2Display.style.position = 'fixed';
o2Display.style.bottom = '50px';
o2Display.style.left = '50px';
o2Display.style.zIndex = '9999';
o2Display.style.color = 'white';
o2Display.style.height = '60px';
o2Display.style.width = '60px';
o2Display.style.padding = '40px';
o2Display.style.textAlign = 'center';
o2Display.style.fontSize = '25px';
o2Display.style.fontFamily = 'Arial, sans-serif';
o2Display.style.fontWeight = 'bold';
o2Display.style.boxSizing = 'unset';
const o2DisplayTitle = document.createElement('div');
o2DisplayTitle.innerHTML = 'O<sub>2</sub>';
o2Display.appendChild(o2DisplayTitle);
const o2DisplayText = document.createElement('div');
o2DisplayText.textContent = MAX_O2_LEVEL.toString();
o2Display.appendChild(o2DisplayText);
body.appendChild(o2Display);

const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'black';
overlay.style.opacity = '0';
overlay.style.transition = 'opacity 2s ease';
overlay.style.zIndex = '9999';

let o2Level = MAX_O2_LEVEL;
function start() {
  const o2Interval = setInterval(() => {
    const depth = window.scrollY;
    if (o2Level > 0) {
      if (depth > 0) {
        o2Level -= Math.min(2.5, Math.max(0.5, depth / 2000));
        o2Level = Math.max(o2Level, 0); // Ensure O2 level doesn't go below 0
      } else {
        o2Level += 15;
        o2Level = Math.min(o2Level, MAX_O2_LEVEL); // Cap O2 level
      }
    } else {
      clearInterval(o2Interval);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.getBoundingClientRect();
        overlay.style.opacity = '1';
      });
      setTimeout(() => {
        overlay.remove();
        window.scrollTo(0, 0, { behavior: 'instant' });
        o2Level = MAX_O2_LEVEL; // Reset O2 level after overlay
        start();
      }, 3000);
    }
    o2DisplayText.textContent = Math.round(o2Level).toString();
    o2DisplayBackgroundOverlay.style.clipPath = `inset(${100 - (o2Level / MAX_O2_LEVEL) * 100}% 0 0 0)`;
  }, 500);
}
start();
