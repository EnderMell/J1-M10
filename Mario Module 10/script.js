const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let isDood = false;
let winsound = document.getElementById('win');
let jumpsound = document.getElementById('jump');
let deathsound = document.getElementById('death');


canvas.width = window.innerWidth
canvas.height = window.innerHeight



const gravity = 0.5
class Player {
    constructor({ x, y }) {

        this.startPosition = { x, y }

        this.position = {
            x: x,
            y: y
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
        //else this.velocity.y = 0
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}
//PLatform Properties
class Platform {
    constructor({ x, y, width, height }) {

        this.startPosition = { x, y }
        console.log(this.startPosition)

        this.position = {
            x: x,
            y: y,
        }
        
        this.width = width;
        this.height = height;
    }




    draw() {
        c.fillStyle = 'lightblue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}
//Platform Placement
const player = new Player( {x: 100, y:100} )
const platforms = [new Platform({
    x: 0, y: 750,
    width: 1000, height: 50
}), new Platform({
     x: 1400, y: 450,
     width:300, height: 50
}), new Platform({
    x: 1900, y: 250,
    width:300, height: 50
}), new Platform({
    x: 2600, y: 750,
    width:700, height: 50
}), new Platform({
    x: 3800, y: 750,
    width:800, height: 50
})

]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
player.update()

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
        //player moving
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 7
    } else if ((keys.left.pressed && player.position.x > 100) ||
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -7
    }
    else {
        player.velocity.x = 0
            // Platforms Moving
        if (keys.right.pressed) {
            scrollOffset += 7
            platforms.forEach(platform => {
                platform.position.x -= 7
            })

        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 7
            platforms.forEach(platform => {
                platform.position.x += 7
            })

        }
    }
    //platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })


    //win condition
    if (scrollOffset > 4000) {
        c.fillText('You Win!',700, 400)
        winsound.play();
    }

    c.font = '30px Arial';

    

    
        
//c.font = '30px Arial';
    c.fillText(`Player: { x: ${ player.position.x}, y: ${ player.position.y}}` , 10, 50)
    c.fillText(`Platforms: { x: ${ platforms[0].position.x},  y: ${ platforms[0].position.y}}` , 10, 80)
    c.fillText(scrollOffset, 10, 110)

    //lose condition
    if(!isDood) {
        if (player.position.y > canvas.height) {
            console.log('game over')
            gameOver()
            deathsound.play();
        }
    }
}
animate()

function gameOver () {
        isDood = true;
        player.position = player.startPosition
        for ( let i=0; i<platforms.length; i++)
        {
            platforms[i].position = platforms[i].startPosition;
        }
        scrollOffset = 0;
        //isDood = false;
}

// Controls

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
            console.log(player.position.y);
            {
            player.velocity.y -= 20
            jumpsound.play();
        }
            // player.position.y = (player.position.y - 15)
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
        // case 87:
        //     console.log('up')
        //     player.velocity.y -= 0
        //     break;
    }
    console.log(keys.right.pressed)
})
