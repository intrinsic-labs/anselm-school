import { defineQuery } from 'groq'

export const QUOTES_QUERY = defineQuery(`
  *[_type == "quotes"] {
    _id,
    title,
    text,
    author,
    source,
    category,
    featured,
    authorImage {
      asset->{
        _id,
        url
      },
      alt,
      position
    }
  }
`)

export const FEATURED_QUOTES_QUERY = defineQuery(`
  *[_type == "quotes" && featured == true] {
    _id,
    title,
    text,
    author,
    source,
    category,
    featured,
    authorImage {
      asset->{
        _id,
        url
      },
      alt,
      position
    }
  }
`)

export const QUOTES_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "quotes" && category == $category] {
    _id,
    title,
    text,
    author,
    source,
    category,
    featured,
    authorImage {
      asset->{
        _id,
        url
      },
      alt,
      position
    }
  }
`)

export const SINGLE_QUOTE_QUERY = defineQuery(`
  *[_type == "quotes" && _id == $id][0] {
    _id,
    title,
    text,
    author,
    source,
    category,
    featured,
    authorImage {
      asset->{
        _id,
        url
      },
      alt,
      position
    }
  }
`) 