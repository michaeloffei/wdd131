document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last Modified: ' + document.lastModified;

const TEMP_C = 10;         
const WIND_KMH = 5;        
document.getElementById('temp').textContent = TEMP_C;
document.getElementById('wind').textContent = WIND_KMH;


function calculateWindChill(tempC, windKmh){
  
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}


(function computeWindChillIfApplicable(){
  const wcEl = document.getElementById('windchill');
  if (typeof TEMP_C !== 'number' || typeof WIND_KMH !== 'number') {
    wcEl.textContent = 'N/A';
    return;
  }

  if (TEMP_C <= 10 && WIND_KMH > 4.8) {
    const wc = calculateWindChill(TEMP_C, WIND_KMH);

    wcEl.textContent = Math.round(wc * 10) / 10;
  } else {
    wcEl.textContent = 'N/A';
  }
})();
