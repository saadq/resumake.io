export interface PreviewState {
  resume: {
    loading: boolean
    url?: string | null
    jsonUrl?: string | null
    error?: string | null
  }
}
