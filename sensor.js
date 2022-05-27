class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2; // 45 degrees between rays
    this.rays = [];

    // Sensor readings to determine if there are objects in collision path
    this.readings = [];
  }

  update(roadBoarders) {
    this.#castRays();
    this.readings = [];

    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], roadBoarders));
    }
  }

  #getReading(ray, roadBoarders) {
    let rayTouchPoints = [];

    for (let i = 0; i < roadBoarders.length; i++) {
      const touchPoint = getIntersection(
        ray[0],
        ray[1],
        roadBoarders[i][0],
        roadBoarders[i][1]
      );

      if (touchPoint) {
        rayTouchPoints.push(touchPoint);
      }
    }

    if (rayTouchPoints.length == 0) {
      return null;
    } else {
      const offsets = rayTouchPoints.map((tp) => tp.offset);
      const minOffset = Math.min(...offsets);
      return rayTouchPoints.find((tp) => tp.offset == minOffset);
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };

      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      let endPoint = this.rays[i][1];

      if (this.readings[i]) {
        endPoint = this.readings[i];
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }
  }
}
