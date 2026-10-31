// Writes one LaTeX resume per lens from src/data/resume.ts into the owner's hand-tuned template
// and compiles each with Tectonic into public/resume/<lens>.pdf. A lens that runs past one page
// fails the LaTeX run, so it fails here.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { RESUME_EDUCATION, RESUME_HEADER, RESUME_LENSES } from "../src/data/resume.ts";
import { cutResume } from "../src/lib/resume.ts";

const TEX_DIR = "resume";
const PDF_DIR = join("public", "resume");

const LATEX_SPECIALS = {
  "&": "\\&",
  "%": "\\%",
  $: "\\$",
  "#": "\\#",
  _: "\\_",
  "{": "\\{",
  "}": "\\}",
  "~": "$\\sim$",
  "^": "\\textasciicircum{}",
  "\\": "\\textbackslash{}",
};

/** Escapes LaTeX specials, keeping the corpus's "--" as an en dash and "~" as "approximately". */
const tex = (text) => text.replace(/[&%$#_{}~^\\]/g, (char) => LATEX_SPECIALS[char]);

/** Escapes the characters LaTeX treats as syntax inside href URLs. */
const href = (url) => url.replace(/[#%]/g, (char) => `\\${char}`);

const link = (url, label) => `\\href{${href(url)}}{\\underline{${tex(label)}}}`;

/** The template's trailing link line; projects say "Link to project", achievements "Link to built project". */
const linkItem = (url, label) =>
  `\\resumeItem{\\href{${href(url)}}{\\underline{${label}} - ${tex(
    url
      .replace(/^https?:\/\/(www\.)?/, "")
      .replace(/\/$/, "")
      .replace(/#.*$/, ""),
  )}}}`;

const itemList = (bullets, url, linkLabel = "Link to project") => {
  const items = [
    ...bullets.map((bullet) => `\\resumeItem{${tex(bullet.text)}}`),
    ...(url ? [linkItem(url, linkLabel)] : []),
  ];
  return items.length === 0
    ? ""
    : `\\resumeItemListStart\n${items.map((item) => `  ${item}`).join("\n")}\n\\resumeItemListEnd`;
};

const section = (title, body) =>
  body
    ? `\\section{${title}}\n\\resumeSubHeadingListStart\n${body}\n\\resumeSubHeadingListEnd\n`
    : "";

const header = () => {
  const contacts = [
    tex(RESUME_HEADER.phone),
    link(`mailto:${RESUME_HEADER.email}`, RESUME_HEADER.email),
    ...RESUME_HEADER.links.map((entry) => link(entry.url, entry.label)),
  ];
  return `\\begin{center}
    \\textbf{\\Huge \\scshape ${tex(RESUME_HEADER.name)}} \\\\ \\vspace{1pt}
    \\small ${contacts.join(" $|$ ")}
\\end{center}`;
};

const summary = (text) => section("Summary", `\\item{\\small{${tex(text)}}}`);

const education = () =>
  section(
    "Education",
    `\\resumeSubheading{${tex(RESUME_EDUCATION.school)}}{${tex(RESUME_EDUCATION.location)}}{${tex(RESUME_EDUCATION.degree)}}{${tex(RESUME_EDUCATION.period)}}`,
  );

/** Each client engagement sits under the job on the template's own resumeSubSubheading line. */
const engagementBlock = (engagement) =>
  `\\resumeSubSubheading{${tex(engagement.name)} $|$ ${tex(engagement.stack)}}{${tex(engagement.period)}}\n${itemList(engagement.bullets)}`;

const experience = (roles) =>
  section(
    "Experience",
    roles
      .map((role) =>
        [
          `\\resumeSubheading{${tex(role.company)}}{${tex(role.location)}}{${tex(role.title)}}{${tex(role.period)}}`,
          ...role.engagements.map(engagementBlock),
        ].join("\n"),
      )
      .join("\n"),
  );

const projectRows = (rows) =>
  section(
    "Projects",
    rows
      .map(
        (row) =>
          `\\resumeProjectHeading{\\textbf{${tex(row.title)}} $|$ \\emph{${tex(row.stack)}}}{${tex(row.period)}}\n${itemList(row.bullets, row.url)}`,
      )
      .join("\n"),
  );

const achievements = (entries) =>
  section(
    "Achievements",
    entries
      .map(
        (entry) =>
          `\\resumeSubheading{${tex(entry.title)}}{${tex(entry.period)}}{${tex(entry.detail)}}{${tex(entry.note ?? "")}}\n${itemList(entry.bullets, entry.url, "Link to built project")}`,
      )
      .join("\n"),
  );

const skills = (groups) =>
  `\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
     \\small{\\item{
${groups.map((group) => `      \\textbf{${tex(group.label)}}{: ${tex(group.items.join(", "))}}`).join(" \\\\\n")}
     }}
 \\end{itemize}`;

/**
 * The owner's template, verbatim except: margins at 0.4in (owner's call, 2026-10-31), glyphtounicode is guarded so the same source
 * compiles under Tectonic (XeTeX), and LaTeX errors if the page count passes one.
 */
const PREAMBLE = String.raw`\documentclass[letterpaper,10pt]{article}
\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\ifdefined\pdfgentounicode\input{glyphtounicode}\fi

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.6in}
\addtolength{\textwidth}{1.2in}
\addtolength{\topmargin}{-0.6in}
\addtolength{\textheight}{1.2in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

\ifdefined\pdfgentounicode\pdfgentounicode=1\fi

\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-2pt}}}
\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\footnotesize#3} & \textit{\footnotesize #4} \\
    \end{tabular*}\vspace{-6pt}
}
\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textit{\footnotesize #2} \\
    \end{tabular*}\vspace{-6pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[itemsep=0pt]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\newcommand{\resumeSubSubheading}[2]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-6pt}
}

\AtEndDocument{\clearpage\ifnum\value{page}>2 \errmessage{The resume runs past one page}\fi}
`;

/** The full LaTeX source for one lens. */
const renderLens = (lens) => {
  const cut = cutResume(lens);
  const meta = RESUME_LENSES.find((entry) => entry.id === lens);
  return [
    PREAMBLE,
    "\\begin{document}",
    header(),
    summary(meta.pdfSummary),
    education(),
    experience(cut.experience),
    projectRows(cut.projects),
    achievements(cut.achievements),
    skills(cut.skills),
    "\\end{document}",
    "",
  ].join("\n");
};

mkdirSync(TEX_DIR, { recursive: true });
mkdirSync(PDF_DIR, { recursive: true });

for (const { id } of RESUME_LENSES) {
  const texPath = join(TEX_DIR, `${id}.tex`);
  writeFileSync(texPath, renderLens(id));
  execFileSync("tectonic", ["--outdir", PDF_DIR, texPath], { stdio: "inherit" });
}
