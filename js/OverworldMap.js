class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
    )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach( key => {

            let object = this.gameObjects[key];
            object.id = key;

            // determine if this object should actually amount

            object.mount(this);
        })
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero1: new Person ({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc2: new Person ({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png"
            })
        },
        //VERY IMPORTANT: On Aseprite, command+ apostrophe to turn on grid. After hovering over desired grid, on the
        // bottom left corner, you will see the coordinates. These coordinates can be plugged in below, which the
        // character cannot walk into. PART 7: 4:00
        walls: {
                [utils.asGridCoord(7,6)] : true,
                [utils.asGridCoord(8,6)] : true,
                [utils.asGridCoord(7,7)] : true,
                [utils.asGridCoord(8,7)] : true,
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero1: new GameObject ({
                x: 3,
                y: 5,
            }),
            npcA: new GameObject ({
                x: 9,
                y: 6,
                src:"/images/characters/people/npc1.png"
            }),
            npcB: new GameObject ({
                x: 10,
                y: 8,
                src: "/images/characters/people/npc3.png"
            })
        }
    },
}