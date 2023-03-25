const OPPOSITE = -1;

self.addEventListener("message", ({ data }) => {
  const { clientX, clientY, content, view } = data;
  const percentageX = clientX / view.width;
  const percentageY = clientY / view.height;

  const maxX = content.width - view.width;
  const maxY = content.height - view.height;

  const distanceX = percentageX * maxX * OPPOSITE;
  const distanceY = percentageY * maxY * OPPOSITE;
  self.postMessage({ distanceX, distanceY });
});
