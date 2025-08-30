import { defineQuery } from 'groq'

export const GIVING_SECTION_QUERY = defineQuery(`
  *[_type == "givingSection"][0] {
    _id,
    title,
    heading,
    impact,
    backgroundImage {
      asset->{
        _id,
        url
      },
      alt
    },
    highlightImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`)