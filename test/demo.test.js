/** 
 * @description test demo
 * @author xyp
 */

function sub(a, b) {
    return a + b;
}

test('10+20to30', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})