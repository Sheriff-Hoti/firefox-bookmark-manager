//@ts-ignore
const bookmarks = browser.bookmarks

console.log(bookmarks)
  
  window.addEventListener('event-name', (event) => {
    const eventcustom = new CustomEvent('event-name-1',{detail:'hi'});
    window.dispatchEvent(eventcustom);
    console.log('succc')
  });



