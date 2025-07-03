import { defineQuery } from 'groq'

export const IDENTITY_SECTION_QUERY = defineQuery(`
  *[_type == "identitySection"][0] {
    titleP1,
    titleP2,
    distinctives[] {
      title,
      shortDescription,
      content,
      icon {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    motto {
      primary,
      sub,
      showInCarousel,
      mottoExplanation
    },
    ctaText,
    ctaLink
  }
`) 