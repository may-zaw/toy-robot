import { beforeEach, describe, it, expect } from 'vitest';
import { Table } from '../src/core/table';

describe('Table', () => {
  let table: Table;

  // Test setup: create a new Table instance before each test
  beforeEach(() => {
    table = new Table();
  });

  it('should initialize with default dimensions', () => {
    // The default dimensions should be 5x5
    expect(table.isValidPosition(0, 0)).toBe(true)
    expect(table.isValidPosition(4, 4)).toBe(true)
    expect(table.isValidPosition(5, 5)).toBe(false)
    expect(table.isValidPosition(-1, -1)).toBe(false)
  });

  it('should initialize with custom dimensions', () => {
    // Create a Table with custom dimensions
    const customTable = new Table(10, 8)

    // Test valid positions within custom dimensions
    expect(customTable.isValidPosition(0, 0)).toBe(true)
    expect(customTable.isValidPosition(9, 7)).toBe(true)

    // Test invalid positions outside custom dimensions
    expect(customTable.isValidPosition(10, 8)).toBe(false)
    expect(customTable.isValidPosition(-1, -1)).toBe(false)
  })

  it('should handle edge cases for position validation', () => {
    // Test positions at the edges of the default dimensions
    expect(table.isValidPosition(0, 0)).toBe(true)
    expect(table.isValidPosition(4, 4)).toBe(true)

    // Test positions just outside the edges
    expect(table.isValidPosition(5, 4)).toBe(false)
    expect(table.isValidPosition(4, 5)).toBe(false)
    expect(table.isValidPosition(-1, 0)).toBe(false)
    expect(table.isValidPosition(0, -1)).toBe(false)
  })
})
