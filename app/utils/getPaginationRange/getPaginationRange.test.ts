import { getPaginationRange } from './getPaginationRange';

test(`"getPaginationRange(1, 10, 100)" should return {startRange: 1, endRange: 10}`, () => {
  const pagination = getPaginationRange(1, 10, 100);

  expect(pagination.startRange).toBe(1);
  expect(pagination.endRange).toBe(10);
});

test(`"getPaginationRange(1, 10, 8)" should return {startRange: 1, endRange: 8}`, () => {
  const pagination = getPaginationRange(1, 10, 8);

  expect(pagination.startRange).toBe(1);
  expect(pagination.endRange).toBe(8);
});

test(`"getPaginationRange(6, 25, 1240)" should return {startRange: 126, endRange: 150}`, () => {
  const pagination = getPaginationRange(6, 25, 1240);

  expect(pagination.startRange).toBe(126);
  expect(pagination.endRange).toBe(150);
});

test(`"getPaginationRange(12, 100, 1240)" should return {startRange: 1101, endRange: 1200}`, () => {
  const pagination = getPaginationRange(12, 100, 1240);

  expect(pagination.startRange).toBe(1101);
  expect(pagination.endRange).toBe(1200);
});

test(`"getPaginationRange(13, 100, 1240)" should return {startRange: 1201, endRange: 1240}`, () => {
  const pagination = getPaginationRange(13, 100, 1240);

  expect(pagination.startRange).toBe(1201);
  expect(pagination.endRange).toBe(1240);
});
