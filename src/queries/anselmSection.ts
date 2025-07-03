import { defineQuery } from 'groq'

export const ANSELM_SECTION_QUERY = defineQuery(`
  *[_type == "anselmSection"][0] {
    _id,
    title,
    lifespan,
    description,
    quote {
      text,
      source
    },
    portrait {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`) 