const { splitBill } = require("../split-bill");

describe("splitBill - звичайний розрахунок", () => {
  test("100 грн на 4 людей без чайових - по 25", () => {
    const share = splitBill(100, 4, 0);

    expect(share).toBe(25);
  });

  test("100 грн на 3 людей з 10% чайових - по 36.67", () => {
    const share = splitBill(100, 3, 10);

    expect(share).toBe(36.67);
  });

  test("нульовий рахунок дає нульову частку", () => {
    const share = splitBill(0, 2, 15);

    expect(share).toBe(0);
  });

  test("одна людина платить усе разом з чайовими", () => {
    const share = splitBill(80, 1, 5);

    expect(share).toBe(84);
  });
});

describe("splitBill - межі чайових", () => {
  test("30% ще дозволено", () => {
    const share = splitBill(100, 2, 30);

    expect(share).toBe(65);
  });

  test("31% вже помилка", () => {
    expect(() => splitBill(100, 2, 31)).toThrow("чайові");
  });

  test("відʼємні чайові - помилка", () => {
    expect(() => splitBill(100, 2, -1)).toThrow("чайові");
  });
});

describe("splitBill - неправильні дані", () => {
  test("0 людей - помилка", () => {
    expect(() => splitBill(100, 0, 10)).toThrow("кількість людей");
  });

  test("дробова кількість людей - помилка", () => {
    expect(() => splitBill(100, 2.5, 10)).toThrow("кількість людей");
  });

  test("відʼємна сума - помилка", () => {
    expect(() => splitBill(-50, 2, 0)).toThrow("сума");
  });

  test("сума не число - помилка", () => {
    expect(() => splitBill("100", 2, 0)).toThrow("сума");
  });
});
