class Car{
    constructor(x,y,width,height,controls){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        
        this.sensor = new Sensor(this);
        this.controls=controls;
        this.damaged = false;
    }

    update(roadBorders){
        if(!this.damaged){
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders);
        }
        this.sensor.update(roadBorders);
        
    }

    #assessDamage(roadBorders){
        for (let i=0; i<roadBorders.length; i++){
            if (polyIntersects(this.polygon, roadBorders[i])){
                return true;
            }
        }
        return false;
    }
    #move(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }

        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        if(this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left){
                this.angle += 0.03 * flip;
            }
            if (this.controls.right){
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
    #createPolygon(){
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);

        // top-right
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        // top-left
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        // bottom-left (opposite of top-right)
        points.push({
            x: this.x - Math.sin(this.angle - alpha + Math.PI) * rad,
            y: this.y - Math.cos(this.angle - alpha + Math.PI) * rad
        });
        // bottom-right (opposite of top-left)
        points.push({
            x: this.x - Math.sin(this.angle + alpha + Math.PI) * rad,
            y: this.y - Math.cos(this.angle + alpha + Math.PI) * rad
        });

        return points;
    }


    draw(ctx){
        if(this.damaged){
            ctx.fillStyle = 'gray';
        }
        else{
            ctx.fillStyle = 'black';
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.closePath();
        ctx.fill();
        this.sensor.draw(ctx);
    }
}
