import React, { useState, useRef, useEffect } from 'react';
import { useScriptures } from '../hooks/useScriptures';
import { Navigation } from './Navigation';
import { ChapterReader } from './ChapterReader';
import type { Scripture, Volume, Book, Chapter } from '../types/scripture';

export const ScriptureReader: React.FC = () => {
  const {
    searchResults,
    volumeCounts,
    chapters,
    loading,
    error,
    searchScriptures,
    getRandomScripture,
    fetchChaptersByBook,
    clearError,
    clearSearchResults,
  } = useScriptures();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentScripture, setCurrentScripture] = useState<Scripture | null>(null);
  const [selectedVolumeId, setSelectedVolumeId] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<{
    volume: Volume;
    book: Book;
    chapter: Chapter;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'search' | 'navigation' | 'random'>('navigation');
  const [randomLoading, setRandomLoading] = useState(false);
  
  // Ref for auto-scrolling to ChapterReader
  const chapterReaderRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to ChapterReader when a chapter is selected
  useEffect(() => {
    if (selectedChapter && chapterReaderRef.current) {
      // Small delay to ensure the component has rendered
      setTimeout(() => {
        chapterReaderRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [selectedChapter]);

  // Helper function to get volume ID from volume short title
  const getVolumeId = (volumeShortTitle: string): number => {
    const volumeMap: { [key: string]: number } = {
      'OT': 1,  // Old Testament
      'NT': 2,  // New Testament
      'BoM': 3, // Book of Mormon
      'D&C': 4, // Doctrine and Covenants
      'PGP': 5, // Pearl of Great Price
    };
    return volumeMap[volumeShortTitle] || 0;
  };

  // Helper function to highlight search terms in text
  const highlightSearchTerms = (text: string, searchQuery: string): React.ReactNode => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-cursor-accent/10 text-cursor-accent/80 font-normal">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const loadRandomScripture = async () => {
    setRandomLoading(true);
    try {
      const scripture = await getRandomScripture();
      if (scripture) {
        setCurrentScripture(scripture);
        clearSearchResults();
        setViewMode('random'); // Set to random mode to show the random scripture
      }
    } catch (error) {
      console.error('Failed to load random scripture:', error);
    } finally {
      setRandomLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentScripture(null); // Clear any previous scripture
      setSelectedVolumeId(null); // Clear volume filter
      await searchScriptures({ query: searchQuery.trim() });
      setViewMode('search');
    }
  };

  const handleVolumeFilter = async (volumeId: number | null) => {
    if (searchQuery.trim()) {
      setSelectedVolumeId(volumeId);
      await searchScriptures({ 
        query: searchQuery.trim(), 
        volumeId: volumeId || undefined 
      });
    }
  };

  const handleScriptureClick = (scripture: Scripture) => {
    setCurrentScripture(scripture);
    clearSearchResults();
  };

  const handleChapterSelect = async (volume: Volume, book: Book, chapter: Chapter) => {
    setSelectedChapter({ volume, book, chapter });
    setViewMode('navigation');
    clearSearchResults();
    
    // Fetch chapters for this book to enable navigation
    await fetchChaptersByBook(book.id);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-cursor-bg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cursor-error/10 border border-cursor-error/20 rounded-lg p-4 mb-4">
            <p className="text-cursor-error font-mono text-sm">
              <span className="text-cursor-accent">ERROR:</span> {error}
            </p>
            <button
              onClick={clearError}
              className="mt-2 px-3 py-1 bg-cursor-error/20 hover:bg-cursor-error/30 text-cursor-error text-xs font-mono rounded border border-cursor-error/30 transition-colors"
            >
              [DISMISS]
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cursor-bg text-cursor-text font-mono">
      {/* Header */}
      <header className="border-b border-cursor-border bg-cursor-surface/50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-lg font-semibold text-cursor-accent">
              &gt; fast-scriptures
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setViewMode('navigation');
                  setCurrentScripture(null);
                  clearSearchResults();
                  setSearchQuery(''); // Also clear the search query
                }}
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  viewMode === 'navigation'
                    ? 'bg-cursor-accent/20 text-cursor-accent border-cursor-accent/30'
                    : 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                }`}
              >
                READ
              </button>
              <button
                onClick={() => {
                  setViewMode('search');
                  setCurrentScripture(null);
                  clearSearchResults();
                  setSearchQuery(''); // Also clear the search query
                }}
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  viewMode === 'search'
                    ? 'bg-cursor-accent/20 text-cursor-accent border-cursor-accent/30'
                    : 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                }`}
              >
                SEARCH
              </button>
              <button
                onClick={loadRandomScripture}
                disabled={randomLoading}
                className={`px-3 py-1 text-xs rounded border transition-colors disabled:opacity-50 ${
                  viewMode === 'random'
                    ? 'bg-cursor-accent/20 text-cursor-accent border-cursor-accent/30'
                    : 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                }`}
              >
                {randomLoading ? 'L🔃AD' : 'RANDOM'}
              </button>
              <a
                href="https://scriptures-fast-api.onrender.com/docs#/scriptures"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-xs rounded border transition-colors bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30"
              >
                API
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="border-b border-cursor-border bg-cursor-surface/30">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scriptures..."
              className="flex-1 bg-cursor-bg border border-cursor-border rounded px-3 py-2 text-sm text-cursor-text placeholder-cursor-text-muted focus:outline-none focus:border-cursor-accent/50"
            />
            <button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="px-4 py-2 bg-cursor-accent/20 hover:bg-cursor-accent/30 text-cursor-accent text-sm rounded border border-cursor-accent/30 transition-colors disabled:opacity-50 sm:w-auto w-full"
            >
              {loading ? 'SEARCHING...' : 'SEARCH'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading && (
          <div className="text-center py-8">
            <p className="text-cursor-text-muted text-sm">
              <span className="text-cursor-accent">[</span> LOADING DATA...
              <span className="text-cursor-accent">]</span>
            </p>
          </div>
        )}

        {/* Navigation Mode */}
        {viewMode === 'navigation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Navigation Panel */}
            <div className="lg:col-span-1">
              <Navigation onChapterSelect={handleChapterSelect} />
            </div>

            {/* Chapter Reader */}
            <div className="lg:col-span-2" ref={chapterReaderRef}>
              {selectedChapter ? (
                <ChapterReader
                  volume={selectedChapter.volume}
                  book={selectedChapter.book}
                  chapter={selectedChapter.chapter}
                  chapters={chapters}
                  onChapterSelect={handleChapterSelect}
                />
              ) : (
                <div className="bg-cursor-surface/30 border border-cursor-border rounded-lg p-6">
                  <div className="text-center py-8">
                    <p className="text-cursor-text-muted text-sm">
                      <span className="text-cursor-accent">[</span>SELECT A CHAPTER TO READ
                      <span className="text-cursor-accent">]</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Mode */}
        {viewMode === 'search' && (
          <div>
            {/* Search Results */}
            {searchResults && searchResults.scriptures.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h2 className="text-sm text-cursor-text-muted">
                    <span className="text-cursor-accent"> </span> SEARCH RESULTS: {searchResults.total} FOUND
                    <span className="text-cursor-accent"> </span>
                  </h2>
                  
                  {/* Volume Filter Controls */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {volumeCounts.map(({ volume, count }) => (
                      <button
                        key={volume}
                        onClick={() => handleVolumeFilter(count > 0 ? getVolumeId(volume) : null)}
                        disabled={count === 0}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          count === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : selectedVolumeId === getVolumeId(volume)
                            ? 'bg-cursor-accent/20 text-cursor-accent border-cursor-accent/30'
                            : 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                        }`}
                                              >
                          {volume}: {count}
                        </button>
                    ))}
                    
                    {/* Reset Filter Button */}
                    {selectedVolumeId && (
                      <button
                        onClick={() => handleVolumeFilter(null)}
                        className="px-2 py-1 text-xs rounded border transition-colors bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30"
                      >
                        [SHOW ALL]
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {searchResults.scriptures.map((scripture) => (
                    <div
                      key={scripture.verse_id}
                      onClick={() => handleScriptureClick(scripture)}
                      className="p-3 bg-cursor-surface/50 border border-cursor-border/50 rounded cursor-pointer hover:bg-cursor-surface/70 hover:border-cursor-border transition-colors"
                    >
                      <div className="text-xs text-cursor-accent mb-1">
                        {highlightSearchTerms(scripture.verse_short_title, searchQuery)}
                      </div>
                      <div className="text-sm text-cursor-text leading-relaxed">
                        {highlightSearchTerms(scripture.scripture_text, searchQuery)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Scripture Display (only when a search result is clicked) */}
            {currentScripture && (
              <div className="bg-cursor-surface/30 border border-cursor-border rounded-lg p-6">
                <div className="mb-4">
                  <h2 className="text-lg text-cursor-accent font-semibold mb-1">
                    {currentScripture.verse_title}
                  </h2>
                  <p className="text-xs text-cursor-text-muted">
                    {currentScripture.volume_title} • {currentScripture.book_long_title}
                  </p>
                </div>
                <div className="text-base leading-relaxed text-cursor-text">
                  {currentScripture.scripture_text}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchResults && searchResults.scriptures.length === 0 && (
              <div className="text-center py-8">
                <p className="text-cursor-text-muted text-sm">
                  <span className="text-cursor-accent">[</span> NO RESULTS FOUND FOR "{searchQuery}"
                  <span className="text-cursor-accent">]</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Random Mode */}
        {viewMode === 'random' && currentScripture && (
          <div className="bg-cursor-surface/30 border border-cursor-border rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-lg text-cursor-accent font-semibold mb-1">
                {currentScripture.verse_title}
              </h2>
              <p className="text-xs text-cursor-text-muted">
                {currentScripture.volume_title} • {currentScripture.book_long_title}
              </p>
            </div>
            <div className="text-base leading-relaxed text-cursor-text">
              {currentScripture.scripture_text}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}; 