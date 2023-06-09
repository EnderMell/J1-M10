const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 50
        this.height = 50
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }

    draw() {
        c.fillStyle = 'seagreen'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const player = new Player()
const keys = {
    right:{ 
        pressed: false
    },
    left:{ 
        pressed: false
    }
}
player.update()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}
animate()

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break;
        case 68:
            console.log('right')
            player.velocity.x = 5
            break;
        case 87:
            console.log('up')
            keys.right.pressed = true
            break;
    }

    console.log(keys.right.pressed)
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break;
        case 68:
            console.log('right')
            keys.right.pressed = false
            break;

    }
    console.log(keys.right.pressed)
})