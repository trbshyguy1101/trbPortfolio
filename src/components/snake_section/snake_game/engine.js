import * as THREE from 'three';
import background from '../../../assets/grass.jpg';
import kaching from '../../../assets/kaching.mp3';

let onAppleCollect = () => {};

let onGameOver = () => {};

/**
 * Example Template for the snake body parts
 * let snakeBodyTemplate = {
 *    prevX: snakeBody[i - 1].current.position.x,
 *    prevY: snakeBody[i - 1].current.position.x,
 *    current: snakeBody,
 *    next: null
 * }
 */

let snakeBodyTemplate = {
    prevX: 0,
    prevY: 0,
    current: null,
};

let snakeBodyList = [];

let disparcity = 5;
let zoom = 10;

const keys = {};

const directions = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
};

let gamePaused = true;

let currentDirection = directions.RIGHT;
let nextDirection = directions.RIGHT;

const daChing = (listener) => {
    const soundOfDaching = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(kaching, (buffer) => {
        soundOfDaching.setBuffer(buffer);
        soundOfDaching.setLoop(false);
        soundOfDaching.setVolume(0.2);
        soundOfDaching.play();
    });
}

// Render a cube (snake head)
const Cube = () => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0.001);
    return cube;
};

// Render an apple/food
const Apple = () => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const apple = new THREE.Mesh(geometry, material);
    apple.position.set(0, 0, 0);
    return apple;
};

// Render the snake's body
const SnakeBody = (x, y) => {
    let { prevX, prevY } = { x, y };
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
    const body = new THREE.Mesh(geometry, material);
    body.position.set(prevX, prevY, 0);
    return body;
};

// Handle collision between snake and apple
const collisionHandler = (listener, snake, apple, scene) => {
    apple.position.x = Math.floor(Math.random() * disparcity);
    apple.position.y = Math.floor(Math.random() * disparcity);
    
    // handle the collection of an apple or somehitn
    onAppleCollect();
    addBody(snake, snakeBodyList);
    displayBody(snakeBodyList, scene);

    // play a sound for bonus
    daChing(listener);

    // hehehe
    const randed = Math.floor((Math.random() * 100) / 100);
    disparcity += randed < 1 ? 1 : randed;
};

// Handle adding new body parts to the snake
const addBody = (snake, body) => {
    const newBody = SnakeBody(snake.position.x, snake.position.y);

    let prevSegment = body.length > 0 ? body[body.length - 1] : null;
    let newX = snake.position.x;
    let newY = snake.position.y;

    if (prevSegment) {
        newX = prevSegment.current.position.x;
        newY = prevSegment.current.position.y;
    }

    let newPart = Object.create(snakeBodyTemplate);
    newPart.current = newBody;
    newPart.prevX = newX;
    newPart.prevY = newY;
    newPart.current.position.set(1+newX, 1+newY, 0);
    body.push(newPart);
};

// Handle displaying the new body parts
const displayBody = (body, scene) => {
    body.forEach((part, index) => {
        if (index <= 1) return;
        scene.add(part.current);
    });
};

// Create background
const Background = (bgTexture, width, height) => {
    const geometry = new THREE.PlaneGeometry(width * 2, height * 2);
    const material = new THREE.MeshBasicMaterial({ 
        map: bgTexture, 
        side: THREE.DoubleSide,
        color: 0xffffff
    });
    const bg = new THREE.Mesh(geometry, material);
    bg.position.set(0, 0, -0.001);
    return bg;
};

// Update snake body positions
const updateSnakePos = (snakeBodyList, snake) => {
    for (let i = snakeBodyList.length - 1; i > 0; i--) {
        let currentPart = snakeBodyList[i];
        let prevPart = snakeBodyList[i - 1];

        currentPart.prevX = Math.floor(prevPart.current.position.x);
        currentPart.prevY = Math.floor(prevPart.current.position.y);

        currentPart.current.position.x = prevPart.prevX;
        currentPart.current.position.y = prevPart.prevY;
    }

    if (snakeBodyList.length > 0) {
        let head = snakeBodyList[0];
        head.prevX = snake.position.x;
        head.prevY = snake.position.y;
        head.current.position.x = snake.position.x;
        head.current.position.y = snake.position.y;
    }
};

// experimental
const checkSnakeHeadBodyCollision = (snakeBody, snake, apple, bg, scene) => {
    snakeBody.forEach((part, index) => {
        if (index <= 2) return;
        if (snake.position.x === part.current.position.x && snake.position.y === part.current.position.y) {
            console.log('Game Over');
            onGameOver();
            scene.remove(snake);
            scene.remove(apple);
            scene.remove(bg);
            snakeBody.forEach((part) => {
                scene.remove(part.current);
            });
        }
    });
}

