// https://jestjs.io/docs/mock-functions

// ** jest의 mock을 남용한 나쁜 예시 **

const ProductService = require("../product_service_no_di.js");
const ProductClient = require("../product_client.js");
/** ProductService의 fetchAvailableItems를 호출하면 내부의 ProductClient를 사용하는 것
 * 이는 다른 모듈의 객체와 그 함수를 사용하게 되어 유닛테스트를 위한 독립성이 없어짐
 * 이를 해결하기 위해 jest.mock()을 사용하여 테스트 코드내에서는 product_client.js에서 불러온 값을 가짜 객체로 처리함
 * (모듈 전체 mock 처리)
 */
jest.mock("../product_client.js");

describe("ProductService", () => {
  /** 또한 product_client에서 데이터를 받아오는 fetchItems()함수를 대체하기 위해 다음과 같이 작성
   * 1. jest.fn()을 사용하여 모듈에서 부분적으로 사용하는 함수를 대체할 mock 함수 작성
   */
  const fetchItems = jest.fn(async () => [
    { item: "🥛", available: true },
    { item: "🍌", available: false },
  ]);
  /** 2. mockImplementation()를 이용하여 테스트코드에서 만들어 둔 mock 함수(fetchItems)로 교체
   */
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });

  let productService;

  beforeEach(() => {
    productService = new ProductService();
    // 1. jest.config.js에서 clearMocks: true 설정하거나
    // 2. 아래와 같이 수동으로 mock 초기화
    // fetchItems.mockClear();
    // ProductClient.mockClear();
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: "🥛", available: true }]);
  });

  it("test", async () => {
    const items = await productService.fetchAvailableItems();
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});
