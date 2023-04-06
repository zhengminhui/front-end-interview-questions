const TRIGGER_SCROLL_SIZE = 100;

const content = document.getElementById("content");

const initScroll = () => {
  content.addEventListener("scroll", infiniteScrollFn);
};

const createCard = (index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `Card ${index}`;
  card.style.backgroundColor = getRandomColor();
  content.appendChild(card);
};

const infiniteScrollFn = (ev) => {
  // scrollHeight: measurement of the height of content,
  // including content not visible on the screen due to overflow
  // scrollTop: current scroll bar to the top of view box
  // clientHeight: view box height
  const { scrollHeight, scrollTop, clientHeight } = content;

  // when the [total height(scrollHeight)] is smaller than [the scroll bar to the top(scrollTop)] + [view box height (clientHeight)] + [trigger area height]
  // and the difference is less than the threshold, create a new card.
  if (scrollHeight <= scrollTop + clientHeight + TRIGGER_SCROLL_SIZE) {
    const index = getLatestIndex();
    createCard(index + 1);
  }
};

const getLatestIndex = () => {
  return content.children.length;
};

// just for fun
const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}deg, 90%, 85%)`;
};

// first render 5 cards
for (let i = 0; i < 5; i++) {
  createCard(i + 1);
}
// start to work!
initScroll();
