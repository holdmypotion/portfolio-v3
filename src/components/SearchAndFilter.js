export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  allTags,
  searchInputId,
  searchPlaceholder = 'search... (press / to focus)',
  searchAriaLabel = 'Search',
}) {
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className='mb-6 space-y-2'>
      <div className='relative'>
        <input
          id={searchInputId}
          type='text'
          placeholder={searchPlaceholder}
          className='w-full p-2 bg-custom-dark-bg border border-custom-border text-sm font-mono text-custom-soft-white placeholder-custom-comment focus:outline-none focus:border-custom-fg'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label={searchAriaLabel}
        />
      </div>
      <div className='flex flex-wrap gap-2 items-center'>
        {[...allTags].sort().map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-xs font-mono border transition-colors focus:outline-none focus:ring-1 focus:ring-custom-fg ${
                isSelected
                  ? 'bg-custom-fg text-custom-bg border-custom-fg hover:bg-custom-bright-fg'
                  : 'bg-custom-dark-bg text-custom-soft-white border-custom-border hover:border-custom-fg hover:text-custom-bright-fg'
              }`}
              aria-label={`${isSelected ? 'Remove' : 'Add'} ${tag} filter`}
              aria-pressed={isSelected}
            >
              {tag}
            </button>
          );
        })}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className='px-2 py-1 text-xs text-custom-comment hover:text-custom-fg transition-colors border-l border-custom-border ml-2 pl-3'
            aria-label='Clear all tag filters'
          >
            clear all
          </button>
        )}
      </div>
    </div>
  );
}
