/** text1行あたりの文字数 */
export const TEXT_LINE_LENGTH: number = 44
/** textの行数 */
export const TEXT_LINE_NUM: number = 6
/** roman1行あたりの文字数 */
export const ROMAN_LINE_LENGTH: number = 50
/** romanの行数 */
export const ROMAN_LINE_NUM: number = 8
/** romanの長さ（400文字） */
export const ROMAN_LENGTH: number = ROMAN_LINE_LENGTH * ROMAN_LINE_NUM

/** textのプレースホルダ */
export const TEXT_LINE_PLACEHOLDER: string = '　'.repeat(TEXT_LINE_LENGTH)
/** romanのプレースホルダ */
export const ROMAN_LINE_PLACEHOLDER: string = '\u00a0'.repeat(ROMAN_LINE_LENGTH)
