import {defineType, defineField} from 'sanity'

export const tea = defineType({
  name: 'tea',
  title: 'Tea',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Green', value: 'green'},
          {title: 'White', value: 'white'},
          {title: 'Oolong', value: 'oolong'},
          {title: 'Black', value: 'black'},
          {title: 'Pu-erh', value: 'puer'},
          {title: 'GABA', value: 'gaba'},
        ],
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      validation: Rule => Rule.min(1),
    }),

    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{type: 'variant'}],
      validation: Rule => Rule.min(1),
    }),

    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'string',
      description: 'Yunnan / Fujian / Taiwan',
    }),

    defineField({
      name: 'year',
      title: 'Harvest year',
      type: 'number',
    }),

    defineField({
      name: 'aroma',
      title: 'Aroma',
      type: 'text',
    }),

    defineField({
      name: 'taste',
      title: 'Taste',
      type: 'text',
    }),

    defineField({
      name: 'effect',
      title: 'Effect',
      type: 'text',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'featured',
      title: 'Featured product',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
