const update = ({ x, y }) => {
    // Add offset to x coordinate to move images to the right
    const offsetX = x + 200; // Adjust this value as needed
    document.documentElement.style.setProperty('--x', offsetX)
    document.documentElement.style.setProperty('--y', y)
}

const list = document.querySelector('ol')
list.addEventListener('pointermove', update)

// Make the entire list area trigger the image display
const listItems = document.querySelectorAll('li')
listItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.setProperty('--active', '1')
    })
    item.addEventListener('mouseleave', () => {
        item.style.setProperty('--active', '0')
    })
})