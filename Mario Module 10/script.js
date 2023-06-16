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
//PLatform Properties
class Platform { 
    constructor({x, y}) {
    this.position ={
        x: x,
        y: y,
    }
    this.width = 500
    this.height = 20
}



    draw(){
        c.fillStyle = '#9370DB'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}
//Platform Placement
const player = new Player()
const platforms = [new Platform({
    x: 1, y: 750
}), new Platform( {
    x: 500, y: 750
}) ]
const keys = {
    right:{ 
        pressed: false
    },
    left:{ 
        pressed: false
    }
}
player.update()

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform =>{
        platform.draw()
    })

    if ( keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 7
    } else if ( keys.left.pressed && player.position.x > 100){
        player.velocity.x = -7
    }
    else { player.velocity.x = 0
    
        if ( keys.right.pressed){
            scrollOffset += 7
            platforms.forEach(platform =>{
                platform.position.x -= 7
            })
        
        } else if (keys.left.pressed){
            scrollOffset -=7
            platforms.forEach(platform =>{
                platform.position.x += 7
            })
            
        }    }
    //platform collision
    platforms.forEach(platform =>{
    if (player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
})

    if ( scrollOffset > 2000) {
        alert ('You win!')
    }
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
            keys.right.pressed = true
            break;
        case 87:
            console.log('up')
            player.velocity.y -= 15
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