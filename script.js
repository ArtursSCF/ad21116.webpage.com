document.addEventListener("DOMContentLoaded", () => {
  const polygonImages = ["polygon1.png", "polygon2.png"];
  const container = document.createElement("div");
  container.classList.add("random-polygons");
  document.body.appendChild(container);

  container.style.height = `${document.documentElement.scrollHeight}px`;

  const polygons = [];
  const buffer = 100;

  const randomizePositionAndRotation = (img) => {
    let isValidPosition = false;
    let attempts = 0;

    while (!isValidPosition && attempts < 100) {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomRotation = Math.random() * 360;

      img.style.top = `${randomY}vh`;
      img.style.left = `${randomX}vw`;
      img.style.transform = `rotate(${randomRotation}deg)`;

      const imgRect = img.getBoundingClientRect();
      isValidPosition = true;

      for (const polygon of polygons) {
        const polygonRect = polygon.getBoundingClientRect();

        if (
          imgRect.left < polygonRect.right + buffer &&
          imgRect.right > polygonRect.left - buffer &&
          imgRect.top < polygonRect.bottom + buffer &&
          imgRect.bottom > polygonRect.top - buffer
        ) {
          isValidPosition = false;
          break;
        }
      }
      attempts++;
    }
  };

  const totalPolygons = 5;

  polygonImages.forEach((polygonImage) => {
    for (let i = 0; i < totalPolygons; i++) {
      const img = document.createElement("img");
      img.src = polygonImage;
      img.style.position = "absolute";
      img.style.width = "100px";
      img.style.height = "auto";
      img.style.transformOrigin = "center center";
      container.appendChild(img);
      randomizePositionAndRotation(img);
      polygons.push(img);
    }
  });
});

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}
