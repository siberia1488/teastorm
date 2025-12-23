export const teasQuery = `
  *[_type == "tea"]{
    _id,
    title,
    slug,
    category,
    origin,
    description,
    image,
    variants[]{
      _id,
      title,
      weight,
      price
    }
  }
`
