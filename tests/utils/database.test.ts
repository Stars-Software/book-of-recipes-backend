import { describe, test, expect, beforeEach, afterAll, jest } from '@jest/globals';
import { readFileSync } from 'fs';
import { dataBaseUtils } from '../../src/utils/database.util';
import { CustomError } from '../../src/utils/error.util';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('DataBaseUtils', () => {
  const mockFilePath = 'mockFilePath';
  const mockModel = {
    sync: jest.fn(),
    bulkCreate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await dataBaseUtils.close();
  });

  test('should seed data successfully', async () => {
    const jsonData = '[{"id": 1, "name": "John Doe"}]';
    (readFileSync as jest.Mock).mockReturnValue(jsonData);

    await dataBaseUtils.seedData(mockFilePath, mockModel);

    expect(mockModel.sync).toHaveBeenCalledWith({ force: true });
    expect(readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8');
    expect(mockModel.bulkCreate).toHaveBeenCalledWith([{ id: 1, name: 'John Doe' }]);
  });

  test('should throw an error when something goes wrong during seeding', async () => {
    (readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('Mock Error');
    });

    await expect(dataBaseUtils.seedData(mockFilePath, mockModel)).rejects.toThrowError(
      new CustomError(500, 'Something went wrong')
    );

    expect(mockModel.sync).toHaveBeenCalledWith({ force: true });
    expect(readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8');
    expect(mockModel.bulkCreate).not.toHaveBeenCalled();
  });
});
