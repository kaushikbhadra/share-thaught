'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Pagination from './Pagination'
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
  const [totalPosts, setTotalPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const serchParams = useSearchParams()
  const pageNumber = serchParams.get('page')

  const totalPostsSize = totalPosts.length
  const postPerPage = 6

  const totalPages = Math.ceil(totalPostsSize / postPerPage)
  let currentPage = 1
  if (Number(pageNumber) >= 1) {
    currentPage = Number(pageNumber)
  }

  let skip = postPerPage * (currentPage - 1)

  useEffect(() => {
    const fetchlimitPosts = async () => {
      try {
        const response = await fetch(
          `/api/prompt/limit/posts?limit=${postPerPage}&skip=${skip}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch limit posts')
        }

        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
        setPosts([])
      }
    }

    fetchlimitPosts()
  }, [skip])

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`/api/prompt`)

        if (!response.ok) {
          throw new Error('Failed to fetch all posts')
        }

        const data = await response.json()
        setTotalPosts(data)
      } catch (error) {
        console.error(error)
        setTotalPosts([])
      }
    }

    fetchAllPosts()
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
    e.preventDefault()
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

      {posts.length !== 0 && (
        <Pagination
          totalPosts={totalPostsSize}
          postPerPage={postPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          skip={skip}
        />
      )}
    </section>
  )
}

export default Feed
