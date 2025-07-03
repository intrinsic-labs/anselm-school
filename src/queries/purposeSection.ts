import { defineQuery } from 'groq'

export const PURPOSE_SECTION_QUERY = defineQuery(`
  *[_type == "purposeSection"][0] {
    titleP1,
    titleP2,
    content,
    highlightQuote->{
      _id,
      title,
      text,
      author,
      source,
      category,
      featured,
      showInCarousel,
      authorImage {
        asset->{
          _id,
          url
        },
        alt,
        position
      }
    },
    backgroundImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`) 