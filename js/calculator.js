/**
 * PROFLIC Technologies — Metrology Quote Estimator & Parameter Sync
 * Calculates indicative turnaround windows, metrology ratings,
 * and transfers parameters seamlessly into the engineering inquiry form.
 */

(function () {
  'use strict';

  function calculateEstimate() {
    const serviceEl = document.getElementById('calcService');
    const complexityEl = document.getElementById('calcComplexity');
    const quantityEl = document.getElementById('calcQuantity');
    const swEl = document.querySelector('input[name="calcSoftware"]:checked');

    if (!serviceEl || !complexityEl || !quantityEl) return;

    const service = serviceEl.value;
    const complexity = complexityEl.value;
    const qty = parseInt(quantityEl.value, 10) || 1;
    const sw = swEl ? swEl.value : 'PC-DMIS';

    let turnaround = '24–48 Hours';
    let rating = 'STANDARD METROLOGY';
    let framework = 'ASME Y14.5 / ISO 1101 Standard Verification';
    let equipment = 'Stationary Bridge CMM / Touch Probe';

    // Logic based on service category and complexity
    if (service === 'onsite') {
      turnaround = qty > 10 ? '2–3 Working Days' : 'Same-Day / 24h Mobile Dispatch';
      rating = 'RAPID ON-SITE DISPATCH';
      equipment = 'Portable Articulation Arm (Faro / Romer) & Blue Laser';
    } else if (service === 'scanning') {
      if (complexity === 'high') {
        turnaround = qty > 5 ? '3–5 Working Days' : '48–72 Hours';
        rating = 'HIGH-DENSITY POINT CLOUD RECONSTRUCTION';
      } else {
        turnaround = '24–48 Hours';
        rating = 'SURFACE DEVIATION & CAD ALIGNMENT';
      }
      equipment = 'Blue Laser Optical Scanner / PolyWorks Inspection';
    } else if (service === 'programming') {
      if (complexity === 'high') {
        turnaround = '3–4 Working Days';
        rating = 'COMPLEX DCC OFFLINE SCRIPTING';
      } else {
        turnaround = '24–48 Hours';
        rating = 'TURNKEY CMM ROUTINE GENERATION';
      }
      equipment = `${sw} Offline DCC Environment`;
    } else if (service === 'reverse') {
      turnaround = complexity === 'high' ? '4–7 Working Days' : '2–4 Working Days';
      rating = 'PARAMETRIC STEP / IGES RE-ENGINEERING';
      equipment = 'High-Precision Mesh to Parametric Solid CAD (SolidWorks/NX)';
    } else if (service === 'training') {
      turnaround = 'Scheduled Multi-Day Corporate Session';
      rating = 'INDUSTRIAL CMM CURRICULUM';
      equipment = `${sw} Hands-on Industrial Lab Environment`;
    } else if (service === 'cad') {
      turnaround = '2–4 Working Days';
      rating = 'FIXTURE & TOOLING CAD DESIGN';
      equipment = 'Modular Metrology Fixture Tooling CAD';
    }

    // Update Output Elements
    const turnaroundEl = document.getElementById('calcResultTurnaround');
    const ratingEl = document.getElementById('calcResultRating');
    const serviceNameEl = document.getElementById('calcResultService');
    const equipmentEl = document.getElementById('calcResultEquipment');

    if (turnaroundEl) turnaroundEl.textContent = turnaround;
    if (ratingEl) ratingEl.textContent = rating;
    if (serviceNameEl) serviceNameEl.textContent = serviceEl.options[serviceEl.selectedIndex].text;
    if (equipmentEl) equipmentEl.textContent = equipment;
  }

  function transferToInquiryForm() {
    const serviceEl = document.getElementById('calcService');
    const complexityEl = document.getElementById('calcComplexity');
    const quantityEl = document.getElementById('calcQuantity');
    const swEl = document.querySelector('input[name="calcSoftware"]:checked');

    if (!serviceEl || !complexityEl) return;

    const serviceText = serviceEl.options[serviceEl.selectedIndex].text;
    const serviceVal = serviceEl.value;
    const complexityText = complexityEl.options[complexityEl.selectedIndex].text;
    const complexityVal = complexityEl.value;
    const qty = quantityEl ? quantityEl.value : 1;
    const sw = swEl ? swEl.value : 'PC-DMIS';

    // Form inputs
    const formService = document.getElementById('formService');
    const formComplexity = document.getElementById('formComplexity');
    const formQuantity = document.getElementById('formQuantity');
    const formSoftware = document.getElementById('formSoftware');
    const formMessage = document.getElementById('formMessage');

    if (formService) formService.value = serviceVal;
    if (formComplexity) formComplexity.value = complexityVal;
    if (formQuantity) formQuantity.value = qty;
    if (formSoftware) formSoftware.value = sw;

    if (formMessage) {
      formMessage.value = `[ENGINEERING INQUIRY PARAMETERS]
• Selected Service: ${serviceText}
• Part Complexity: ${complexityText}
• Estimated Batch: ${qty} Unit(s)
• Preferred Software / Platform: ${sw}
• GD&T Framework: ASME Y14.5 / ISO 1101 Standard

Please review our CAD / drawing specifications and advise engineer availability.`;
    }

    // Smooth scroll to inquiry form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Visual flash on form container to focus user attention
      const formContainer = document.getElementById('contact');
      if (formContainer) {
        formContainer.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => {
          formContainer.classList.remove('ring-2', 'ring-blue-500');
        }, 2200);
      }
    }
  }

  function init() {
    const serviceEl = document.getElementById('calcService');
    const complexityEl = document.getElementById('calcComplexity');
    const quantityEl = document.getElementById('calcQuantity');
    const swRadios = document.querySelectorAll('input[name="calcSoftware"]');
    const transferBtn = document.getElementById('calcTransferBtn');

    if (serviceEl) serviceEl.addEventListener('change', calculateEstimate);
    if (complexityEl) complexityEl.addEventListener('change', calculateEstimate);
    if (quantityEl) quantityEl.addEventListener('input', calculateEstimate);
    swRadios.forEach(r => r.addEventListener('change', calculateEstimate));

    if (transferBtn) transferBtn.addEventListener('click', transferToInquiryForm);

    // Initial calculation
    calculateEstimate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.proflicCalculator = {
    recalc: calculateEstimate,
    transfer: transferToInquiryForm
  };
})();
