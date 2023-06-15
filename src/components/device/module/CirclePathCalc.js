const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
 
  var start = polarToCartesian(x, y, radius, endAngle);
  
  var end = polarToCartesian(x, y, radius, startAngle);

  const getSheep = (val) => {
    if(val < 0 ){
      return "1"
    }else{
      return val <= 180 ? "0" : "1";
    }
  }
  var arcSweep = getSheep(endAngle - startAngle)

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    "L",
    x,
    y,
    "L",
    start.x,
    start.y,
  ].join(" ");
  return d;
};

export default describeArc;
