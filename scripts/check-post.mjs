import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const BANNED_WORDS = [
  "seamlessly",
  "robust",
  "leverage",
  "it's worth noting",
  "it is worth noting",
  "in today's landscape",
  "in today's fast-paced",
  "game-changer",
  "delve",
  "pivotal",
  "meticulous",
  "comprehensive",
  "valuable insights",
  "utilize",
  "holistic",
  "synergy",
  "paradigm",
  "cutting-edge",
  "state-of-the-art",
  "best-in-class",
  "transformative",
  "revolutionize",
  "foster",
  "cultivate",
  "underscore",
  "tapestry",
  "testament",
  "bolstered",
  "garnered",
]

const AI_TELL_TITLE_PHRASES = [
  "Exploring",
  "Navigating",
  "Mastering",
  "Unlocking",
  "Delving",
  "Demystifying",
  "Unveiling",
  "Discovering",
]

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function hasNumber(text) {
  return /\b\d+(\.\d+)?(%|ms|s|kb|mb|gb|x|k|m)?\b/i.test(text)
}

function countNumbers(text) {
  const matches = text.match(/\b\d+(\.\d+)?(%|ms|s|kb|mb|gb|x|k|m)?\b/gi)
  return matches ? matches.length : 0
}

function hasFirstPerson(text) {
  return /\b(I|we|our|my|I've|I'm|we've|I'd|we'd)\b/.test(text)
}

function hasCodeBlock(content) {
  return /```/.test(content)
}

function getH2Sections(content) {
  const sections = []
  const h2Regex = /^## .+$/gm
  const positions = []
  let match

  while ((match = h2Regex.exec(content)) !== null) {
    positions.push(match.index)
  }

  for (let index = 0; index < positions.length; index += 1) {
    const start = positions[index]
    const end = positions[index + 1] ?? content.length
    const sectionContent = content.slice(start, end)
    const headingEnd = content.indexOf("\n", start)
    const heading = content.slice(start, headingEnd === -1 ? end : headingEnd)
    const paragraphCount = sectionContent
      .split(/\n\n+/)
      .filter((paragraph) => {
        const trimmed = paragraph.trim()
        return (
          trimmed &&
          !trimmed.startsWith("#") &&
          !trimmed.startsWith("```") &&
          trimmed.length > 20
        )
      }).length

    sections.push({ heading, paragraphCount })
  }

  return sections
}

function pushOk(results, msg) {
  results.push(`  OK    ${msg}`)
}

function pushWarn(warnings, msg) {
  warnings.push(`  WARN  ${msg}`)
}

function pushError(errors, msg) {
  errors.push(`  ERROR ${msg}`)
}

const filePath = process.argv[2]

if (!filePath) {
  console.error("Usage: npm run check-post content/posts/[slug].mdx")
  process.exit(1)
}

const absPath = path.resolve(ROOT, filePath)

if (!absPath.startsWith(`${ROOT}${path.sep}`)) {
  console.error(`File must be inside project root: ${filePath}`)
  process.exit(1)
}

if (!fs.existsSync(absPath)) {
  console.error(`File not found: ${absPath}`)
  process.exit(1)
}

const source = fs.readFileSync(absPath, "utf-8")
const { data: frontmatter, content } = matter(source)
const words = content.split(/\s+/).filter(Boolean)
const first100Words = words.slice(0, 100).join(" ")
const first300Words = words.slice(0, 300).join(" ")
const first800Words = words.slice(0, 800).join(" ")
const totalWords = words.length

const errors = []
const warnings = []
const results = []
const faqs = Array.isArray(frontmatter.faqs) ? frontmatter.faqs : []
const keywords = Array.isArray(frontmatter.keywords) ? frontmatter.keywords : []

results.push("\nSCHEMA")
if (!frontmatter.title) pushError(errors, "title missing")
else pushOk(results, "title present")

if (frontmatter.draft === true) {
  pushError(errors, "draft is true. Set to false before publishing")
} else if (frontmatter.draft === false) {
  pushOk(results, "draft: false")
} else {
  pushError(errors, "draft field missing")
}

if (!frontmatter.type) pushError(errors, "type missing (technical or essay)")
else pushOk(results, `type: ${frontmatter.type}`)

if (!frontmatter.searchIntent) {
  pushError(errors, "searchIntent missing")
} else {
  pushOk(results, `searchIntent: ${frontmatter.searchIntent}`)
}

results.push("\nTITLE")
const title = frontmatter.title ?? ""
const titleLength = title.length

