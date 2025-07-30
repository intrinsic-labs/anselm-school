import { defineQuery } from 'groq'

export const LASTING_SECTION_QUERY = defineQuery(`
  *[_type == "lastingSection"][0] {
    titleP1,
    titleP2,
    content,
    backgroundImage {
      asset->{
        _id,
        url
      },
      hotspot,
      crop,
      alt
    }
  }
`) 