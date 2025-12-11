import axios from 'axios'
import type { BibleDataResponse } from '@repo/app/types/api'

const HONO_API_URL = process.env.HONO_API_URL

interface HonoApiResponse {
  data: BibleDataResponse | null
  error: string | null
}

interface HonoFileResponse {
  data: string | null
  error: string | null
}

export async function getBibleData(
  version: string,
  abbr: string,
  chapter: string | number,
): Promise<HonoApiResponse> {
  try {
    const url = `${HONO_API_URL}/bible/${version}/${abbr}/${chapter}`

    const response = await axios.get<HonoApiResponse>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    })

    return response.data
  } catch (error) {
    console.error('Error fetching from Hono API:', error)

    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error:
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch from Hono API',
      }
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch from Hono API',
    }
  }
}

export async function getBibleFile(version: string): Promise<HonoFileResponse> {
  try {
    const url = `${HONO_API_URL}/file/${version}`

    const response = await axios.get<HonoFileResponse>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    })

    return response.data
  } catch (error) {
    console.error('Error fetching file from Hono API:', error)

    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error:
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch file from Hono API',
      }
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch file from Hono API',
    }
  }
}