if (titleLength < 40) {
  pushWarn(warnings, `title ${titleLength} chars. Target 50-60`)
} else if (titleLength > 60) {
  pushError(errors, `title ${titleLength} chars. Target 50-60`)
} else {
  pushOk(results, `${titleLength} chars`)
}

const aiTellFound = AI_TELL_TITLE_PHRASES.find((phrase) => title.includes(phrase))
if (aiTellFound) pushError(errors, `AI-tell phrase in title: "${aiTellFound}"`)
else pushOk(results, "no AI-tell phrases in title")

results.push("\nMETA")
const subhead = frontmatter.subhead ?? ""
const subheadLength = subhead.length

if (!subhead) {
  pushError(errors, "subhead missing")
} else if (subheadLength < 100) {
  pushWarn(warnings, `subhead ${subheadLength} chars. Target 140-160`)
} else if (subheadLength > 165) {
  pushError(errors, `subhead ${subheadLength} chars. Target 140-160`)
} else {
  pushOk(results, `subhead ${subheadLength} chars`)
}

if (keywords.length !== 6) pushError(errors, `${keywords.length} keywords. Exactly 6 required`)
else pushOk(results, "6 keywords defined")

results.push("\nAEO")
if (faqs.length < 4 && frontmatter.type === "technical") {
  pushError(errors, `${faqs.length} FAQs. Technical posts require 4`)
} else if (faqs.length >= 4) {
  pushOk(results, `${faqs.length} FAQs defined`)
}

const shortFaqs = faqs.filter((faq) => countWords(faq.answer ?? "") < 50)
if (shortFaqs.length > 0) {
  pushError(errors, `${shortFaqs.length} FAQ answer(s) under 50 words`)
} else if (faqs.length > 0) {
  pushOk(results, "all FAQ answers >= 50 words")
}

if (!hasNumber(first100Words)) {
  pushWarn(warnings, "no specific number in first 100 words")
} else {
  pushOk(results, "specific number in first 100 words")
}

results.push("\nE-E-A-T")
const numberCount = countNumbers(first800Words)
if (numberCount < 3) {
  pushWarn(warnings, `only ${numberCount} numbers in first 800 words. Target >= 3`)
} else {
  pushOk(results, `${numberCount} numbers in first 800 words`)
}

if (frontmatter.type === "technical" && !hasCodeBlock(content)) {
  pushError(errors, "no code block found. Technical posts require at least one")
} else if (frontmatter.type === "technical") {
  pushOk(results, "code block present")
}

if (!hasFirstPerson(first300Words)) {
  pushWarn(warnings, "no first-person grounding in first 300 words")
} else {
  pushOk(results, "first-person grounding in first 300 words")
}

results.push("\nHELPFUL CONTENT")
if (totalWords < 800) pushError(errors, `${totalWords} words. Minimum 800 required`)
else pushOk(results, `${totalWords} words`)

const sections = getH2Sections(content)
const thinSections = sections.filter((section) => section.paragraphCount < 2)
if (thinSections.length > 0) {
  pushWarn(
    warnings,
    `${thinSections.length} thin H2 section(s): ${thinSections
      .map((section) => `"${section.heading.trim()}"`)
      .join(", ")}`
  )
} else if (sections.length > 0) {
  pushOk(results, "all H2 sections have >= 2 paragraphs")
}

results.push("\nANTI-AI")
const contentLower = content.toLowerCase()
const bannedFound = BANNED_WORDS.filter((word) => contentLower.includes(word.toLowerCase()))
if (bannedFound.length > 0) {
  bannedFound.forEach((word) => pushError(errors, `banned word found: "${word}"`))
} else {
  pushOk(results, "no banned vocabulary")
}

if (/\u2014/.test(content)) pushError(errors, "em dash found")
else pushOk(results, "no em dashes")

console.log(`\nChecking: ${filePath}\n${"-".repeat(50)}`)
results.forEach((result) => console.log(result))

if (warnings.length > 0) {
  console.log("")
  warnings.forEach((warning) => console.log(warning))
}

if (errors.length > 0) {
  console.log("")
  errors.forEach((error) => console.log(error))
}

const passed = errors.length === 0
console.log(`\n${"-".repeat(50)}`)
console.log(
  `SCORE  ${8 - errors.length}/8 checks - ${
    passed ? "ready to publish" : `fix ${errors.length} error(s) before publishing`
  }\n`
)

process.exit(passed ? 0 : 1)
