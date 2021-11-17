import { addOne } from '../addOne'

describe('addOne', () => {
  it('returns number plus one', () => {
    // 실패하는 테스트를 먼저 만들어야 한다. RED
    expect(addOne(3)).toEqual(4)
  })
})