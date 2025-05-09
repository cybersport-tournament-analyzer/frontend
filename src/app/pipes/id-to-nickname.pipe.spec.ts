import { IdToNicknamePipe } from './id-to-nickname.pipe';

describe('IdToNicknamePipe', () => {
  it('create an instance', () => {
    const pipe = new IdToNicknamePipe();
    expect(pipe).toBeTruthy();
  });
});
