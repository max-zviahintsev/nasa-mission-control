async function getPagination(page: number, pageSize: number) {
  const pageProcessed = Math.abs(page)
  const limit = Math.abs(pageSize)
  const skip = (pageProcessed - 1) * limit

  return {
    skip,
    limit,
  }
}

export { getPagination }