const Engine = (mountpoint, isPaused, mountpointDimensions) => {
    if (!mountpoint) return;
    if (mountpoint.children.length > 0) {
        //console.warn('multiple canvas attached');
        return;
    }

    const { width, height } = mountpointDimensions;
    const bgTexture = new THREE.TextureLoader().load(background);
    bgTexture.wrapS = THREE.RepeatWrapping;
    bgTexture.wrapT = THREE.RepeatWrapping;
    bgTexture.repeat.set(width / 5, height / 3);

    // setup the listener
    const listener = new THREE.AudioListener();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer();
    camera.position.z = zoom;
    renderer.setSize(width, height);

    if (mountpoint) {
        mountpoint.appendChild(renderer.domElement);
    }

    window.addEventListener('keydown', (e) => {
        keys[e.code] = true;
        if (e.code === 'KeyW' && currentDirection !== directions.DOWN) {
            nextDirection = directions.UP;
        }
        if (e.code === 'KeyS' && currentDirection !== directions.UP) {
            nextDirection = directions.DOWN;
        }
        if (e.code === 'KeyA' && currentDirection !== directions.RIGHT) {
            nextDirection = directions.LEFT;
        }
        if (e.code === 'KeyD' && currentDirection !== directions.LEFT) {
            nextDirection = directions.RIGHT;
        }
    });

    window.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });

    window.addEventListener('keypress', (e) => {
        if (zoom > 20) {
            console.log("unviewable zoom level");
            zoom = 20;
        }
        switch (e.code) {
            case "Equal":
                zoom += 1;
                camera.position.z = zoom;
                break;
            case "Minus":
                zoom -= 1;
                camera.position.z = zoom;
                break;
            default:
                break;
        }
    });

    camera.add(listener);

    const snake = Cube();
    const apple = Apple();
    const bg = Background(bgTexture, width, height);

    scene.add(snake);
    scene.add(apple);
    scene.add(bg);

    let previousTime = 0;

    const clock = new THREE.Clock();
    const factor = 10;
    const viewingHeight = height / 2
    const viewingWidth = width / 2

    const handleResize = () => {
        const { width, height } = mountpointDimensions;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        const ElapsedTime = clock.getElapsedTime();
        const deltaTime = ElapsedTime - previousTime;
        previousTime = ElapsedTime;

        if (gamePaused) {
            if (keys['KeyW'] && currentDirection !== directions.DOWN) {
                currentDirection = nextDirection;
            }
            if (keys['KeyS'] && currentDirection !== directions.UP) {
                currentDirection = nextDirection;
            }
            if (keys['KeyA'] && currentDirection !== directions.RIGHT) {
                currentDirection = nextDirection;
            }
            if (keys['KeyD'] && currentDirection !== directions.LEFT) {
                currentDirection = nextDirection;
            }

            switch (currentDirection) {
                case directions.UP:
                    camera.position.y += (snake.position.y < -viewingHeight) ? 0 : factor * deltaTime;
                    break;
                case directions.DOWN:
                    camera.position.y -= (snake.position.y >= viewingHeight) ? 0 : factor * deltaTime;
                    break;
                case directions.LEFT:
                    camera.position.x -= (snake.position.x >= viewingWidth) ? 0 : factor * deltaTime;
                    break;
                case directions.RIGHT:
                    camera.position.x += (snake.position.x < -viewingWidth) ? 0 : factor * deltaTime;
                    break;
                default:
                    break;
            }
        }

        // sneaky?
        snake.position.x = Math.round(camera.position.x);
        snake.position.y = Math.round(camera.position.y);
        
        if (snake.position.x >= apple.position.x - 0.5 && snake.position.x <= apple.position.x + 0.5 &&
            snake.position.y >= apple.position.y - 0.5 && snake.position.y <= apple.position.y + 0.5) {
            //console.log('collided with apple');
            collisionHandler(listener, snake, apple, scene);
        }
        //console.log("Snake current position: ", snake.position.x, snake.position.y)
        // Update snake body positions
        updateSnakePos(snakeBodyList, snake);
        //checkSnakeHeadBodyCollision(snakeBodyList, snake, apple, bg, scene);
        
        console.log(snake.position.x, snake.position.y);
        console.log(apple.position.x, apple.position.y);

        // dont move these (the if it works it works gaming)
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animate);
            mountpoint.removeChild(renderer.domElement);
        };
    }

    animate();
};

export function setOnAppleCollect(callback) {
    console.log('setting callback');
    onAppleCollect = callback;
}

export function setOnGameOver(callback) {
    console.log('setting callback');
    onGameOver = callback;
}

export function setPausedOrNot(paused) {
    gamePaused = paused;
}

export default Engine;
