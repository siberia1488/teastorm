import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'
import type { ImageUrlBuilder } from '@sanity/image-url'

const builder: ImageUrlBuilder = imageUrlBuilder(sanityClient)

export function urlFor(source: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
return builder.image(source as any)
}
