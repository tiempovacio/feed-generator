export const filterPost = (post) => {
  if (!post.record || !post.record.text) return false

  const content = post.record.text.toLowerCase()

  const authors = [
    '9008kivi9023',
    'bidix',
    'chiaraverdadera',
    'condenastan',
    'criaturakivista',
    'curioseando',
    'dancingstorms8',
    'eli23vio',
    'fontvella',
    'jinxcarey',
    'kbessets',
    'kikista1989',
    'kiviseva2501',
    'kivismoobarbarie17',
    'lakikapelirroja',
    'moksi',
    'nosoylesbiana',
    'picobrillo2',
    'sonnetmylv',
    'versoerrante',
    'vio11',
    'yssyyssy'
  ]

  const keywords = ['kivi', 'violeta hodar', 'violeta', 'chiara']

  const authorHandle = post.author.handle.toLowerCase()
  const matchesAuthor = authors.includes(authorHandle)
  const matchesKeyword = keywords.some((kw) => content.includes(kw))

  const isReply = post.record?.reply !== undefined

  // Descomenta para depurar:
  // console.log('Autor:', authorHandle, '| Texto:', content.substring(0, 40))

  return (matchesAuthor || matchesKeyword) && !isReply
}
