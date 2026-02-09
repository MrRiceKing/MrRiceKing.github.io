window.addEventListener("load", function () {
  const vantaBg = document.getElementById("vanta-bg");
  if (vantaBg && typeof VANTA !== "undefined") {
    try {
      const vantaEffect = VANTA.FOG({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xD4AF37,
        midtoneColor: 0x4FB6FF,
        lowlightColor: 0x1B2A4A,
        baseColor: 0x0B1120,
        blurFactor: 0.60,
        zoom: 2.40
      });
      console.log("Vanta background initialized successfully.");
    } catch (error) {
      console.error("Vanta initialization failed:", error);
      // Fallback: set a static background if Vanta fails
      vantaBg.style.background = "#0B1120";
    }
  } else {
    console.warn("Vanta background element or VANTA library not found. Using fallback.");
    if (vantaBg) vantaBg.style.background = "#0B1120";
  }
});