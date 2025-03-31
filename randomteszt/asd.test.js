const array = [123,124,175,423];
const obj = {
    name: 'Peter',
    age: 32,
    work: 'Test Engineer'
}
const throwErrorFn = () => {throw new Error("This is an error")};


test('Array contains control element', () => {
    expect(array).toContain(124);
})

test('Object is the same as control obj', () => {
    expect(obj).toEqual({
        name: 'Peter',
        age: 32,
        work: 'Test Engineer'
    })
})

test('Object contains control obj parts', () => {
    expect(obj).toMatchObject({
        name:'Peter',
        work: 'Test Engineer'
    })
})

test('Throws the exact error as control', () => {
    expect(throwErrorFn).toThrow('This is an error')
})