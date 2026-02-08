document.addEventListener("DOMContentLoaded", function () {
  if (typeof VANTA !== "undefined") {
    VANTA.FOG({
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
  }
});
