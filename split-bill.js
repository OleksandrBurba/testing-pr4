function splitBill(amount, people, tipPercent) {
  if (typeof amount !== "number" || Number.isNaN(amount) || amount < 0) {
    throw new Error("сума має бути невідʼємним числом");
  }
  if (!Number.isInteger(people) || people < 1) {
    throw new Error("кількість людей має бути цілим числом від 1");
  }
  if (typeof tipPercent !== "number" || tipPercent < 0 || tipPercent > 30) {
    throw new Error("чайові мають бути від 0 до 30 відсотків");
  }

  const total = amount * (1 + tipPercent / 100);
  return Math.round((total / people) * 100) / 100;
}

module.exports = { splitBill };
