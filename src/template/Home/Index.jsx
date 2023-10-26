import { Component } from 'react';
import { PostCard } from '../../components/PostCard/Index';
import { Button } from '../../components/Button/Index';
import { loadPosts } from '../../utils/load-posts';

import './styles.css';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component {

  state = {
    counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    perPage: 2,
    searchValue: '',
  }


  async componentDidMount() {
    await this.loadPosts()
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }


  loadPosts = async () => {

    const { page, perPage } = this.state

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, perPage),
      allPosts: postsAndPhotos
    })

  }

  loadMorePosts = () => {
    const { page, perPage, allPosts, posts } = this.state
    const nextPage = page + perPage
    const nextPost = allPosts.slice(nextPage, nextPage + perPage)
    posts.push(...nextPost)
    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {

    const { posts, page, perPage, allPosts, searchValue } = this.state
    const noMorePosts = page + perPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      })
      : posts;

    return (
      <section className='container'>
        <SearchInput
          searchValue={searchValue}
          handleChange={this.handleChange}
        />

        {filteredPosts.length > 0 && (
          <div className="posts">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="posts">
            <h2>não há posts</h2>
          </div>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text={'loadMorePosts'}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}


export default Home;
