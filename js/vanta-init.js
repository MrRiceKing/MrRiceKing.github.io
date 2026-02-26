// Vanta Background Initialization
window.addEventListener("load", function () {
  const vantaBg = document.getElementById("vanta-bg");
  
  if (!vantaBg) {
    console.warn("Vanta background element not found");
    return;
  }

  // Graceful fallback if VANTA lib not loaded
  if (typeof VANTA === "undefined") {
    console.warn("VANTA library not loaded. Using fallback background.");
    vantaBg.style.background = "#0B1120";
    return;
  }

  try {
    const vantaEffect = VANTA.FOG({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      highlightColor: 0xD4AF37,
      midtoneColor: 0x4FB6FF,
      lowlightColor: 0x1B2A4A,
      baseColor: 0x0B1120,
      blurFactor: 0.6,
      zoom: 2.4
    });

    console.log("✓ Vanta FOG background initialized successfully");

    // Store reference for potential cleanup
    window.vantaEffect = vantaEffect;

    // Handle window resize for Vanta
    window.addEventListener("resize", () => {
      if (vantaEffect) {
        vantaEffect.resize();
      }
    });

  } catch (error) {
    console.error("Vanta initialization error:", error);
    // Fallback: solid background
    vantaBg.style.background = "linear-gradient(135deg, #0B1120 0%, #121A2B 100%)";
  }
});