'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'
import Pagination from '@components/Pagination'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState([])
  const serchParams = useSearchParams()
  const pageNumber = serchParams.get('page')

  const totalPostsSize = totalPosts.length
  const limit = 3
  const totalPages = Math.ceil(totalPostsSize / limit)
  let currentPage = 1
  if (Number(pageNumber) >= 1) {
    currentPage = Number(pageNumber)
  }

  let skip = limit * (currentPage - 1)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/limit/posts?limit=${limit}&&skip=${skip}`
      )
      const data = await response.json()
      setPosts(data)
    }

    if (session?.user.id) fetchPosts()
  }, [posts, skip])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        })
        const filterPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filterPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const fetchUserAllPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)

        if (!response.ok) {
          throw new Error('Failed to fetch all user posts')
        }

        const data = await response.json()
        setTotalPosts(data)
      } catch (error) {
        console.error(error)
        setTotalPosts([])
      }
    }

    if (session?.user.id) fetchUserAllPosts()
  }, [posts])

  return (
    <>
      <Profile
        name={'My'}
        desc='welcome to your personalized profile page'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {posts.length !== 0 && (
        <Pagination
          totalPosts={totalPostsSize}
          postPerPage={limit}
          totalPages={totalPages}
          currentPage={currentPage}
          skip={skip}
          isProfilePage={true}
        />
      )}
    </>
  )
}

export default MyProfile
