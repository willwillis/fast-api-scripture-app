import React, { useState, useEffect } from 'react';
import { useScriptures } from '../hooks/useScriptures';
import { Navigation } from './Navigation';
import { ChapterReader } from './ChapterReader';
import type { Scripture, Volume, Book, Chapter } from '../types/scripture';

export const ScriptureReader: React.FC = () => {
  const {
    searchResults,
    loading,
    error,
    searchScriptures,
    getRandomScripture,
    clearError,
    clearSearchResults,
  } = useScriptures();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentScripture, setCurrentScripture] = useState<Scripture | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<{
    volume: Volume;
    book: Book;
    chapter: Chapter;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'search' | 'navigation'>('navigation');

  useEffect(() => {
    // Load a random scripture on component mount
    loadRandomScripture();
  }, []);

  const loadRandomScripture = async () => {
    const scripture = await getRandomScripture();
    if (scripture) {
      setCurrentScripture(scripture);
      clearSearchResults();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchScriptures({ query: searchQuery.trim() });
      setViewMode('search');
    }
  };

  const handleScriptureClick = (scripture: Scripture) => {
    setCurrentScripture(scripture);
    clearSearchResults();
  };

  const handleChapterSelect = (volume: Volume, book: Book, chapter: Chapter) => {
    setSelectedChapter({ volume, book, chapter });
    setViewMode('navigation');
    clearSearchResults();
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
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-cursor-accent">
              &gt; fast-scriptures
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('navigation')}
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  viewMode === 'navigation'
                    ? 'bg-cursor-accent/20 text-cursor-accent border-cursor-accent/30'
                    : 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                }`}
              >
                [READ]
              </button>
              <button
                onClick={() => setViewMode('search')}
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  viewMode === 'search'
                    ? 'bg-cursor-accent/20 text-cursor-accent border-cursor-accent/30'
                    : 'bg-cursor-surface/20 text-cursor-text border-cursor-border hover:bg-cursor-surface/30'
                }`}
              >
                [SEARCH]
              </button>
              <button
                onClick={loadRandomScripture}
                disabled={loading}
                className="px-3 py-1 bg-cursor-accent/20 hover:bg-cursor-accent/30 text-cursor-accent text-xs rounded border border-cursor-accent/30 transition-colors disabled:opacity-50"
              >
                {loading ? '[LOADING...]' : '[RANDOM]'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="border-b border-cursor-border bg-cursor-surface/30">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
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
              className="px-4 py-2 bg-cursor-accent/20 hover:bg-cursor-accent/30 text-cursor-accent text-sm rounded border border-cursor-accent/30 transition-colors disabled:opacity-50"
            >
              {loading ? '[SEARCHING...]' : '[SEARCH]'}
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
            <div className="lg:col-span-2">
              {selectedChapter ? (
                <ChapterReader
                  volume={selectedChapter.volume}
                  book={selectedChapter.book}
                  chapter={selectedChapter.chapter}
                />
              ) : (
                <div className="bg-cursor-surface/30 border border-cursor-border rounded-lg p-6">
                  <div className="text-center py-8">
                    <p className="text-cursor-text-muted text-sm">
                      <span className="text-cursor-accent">[</span> SELECT A CHAPTER TO READ
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
                <h2 className="text-sm text-cursor-text-muted mb-4">
                  <span className="text-cursor-accent">[</span> SEARCH RESULTS: {searchResults.total} FOUND
                  <span className="text-cursor-accent">]</span>
                </h2>
                <div className="space-y-2">
                  {searchResults.scriptures.map((scripture) => (
                    <div
                      key={scripture.verse_id}
                      onClick={() => handleScriptureClick(scripture)}
                      className="p-3 bg-cursor-surface/50 border border-cursor-border/50 rounded cursor-pointer hover:bg-cursor-surface/70 hover:border-cursor-border transition-colors"
                    >
                      <div className="text-xs text-cursor-accent mb-1">
                        {scripture.verse_short_title}
                      </div>
                      <div className="text-sm text-cursor-text leading-relaxed">
                        {scripture.scripture_text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Scripture Display */}
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
      </main>
    </div>
  );
}; 