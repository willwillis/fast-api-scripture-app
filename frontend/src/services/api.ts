import axios from 'axios';
import type { 
  Volume, 
  Book, 
  Chapter, 
  Verse, 
  Scripture, 
  ScriptureResponse, 
  ScriptureSearch 
} from '../types/scripture';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scriptureApi = {
  // Get all volumes
  getVolumes: async (): Promise<Volume[]> => {
    const response = await api.get('/api/scriptures/volumes');
    return response.data;
  },

  // Get books by volume
  getBooksByVolume: async (volumeId: number): Promise<Book[]> => {
    const response = await api.get(`/api/scriptures/volumes/${volumeId}/books`);
    return response.data;
  },

  // Get chapters by book
  getChaptersByBook: async (bookId: number): Promise<Chapter[]> => {
    const response = await api.get(`/api/scriptures/books/${bookId}/chapters`);
    return response.data;
  },

  // Get verses by chapter
  getVersesByChapter: async (chapterId: number): Promise<Verse[]> => {
    const response = await api.get(`/api/scriptures/chapters/${chapterId}/verses`);
    return response.data;
  },

  // Search scriptures
  searchScriptures: async (search: ScriptureSearch): Promise<ScriptureResponse> => {
    const params = new URLSearchParams({
      q: search.query,
      limit: search.limit?.toString() || '50',
      offset: search.offset?.toString() || '0',
    });
    if (search.volumeId) {
      params.append('volume_id', search.volumeId.toString());
    }
    const response = await api.get(`/api/scriptures/search?${params}`);
    return response.data;
  },

  // Get search volume counts
  getSearchVolumeCounts: async (query: string): Promise<Array<{volume: string, count: number}>> => {
    const response = await api.get(`/api/scriptures/search/volumes?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get scripture by reference
  getScriptureByReference: async (
    bookTitle: string, 
    chapter: number, 
    verse?: number
  ): Promise<Scripture[]> => {
    const params = verse ? `?verse=${verse}` : '';
    const response = await api.get(`/api/scriptures/reference/${bookTitle}/${chapter}${params}`);
    return response.data;
  },

  // Get random scripture
  getRandomScripture: async (): Promise<Scripture> => {
    const response = await api.get('/api/scriptures/random?include_lds=true');
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 