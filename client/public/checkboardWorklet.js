class CheckerboardPainter {
  static get inputProperties () {
    return ['--bubble-size', '--bubble-color']
  }

  paint (ctx, geom, properties) {
    const circleSize = 10
    const bodyWidth = geom.width
    const bodyHeight = geom.height
    console.log("Color:" ,properties.get("--bubble-color").toString())
    const maxX = Math.floor(bodyWidth / circleSize)
    const maxY = Math.floor(bodyHeight / circleSize)

    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(
          x * circleSize * 2 + circleSize,
          y * circleSize * 2 + circleSize,
          circleSize,
          0,
          2 * Math.PI,
          true
        )
        ctx.closePath()
        ctx.fill()
      }
    }
  }
}

// Register our class under a specific name
registerPaint('checkerboard', CheckerboardPainter)
