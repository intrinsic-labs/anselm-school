import { defineQuery } from 'groq'

export const HERO_SECTION_QUERY = defineQuery(`
  *[_type == "heroSection"][0] {
    headline,
    subheadline,
    openingStatement,
    ctaText,
    donationCtaText,
    backgroundImage {
      asset->{
        _id,
        url
      },
      alt
    },
    logomark {
      asset->{
        _id,
        url
      },
      alt
    },
    logotype {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`) 