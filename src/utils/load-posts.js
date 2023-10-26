export const loadPosts = async () => {
  const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

  const [posts, photos] = await Promise.all([postResponse, photosResponse])

  const postJKson = await posts.json()
  const photosKson = await photos.json()

  const postsAndPhotos = postJKson.map((post, index) => {
    return {
      ...post,
      cover: photosKson[index].url
    }
  })

  return postsAndPhotos;
}