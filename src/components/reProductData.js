//整理product data
export function reProductData(data) {
  return data.map(({ id, title, description, price }) => {
    return {
      key: id,
      name: title,
      desc: description,
      price: price,
      status: true
    }
  })
}
