import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import useGetUserByUserId from '../../hooks/useGetUserByProfileId'

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserByUserId(post.createdby)

  return (
    <>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={4} overflow={"hidden"}>
            <Image src={post.imageURL} alt={'feed post image'} />
        </Box>
        <PostFooter post={post} creatorProfile={userProfile} />
    </>
  )
}

export default FeedPost