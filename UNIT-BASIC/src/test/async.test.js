// https://jestjs.io/docs/asynchronous

const fetchProduct = require("../async.js");

describe("Async", () => {
  /* 0. 기존 동기 방식 ❌
  * UnhandlePromiseRejectionWarning
  * fetchProduct 함수를 호출한 뒤 then을 실행하지 않고 (promise가 끝날 때까지 기다리지 않음, then 내부 실행 x) 끝나기 때문에 test는 통과하지만 promise 내부에서 에러 발생
  
  it("async", () => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Poop", price: 200 });
    });
  });*/

  // 1. done으로 끝나는 시점 알려주기 👎
  // - 수동으로 불러오는 게 깔끔해보이지 않는다.
  // - 수행 시간이 길다.
  it("async - done", (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
      done();
    });
  });

  // 2. return 하기
  it("async - return", () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
    });
  });

  // 3. await 하기
  it("async - await", async () => {
    const product = await fetchProduct();
    expect(product).toEqual({ item: "Milk", price: 200 });
  });

  // 4-1. resolve
  it("async - resolves", () => {
    return expect(fetchProduct()).resolves.toEqual({
      item: "Milk",
      price: 200,
    });
  });

  // 4-2. reject
  it("async - reject", () => {
    return expect(fetchProduct("error")).rejects.toBe("network error");
  });
});
