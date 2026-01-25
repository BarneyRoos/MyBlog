import pinyin from "pinyin";

/**
 * 获取文本的拼音首字母
 * @param text 输入文本
 * @returns 拼音首字母（大写）或 # 符号
 */
export function getPinyinFirstLetter(text: string): string {
  if (!text) return "#";

  const firstChar = text.charAt(0);

  // 如果是英文，直接返回大写
  if (/^[a-zA-Z]$/.test(firstChar)) {
    return firstChar.toUpperCase();
  }

  // 如果是数字，返回 #
  if (/^[0-9]$/.test(firstChar)) {
    return "#";
  }

  // 使用 pinyin 库转换
  try {
    const result = pinyin(firstChar, {
      heteronym: false, // 不使用多音字
      segment: false,
    });

    if (result && result.length > 0 && result[0].length > 0) {
      const pinyinStr = result[0][0]; // 获取第一个拼音
      const firstLetter = pinyinStr.charAt(0).toUpperCase();

      // 确保返回的是有效的字母
      if (/^[A-Z]$/.test(firstLetter)) {
        return firstLetter;
      }
    }
  } catch (error) {
    console.warn(`Failed to convert "${firstChar}" to pinyin:`, error);
  }

  return "#";
}

/**
 * 按拼音首字母分类并排序标签
 * @param tags 标签数组
 * @returns 按字母分类的标签对象
 */
export function groupAndSortTags(tags: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  tags.forEach((tag) => {
    const letter = getPinyinFirstLetter(tag);
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(tag);
  });

  // 对每个分类内的标签进行排序
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => {
      // 使用 localeCompare 进行中英文混合排序
      return a.localeCompare(b, "zh-CN", { numeric: true });
    });
  });

  return grouped;
}

/**
 * 获取完整的字母表
 * @returns 包含所有字母的数组
 */
export function getAlphabet(): string[] {
  return [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "#",
  ];
}
