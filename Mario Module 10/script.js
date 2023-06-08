const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.widht = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
class Player {
    constructor(){
        this.position = { 
            x:100,
            y:100
        }
        this.velocity = {
            x: 0,
            y: 1 
        }

        this.width = 50
        this.height = 50
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y

        this.velocity.y += gravity
    }

    draw() { 
        c.fillStyle = 'seagreen'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const player = new Player()
player.update()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()