const diff = require("./diff");

test("Check time diff b/w 1AM and 2PM", () => {
  expect(diff("01:00", "14:00")).toBe("13:00");
});

test("Check time diff b/w 2AM and 2PM", () => {
  expect(diff("02:00", "14:00")).toBe("12:00");
});

test("Check time diff b/w 12:45AM and 1:39AM", () => {
  expect(diff("00:45", "01:39")).toBe("00:54");
});

test("Check time diff b/w 1:45PM and 1PM", () => {
  expect(diff("13:45", "13:00")).toBe("23:15");
});
