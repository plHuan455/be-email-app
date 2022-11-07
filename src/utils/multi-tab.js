export function createNewTab() {
  return {
    id: `tab-${Date.now()}`,
    keyword: '',
    shop: 'tiki',
    step: 0,
    productList: [],
    current_page: 0,
    last_page: 1,
  };
}
