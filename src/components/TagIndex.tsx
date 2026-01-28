import React, { useState, useRef, useEffect } from 'react';
import { groupAndSortTags, getAlphabet } from '../utils/pinyin';

interface TagIndexProps {
  tags: string[];
  baseUrl: string;
  allPosts: Array<{ data: { tags: string[] } }>;
}

export default function TagIndex({ tags, baseUrl, allPosts }: TagIndexProps) {
  const [searchText, setSearchText] = useState('');
  const [activeLetters, setActiveLetters] = useState<Set<string>>(new Set());
  const groupedTags = groupAndSortTags(tags);
  const alphabet = getAlphabet();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // 过滤标签
  const filteredGrouped = Object.keys(groupedTags).reduce((acc, letter) => {
    const filtered = groupedTags[letter].filter(tag =>
      tag.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[letter] = filtered;
    }
    return acc;
  }, {} as Record<string, string[]>);

  // 处理字母点击
  const handleLetterClick = (letter: string) => {
    const sectionRef = sectionRefs.current[letter];
    if (sectionRef && containerRef.current) {
      const offset = sectionRef.offsetTop - containerRef.current.offsetTop;
      containerRef.current.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  // 监听滚动，更新活跃字母
  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    let activeLetterCandidate: string | null = null;
    let closestDistance = Infinity;

    Object.entries(sectionRefs.current).forEach(([letter, ref]) => {
      if (!ref) return;
      const offsetTop = ref.offsetTop;

      // 计算当前滚动位置到该section的距离
      // 优先选择距离最近且在视图范围内的section
      if (scrollTop >= offsetTop) {
        const distance = scrollTop - offsetTop;
        if (distance < closestDistance) {
          closestDistance = distance;
          activeLetterCandidate = letter;
        }
      }
    });

    if (activeLetterCandidate) {
      setActiveLetters(new Set([activeLetterCandidate]));
    } else {
      setActiveLetters(new Set());
    }
  };

  return (
    <div className="space-y-6">
      {/* 搜索框 */}
      <div className="flex justify-center z-20">
        <div className="relative w-full max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="快速搜索标签..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
          />
          {searchText && (
            <button
              onClick={() => setSearchText('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 主容器 */}
      <div className="relative flex gap-4" style={{ height: '500px' }}>
        {/* 左侧：标签列表 */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pr-1 space-y-4"
        >
          {Object.keys(filteredGrouped)
            .sort()
            .map((letter) => (
              <div key={letter} ref={(el) => { if (el) sectionRefs.current[letter] = el; }}>
                {/* 字母标题 */}
                <div className="sticky top-0 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-md mb-2 font-bold text-gray-700 dark:text-gray-200 text-sm">
                  {letter}
                </div>

                {/* 标签列表 */}
                <div className="flex flex-wrap gap-2 ml-2">
                  {filteredGrouped[letter].map((tag) => (
                    <a
                      key={tag}
                      href={`${baseUrl}tags/${tag}/`}
                      className={`
                        inline-flex items-center gap-1 px-3 py-1.5 
                        rounded-full bg-blue-50 dark:bg-blue-900/30 
                        border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 
                        text-gray-700 dark:text-blue-300 text-sm font-medium transition-colors 
                        hover:border-blue-400 dark:hover:border-blue-500
                        ${tag === "平台" ? " bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200" : ""}
                      `}
                    >
                      <span>{tag}</span>
                      <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-1.5 py-0.5 rounded-full font-semibold">
                        {allPosts.filter(post => post.data.tags && post.data.tags.includes(tag)).length}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

          {Object.keys(filteredGrouped).length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500 text-center">
              <div>
                <p className="text-lg font-medium">没有找到匹配的标签</p>
                <p className="text-sm mt-1">试试其他关键词</p>
              </div>
            </div>
          )}
        </div>

        {/* 右侧：字母索引 */}
        <div className="absolute -right-10 top-0 bottom-0 w-8 flex flex-col justify-center gap-0.5 py-4 pointer-events-auto">
          {alphabet.map((letter) => {
            const hasItems = letter in groupedTags;
            const isActive = activeLetters.has(letter);
            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`w-full h-auto px-1.5 py-0.5 text-xs font-bold rounded transition-all ${!hasItems
                  ? 'text-gray-300 dark:text-gray-600 cursor-default'
                  : isActive
                    ? 'bg-blue-500 text-white scale-110 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                  }`}
                disabled={!hasItems}
                title={letter}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-8 p-6 bg-linear-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex justify-around text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {Object.keys(groupedTags).length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">总标签数</div>
          </div>
          <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {allPosts.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">文章总数</div>
          </div>
          {searchText && (
            <>
              <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Object.keys(filteredGrouped).reduce((sum, letter) => sum + filteredGrouped[letter].length, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">匹配结果</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
