export interface Episode {
  id: number
  title: string
  description: string
  duration: number // in minutes
  thumbnailUrl?: string
  videoUrl?: string
  episodeNumber: number
  seasonNumber: number
  releaseDate?: string // ISO date string
}

export interface Season {
  id: number
  seasonNumber: number
  episodes: Episode[]
}

export interface Series {
  id: number
  title: string
  description: string
  genre: string[]
  releaseYear: number
  rating?: string // e.g. "PG-13", "R"
  language?: string
  thumbnailUrl?: string
  bannerUrl?: string
  trailerUrl?: string
  logoUrl?: string
  cast?: string[]
  director?: string
  seasons: Season[]
  isTrending?: boolean
  isNewRelease?: boolean
  createdAt?: string // ISO date string
  updatedAt?: string
}
