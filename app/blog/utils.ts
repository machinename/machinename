// import fs from 'fs';
// import path from 'path';

// type Metadata = {
//   title: string;
//   publishedAt: string;
//   summary: string;
//   image?: string;
// };

// function parseFrontmatter(fileContent: string) {
//   let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
//   let match = frontmatterRegex.exec(fileContent);
//   let frontMatterBlock = match![1];
//   let content = fileContent.replace(frontmatterRegex, '').trim();
//   let frontMatterLines = frontMatterBlock.trim().split('\n');
//   let metadata: Partial<Metadata> = {};

//   frontMatterLines.forEach((line) => {
//     let [key, ...valueArr] = line.split(': ');
//     let value = valueArr.join(': ').trim();
//     value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
//     metadata[key.trim() as keyof Metadata] = value;
//   });

//   return { metadata: metadata as Metadata, content };
// }

// function getMarkdownFiles(dir: fs.PathLike) {
//   return fs.readdirSync(dir.toString()).filter((file) => path.extname(file) === '.md');
// }

// function readMarkdownFile(filePath: fs.PathLike) {
//   let rawContent = fs.readFileSync(filePath.toString(), 'utf-8');
//   return parseFrontmatter(rawContent);
// }

// function getMarkdownData(dir: fs.PathLike) {
//   let markdownFiles = getMarkdownFiles(dir);
//   return markdownFiles.map((file) => {
//     let { metadata, content } = readMarkdownFile(path.join(dir.toString(), file));
//     let slug = path.basename(file, path.extname(file));

//     return {
//       metadata,
//       slug,
//       content,
//     };
//   });
// }

// export function getBlogPosts() {
//   return getMarkdownData(path.join(process.cwd(), 'app', 'blog', 'posts'));
// }

// export function formatDate(date: string, includeRelative = false) {
//   let currentDate = new Date();
//   if (!date.includes('T')) {
//     date = `${date}T00:00:00`;
//   }
//   let targetDate = new Date(date);

//   let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
//   let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
//   let daysAgo = currentDate.getDate() - targetDate.getDate();

//   let formattedDate = '';

//   if (yearsAgo > 0) {
//     formattedDate = `${yearsAgo}y ago`;
//   } else if (monthsAgo > 0) {
//     formattedDate = `${monthsAgo}mo ago`;
//   } else if (daysAgo > 0) {
//     formattedDate = `${daysAgo}d ago`;
//   } else {
//     formattedDate = 'Today';
//   }

//   let fullDate = targetDate.toLocaleString('en-us', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//   });

//   if (!includeRelative) {
//     return fullDate;
//   }

//   return `${fullDate} (${formattedDate})`;
// }