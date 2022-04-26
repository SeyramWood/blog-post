import React from 'react'
import {useRouter} from 'next/router'


const PostDetails = () => {
    const router =  useRouter()
    const {postId} = router.query
    console.log(router);
  return (
    <div>PostDetails {postId}</div>
  )
}

export default PostDetails