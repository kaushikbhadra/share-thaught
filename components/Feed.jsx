'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  const searchPrompt = (searchText) => {
    const regexp = new RegExp(searchText, 'i')
    return posts.filter(
      (searchItem) =>
        regexp.test(searchItem.creator.username) ||
        regexp.test(searchItem.tag) ||
        regexp.test(searchItem.prompt)
    )
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    const searchResultItem = searchPrompt(e.target.value)
    setSearchResult(searchResultItem)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const searchResultItem = searchPrompt(tag)
    setSearchResult(searchResultItem)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Seach for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
