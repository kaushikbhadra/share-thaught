import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req) => {
  let limit = req.nextUrl.searchParams.get('limit')
  let skip = req.nextUrl.searchParams.get('skip')
  try {
    await connectToDB()
    const prompts = await Prompt.find({})
      .populate('creator')
      .limit(Number(limit))
      .skip(Number(skip))
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}
