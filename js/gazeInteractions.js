let previousElement = null;
let gazeTimeout = null;
const gazeDuration = 500; // Gaze duration in milliseconds

function trackGazeInteraction(x, y) {
    const element = document.elementFromPoint(x, y);
  
    // If the element is an overlay
    if (element && element.classList.contains("overlay")) {
      if (previousElement === null) {
        // If there's no previous element, start the gaze timeout for the current element
        gazeTimeout = setTimeout(() => {
          triggerMouseEvent(element, "mouseover");
          adjustScrollToElement(element);
          previousElement = element;
        }, gazeDuration);
      } else if (previousElement !== element) {
        // If the current element is different from the previous one
        if (previousElement) {
          triggerMouseEvent(previousElement, "mouseout");
        }
  
        if (gazeTimeout) {
          clearTimeout(gazeTimeout);
        }
  
        // Set a new gaze timeout for the new element
        gazeTimeout = setTimeout(() => {
          triggerMouseEvent(element, "mouseover");
          adjustScrollToElement(element);
          previousElement = element;
        }, gazeDuration);
      }
    } else if (element && element.id === "scroll-button") {
      // If the element is the scroll button
      if (previousElement) {
        triggerMouseEvent(previousElement, "mouseout");
        previousElement = null;
      }
  
      if (gazeTimeout) {
        clearTimeout(gazeTimeout);
      }
      triggerMouseEvent(element, "click");
    } else {
      // If the current element is not an overlay
      if (previousElement) {
        triggerMouseEvent(previousElement, "mouseout");
        previousElement = null;
      }
  
      if (gazeTimeout) {
        clearTimeout(gazeTimeout);
      }
    }
  }
  

function triggerMouseEvent(element, eventType) {
  const event = new MouseEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}

function adjustScrollToElement(element) {
  const menuContainer = document.querySelector(".menu-container");
  const elementRect = element.getBoundingClientRect();
  const containerRect = menuContainer.getBoundingClientRect();

  // Check if the element is partially visible
  if (
    elementRect.top < containerRect.top ||
    elementRect.bottom > containerRect.bottom
  ) {
    // Calculate the scroll position to bring the element into view
    menuContainer.scrollTo({
      top: elementRect.top + menuContainer.scrollTop - containerRect.top,
      behavior: "smooth",
    });
  }
}

export { trackGazeInteraction, triggerMouseEvent, adjustScrollToElement };
