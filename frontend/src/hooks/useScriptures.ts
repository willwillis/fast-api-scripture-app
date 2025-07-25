import { useState, useCallback } from 'react';
import { scriptureApi } from '../services/api';
import type {
  Volume,
  Book,
  Chapter,
  Verse,
  ScriptureResponse,
  ScriptureSearch
} from '../types/scripture';

export const useScriptures = () => {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [searchResults, setSearchResults] = useState<ScriptureResponse | null>(null);
  const [volumeCounts, setVolumeCounts] = useState<Array<{volume: string, count: number}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVolumes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptureApi.getVolumes();
      setVolumes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch volumes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBooksByVolume = useCallback(async (volumeId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptureApi.getBooksByVolume(volumeId);
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchChaptersByBook = useCallback(async (bookId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptureApi.getChaptersByBook(bookId);
      setChapters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chapters');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVersesByChapter = useCallback(async (chapterId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptureApi.getVersesByChapter(chapterId);
      setVerses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch verses');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchScriptures = useCallback(async (search: ScriptureSearch) => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptureApi.searchScriptures(search);
      setSearchResults(data);

      // Get volume counts for the search
      const counts = await scriptureApi.getSearchVolumeCounts(search.query);
      setVolumeCounts(counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search scriptures');
    } finally {
      setLoading(false);
    }
  }, []);

  const getScriptureByReference = useCallback(async (
    bookTitle: string,
    chapter: number,
    verse?: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await scriptureApi.getScriptureByReference(bookTitle, chapter, verse);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch scripture');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomScripture = useCallback(async () => {
    setError(null);
    try {
      const data = await scriptureApi.getRandomScripture();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch random scripture');
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults(null);
    setVolumeCounts([]);
  }, []);

  return {
    // State
    volumes,
    books,
    chapters,
    verses,
    searchResults,
    volumeCounts,
    loading,
    error,

    // Actions
    fetchVolumes,
    fetchBooksByVolume,
    fetchChaptersByBook,
    fetchVersesByChapter,
    searchScriptures,
    getScriptureByReference,
    getRandomScripture,
    clearError,
    clearSearchResults,
  };
};
