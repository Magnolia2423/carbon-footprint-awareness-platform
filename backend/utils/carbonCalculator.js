function calculateCarbon(data) {

  const transport =
    Number(data.transport) * 0.21;

  const electricity =
    Number(data.electricity) * 0.85;

  const food =
    Number(data.food) * 2;

  const waste =
    Number(data.waste) * 1.5;

  return (
    transport +
    electricity +
    food +
    waste
  );
}

module.exports =
  calculateCarbon;