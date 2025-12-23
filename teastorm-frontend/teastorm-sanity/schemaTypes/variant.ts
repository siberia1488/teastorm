import {defineType, defineField} from 'sanity'

export const variant = defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: '50g / 100g / Cake',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'weight',
      title: 'Weight (grams)',
      type: 'number',
      description: '50 / 100 (leave empty for cake)',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'inStock',
      title: 'In stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
