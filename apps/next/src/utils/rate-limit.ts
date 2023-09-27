import { LRUCache } from 'lru-cache'

// Types
import type { NextApiResponse } from 'next'

interface Options {
  uniqueTokenPerInterval?: number
  interval?: number
}

interface RateLimit {
  check: (
    _res: NextApiResponse,
    _limit: number,
    _token: string,
  ) => Promise<void | null>
}

const rateLimit = (options?: Options): RateLimit => {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]!
        const isRateLimited = currentUsage >= limit
        res.setHeader('X-RateLimit-Limit', limit)
        res.setHeader(
          'X-RateLimit-Remaining',
          isRateLimited ? 0 : limit - currentUsage,
        )

        return isRateLimited ? reject() : resolve(null)
      }),
  }
}

export default rateLimit
